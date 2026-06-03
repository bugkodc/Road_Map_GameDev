import { expect, test } from '@playwright/test';

const routes = {
  gameObject: '/#03-Unity/02-ScriptingAPI/01-UnityEngine/01-core-api.md',
  accessibility: '/#03-Unity/02-ScriptingAPI/01-UnityEngine/accessibility.md'
};

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test('Unity namespace route does not show a 404 reader error', async ({ page }) => {
  await page.goto(routes.accessibility);

  await expect(page.locator('.unity-doc-toolbar')).toBeVisible();
  await expect(page.locator('.reader-error')).toHaveCount(0);
  await expect(page.getByText(/Unity docs trả về 404|Unity docs returned 404/i)).toHaveCount(0);
  await expect(page.locator('.unity-doc-body')).toBeVisible();
});

test('Unity docs strip Unity feedback and submission UI', async ({ page }) => {
  await page.goto(routes.gameObject);

  await expect(page.locator('.unity-doc-body h1, .unity-doc-body .heading').first()).toContainText('GameObject');
  await expect(page.getByText('Submission failed')).toHaveCount(0);
  await expect(page.getByText('Success!')).toHaveCount(0);
  await expect(page.getByText('Suggest a change')).toHaveCount(0);
  await expect(page.getByText('Leave feedback')).toHaveCount(0);
  await expect(page.locator('textarea#suggest_body')).toHaveCount(0);
});

test('language toggle updates Unity adapter chrome', async ({ page }) => {
  await page.goto(routes.gameObject);

  await expect(page.getByRole('button', { name: /cập nhật từ unity/i })).toBeVisible();
  await page.getByRole('button', { name: /chuyển ngôn ngữ/i }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('button', { name: /refresh from unity/i })).toBeVisible();
  await expect(page.getByText('Open source page')).toBeVisible();
  await expect(page.getByText('Mở trang gốc')).toHaveCount(0);
});

test('Unity doc internal links route through the adapter', async ({ page }) => {
  await page.goto(routes.gameObject);

  await page.locator('.unity-doc-body a[href^="#unity-doc:Component.html"]').first().click();
  await expect(page).toHaveURL(/#unity-doc:Component\.html$/);
  await expect(page.locator('.unity-doc-body h1, .unity-doc-body .heading').first()).toContainText('Component');
  await expect(page.locator('.reader-error')).toHaveCount(0);
});
