#!/usr/bin/env node
import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import matter from 'gray-matter';

const cwd = process.cwd();
const contentDir = path.join(cwd, 'src', 'content');
const publicDir = path.join(cwd, 'public');

async function collectMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectMarkdownFiles(entryPath)));
    } else if (entry.isFile() && entryPath.endsWith('.md')) {
      files.push(entryPath);
    }
  }
  return files;
}

function normalizeHeroPath(hero) {
  if (typeof hero !== 'string') return null;
  if (!hero.trim()) return null;
  const cleaned = hero.replace(/^\/+/, '');
  return path.join(publicDir, cleaned);
}

const missing = [];

const markdownFiles = await collectMarkdownFiles(contentDir);
for (const file of markdownFiles) {
  const raw = await readFile(file, 'utf-8');
  const { data } = matter(raw);
  const heroPath = normalizeHeroPath(data.hero);
  if (!heroPath) continue;
  try {
    await access(heroPath);
  } catch {
    missing.push(`${file} → missing asset: ${data.hero}`);
  }
}

if (missing.length) {
  console.error('Hero asset check failed:');
  missing.forEach((msg) => console.error(`  - ${msg}`));
  process.exit(1);
} else {
  console.log('Hero asset check passed.');
}
