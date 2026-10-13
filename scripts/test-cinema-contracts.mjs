import { readFileSync, existsSync } from "node:fs";
import { strict as assert } from "node:assert";

const componentPath = "components/InteractiveCinema.tsx";
const cssPath = "app/globals.css";
const pagePath = "app/cinema/page.tsx";
assert.ok(existsSync(componentPath), "cinema component exists");
assert.ok(existsSync(cssPath), "cinema styles exist");
assert.ok(existsSync(pagePath), "cinema route exists");

const component = readFileSync(componentPath, "utf8");
const css = readFileSync(cssPath, "utf8");
const page = readFileSync(pagePath, "utf8");

for (const phrase of ["Машина, которая продолжает мысль", "Кто управляет дверями знания", "Человек за пультом"]) {
  assert.ok(component.includes(phrase), `chapter present: ${phrase}`);
}
assert.ok(component.includes("localStorage.setItem"), "progress persistence exists");
assert.ok(component.includes("localStorage.getItem"), "progress restore exists");
assert.ok(component.includes("aria-pressed"), "choice state is accessible");
assert.ok(component.includes("Последствие выбора"), "choice consequence is rendered");
assert.ok(component.includes("ТЕКСТОВАЯ ВЕРСИЯ"), "no fake video claim");
assert.ok(css.includes("@media(max-width:560px)"), "mobile breakpoint exists");
assert.ok(css.includes("prefers-reduced-motion:reduce"), "reduced-motion support exists");
assert.ok(page.includes("InteractiveCinema"), "route mounts interactive course");
console.log("PASS: cinema route, 3 chapters, real choice consequences, local progress, mobile and reduced-motion contracts");
