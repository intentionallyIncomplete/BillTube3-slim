import { test, expect } from "@playwright/test";

const fixturePath = process.env.E2E_FIXTURE_PATH || "/e2e/fixture/channel.html";

test.describe("E2E fixture target", () => {
  test("fixture page boots BillTube overlay", async ({ page }) => {
    const ready = page.waitForEvent("console", {
      predicate: (msg) => msg.text().includes("[BTFW v3.4f] Ready."),
      timeout: 45_000
    });

    await page.goto(fixturePath, { waitUntil: "domcontentloaded" });

    await ready;

    await expect(page.locator("#btfw-grid")).toBeVisible();
    await expect(page.locator("#btfw-boot-overlay")).toHaveCount(0);
    await expect(page.locator("#messagebuffer")).toBeVisible();
    await expect(page.locator("#videowrap")).toBeVisible();
  });

  test("fixture reports boot failure when a bundle fails to load", async ({ page }) => {
    const bootFailed = page.waitForEvent("console", {
      predicate: (msg) => msg.type() === "error" && msg.text().includes("[BTFW") && msg.text().includes("boot failed"),
      timeout: 30_000
    });

    await page.route("**/dist/core.bundle.js*", (route) => route.abort());
    await page.goto(fixturePath, { waitUntil: "domcontentloaded" });

    const message = await bootFailed;
    expect(message.text()).toMatch(/boot failed/i);
  });
});
