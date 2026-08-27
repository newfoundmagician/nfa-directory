// ---------------------------------------------------------------------------
// WEEKLY POST GENERATOR
// Run by the GitHub Action in .github/workflows/weekly-posts.yml on a
// schedule. For each client, asks Claude to draft one new post grounded
// only in that client's real profile data (never inventing facts), then
// appends it to app/data/posts.json. The workflow then opens a Pull
// Request with the changes instead of publishing directly — a human
// reviews and merges before anything goes live.
//
// Requires an ANTHROPIC_API_KEY environment variable (set as a GitHub
// repo secret — see README.md).
// ---------------------------------------------------------------------------

import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");
const CLIENTS_PATH = path.join(ROOT, "app/data/clients.json");
const CATEGORIES_PATH = path.join(ROOT, "app/data/categories.json");
const POSTS_PATH = path.join(ROOT, "app/data/posts.json");

const MODEL = process.env.POST_GENERATOR_MODEL || "claude-sonnet-5";

if (!process.env.ANTHROPIC_API_KEY) {
  console.error(
    "Missing ANTHROPIC_API_KEY environment variable. Set it as a GitHub repo secret — see README.md."
  );
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const clients = JSON.parse(fs.readFileSync(CLIENTS_PATH, "utf-8"));
const categories = JSON.parse(fs.readFileSync(CATEGORIES_PATH, "utf-8"));
const posts = JSON.parse(fs.readFileSync(POSTS_PATH, "utf-8"));

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function nextLogNumber(clientSlug) {
  const count = posts.filter((p) => p.clientSlug === clientSlug).length;
  return `LOG NO. ${String(count + 1).padStart(3, "0")}`;
}

async function generatePostForClient(client, category) {
  const existingTitles = posts
    .filter((p) => p.clientSlug === client.slug)
    .map((p) => p.title);

  const prompt = `You are writing one new blog post for a local business's profile page on a directory platform. Ground every claim ONLY in the facts given below — never invent services, credentials, years of experience, certifications, promotions, or statistics that aren't stated here. If you don't have enough facts for a strong angle, write a shorter, more general post rather than inventing specifics.

BUSINESS FACTS:
- Name: ${client.businessName}
- Category: ${category.singular}
- Location: ${client.city}, ${client.region}
- Description: ${client.description}
- Services: ${client.services.join(", ")}
${client.yearsExperience ? `- Years of experience: ${client.yearsExperience}` : ""}
${client.licenseNumber ? `- License number: ${client.licenseNumber}` : ""}
${client.currentPromo ? `- Current promotion: ${client.currentPromo}` : ""}

EXISTING POST TITLES (write about a different angle than these):
${existingTitles.length ? existingTitles.map((t) => `- ${t}`).join("\n") : "(none yet)"}

Write in this voice: plain, direct, practical advice for a homeowner in this business's service area — not marketing copy. Structure: an informative angle relevant to the trade and location (seasonal timing, how to evaluate a problem, a common mistake, etc.), naturally mentioning the business by name partway through and again near the end with a soft call to action. 3-4 paragraphs.

Respond with ONLY valid JSON, no markdown fences, no preamble, matching exactly this shape:
{"title": "...", "excerpt": "one or two sentence summary, under 200 characters", "body": ["paragraph 1", "paragraph 2", "paragraph 3"]}`;

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1500,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock) throw new Error(`No text response for ${client.businessName}`);

  let parsed;
  try {
    parsed = JSON.parse(textBlock.text.trim());
  } catch (err) {
    throw new Error(
      `Failed to parse JSON for ${client.businessName}: ${err.message}\nRaw: ${textBlock.text}`
    );
  }

  return {
    slug: `${slugify(parsed.title)}-${Date.now().toString(36)}`,
    clientSlug: client.slug,
    title: parsed.title,
    dateISO: new Date().toISOString().slice(0, 10),
    logNumber: nextLogNumber(client.slug),
    excerpt: parsed.excerpt,
    body: parsed.body,
  };
}

async function main() {
  const newPosts = [];

  for (const client of clients) {
    const category = categories.find((c) => c.slug === client.categorySlug);
    if (!category) {
      console.warn(`Skipping ${client.businessName} — category not found.`);
      continue;
    }
    try {
      console.log(`Generating post for ${client.businessName}...`);
      const post = await generatePostForClient(client, category);
      newPosts.push(post);
      console.log(`  → "${post.title}"`);
    } catch (err) {
      console.error(`  Failed for ${client.businessName}:`, err.message);
    }
  }

  if (newPosts.length === 0) {
    console.log("No posts generated. Exiting without writing changes.");
    return;
  }

  const updated = [...posts, ...newPosts];
  fs.writeFileSync(POSTS_PATH, JSON.stringify(updated, null, 2) + "\n");
  console.log(`\nWrote ${newPosts.length} new post(s) to ${POSTS_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
