import { readFileSync, existsSync } from "node:fs";
import { strict as assert } from "node:assert";

const componentPath = "components/InteractiveCinema.tsx";
const cssPath = "app/globals.css";
const pagePath = "app/cinema/page.tsx";
const passportPath = "app/cinema/passport/page.tsx";
assert.ok(existsSync(componentPath), "cinema component exists");
assert.ok(existsSync(cssPath), "cinema styles exist");
assert.ok(existsSync(pagePath), "cinema route exists");
assert.ok(existsSync(passportPath), "personal learning passport route exists");

const component = readFileSync(componentPath, "utf8");
const css = readFileSync(cssPath, "utf8");
const page = readFileSync(pagePath, "utf8");
const passport = readFileSync(passportPath, "utf8");

for (const phrase of ["Машина, которая продолжает мысль", "Кто управляет дверями знания", "Человек за пультом"]) {
  assert.ok(component.includes(phrase), `chapter present: ${phrase}`);
}
assert.ok(component.includes("localStorage.setItem"), "progress persistence exists");
assert.ok(component.includes("localStorage.getItem"), "progress restore exists");
assert.ok(component.includes("aria-pressed"), "choice state is accessible");
assert.ok(component.includes("ПОСЛЕДСТВИЕ ВЫБОРА"), "choice consequence is rendered");
assert.ok(component.includes("ТЕКСТОВАЯ ВЕРСИЯ"), "no fake video claim");
assert.ok(css.includes("@media(max-width:560px)"), "mobile breakpoint exists");
assert.ok(css.includes("prefers-reduced-motion:reduce"), "reduced-motion support exists");
assert.ok(page.includes("InteractiveCinema"), "route mounts interactive course");
assert.ok(page.includes("/cinema/passport"), "cinema links to personal learning passport");
assert.ok(component.includes("https://hai.stanford.edu/ai-index"), "primary research source is linked");
assert.ok(component.includes("https://www.nist.gov/itl/ai-risk-management-framework"), "AI risk framework is linked");

assert.ok(passport.includes('localStorage.getItem("osa-cinema-progress-v1")'), "passport reads existing cinema progress");
assert.ok(passport.includes('localStorage.getItem("osa-cinema-lab-v1")'), "passport reads Decision Lab progress");
assert.ok(passport.includes("navigator.share"), "native share action exists");
assert.ok(passport.includes("window.print()"), "print-to-PDF action exists");
assert.ok(passport.includes("не отправляются на сервер"), "local-only privacy is disclosed");
assert.ok(passport.includes("@media print"), "print stylesheet exists");
assert.ok(passport.includes("НЕ ПРОГНОЗ. НЕ ДИАГНОЗ."), "profile is not misrepresented as psychometric assessment");
console.log("PASS: cinema route, 3 chapters, interactive consequences, local progress, mobile/reduced-motion, and private learning passport contracts");
