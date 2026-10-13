import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const component = readFileSync("components/AIFieldGuide.tsx", "utf8");
const route = readFileSync("app/cinema/field-guide/page.tsx", "utf8");
const cinema = readFileSync("app/cinema/page.tsx", "utf8");

for (const [label, condition] of [
  ["Field Guide route imports the real interactive component", route.includes('from "@/components/AIFieldGuide"')],
  ["Cinema links to Field Guide", cinema.includes('href="/cinema/field-guide"')],
  ["Three distinct goals exist", ['learn:', 'work:', 'business:'].every((key) => component.includes(key))],
  ["Each goal has a seven-task protocol", (component.match(/title: "/g) || []).length >= 21],
  ["Progress is persisted locally", component.includes('localStorage.setItem(STORAGE_KEY')],
  ["Storage reads are guarded", component.includes('localStorage.getItem(STORAGE_KEY)') && component.includes("Storage can be disabled")],
  ["Export produces a plain-text download", component.includes('type: "text/plain;charset=utf-8"') && component.includes('osa-ai-field-guide.txt')],
  ["Completion controls expose pressed state", component.includes('aria-pressed={done.includes(i)}')],
  ["Goal controls expose pressed state", component.includes('aria-pressed={goal === key}')],
  ["Reduced motion is respected", component.includes("@media(prefers-reduced-motion:reduce)")],
  ["Reset asks for confirmation", component.includes('confirm("Сбросить прогресс этого маршрута?")')],
  ["No paid provider or new dependency is required", !component.includes("fetch(") && !component.includes("process.env."))
]) {
  assert.ok(condition, label);
  process.stdout.write(`PASS ${label}\n`);
}
process.stdout.write("AI Field Guide contract checks passed.\n");
