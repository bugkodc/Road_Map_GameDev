import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test('Unreal docs API proxy endpoint returns correct upstream documentation page', async ({ request, baseURL }) => {
  const base = baseURL || 'http://127.0.0.1:5173';
  const response = await request.get(`${base}/api/unreal-docs?slug=whats-new`);
  expect(response.ok()).toBeTruthy();
  const payload = await response.json();
  expect(payload.sourceUrl).toContain('/unreal-engine/whats-new');
  expect(payload.html).toContain('serverApp-state');
  expect(payload.html).toContain('whats-new');
});

test('Unreal doc page renders in reader pane without errors', async ({ page, baseURL }) => {
  const base = baseURL || 'http://127.0.0.1:5173';
  await page.goto(`${base}/#unreal-doc:whats-new`);

  await expect(page.locator('.unreal-doc-toolbar')).toBeVisible();
  await expect(page.locator('.reader-error')).toHaveCount(0);
  await expect(page.locator('.unreal-doc-body')).toBeVisible();
  await expect(page.locator('.unreal-doc-body h1').first()).toContainText(/What's New|Có gì mới/i);
});

test('Unreal doc page works under both VI and EN languages', async ({ page, baseURL }) => {
  const base = baseURL || 'http://127.0.0.1:5173';
  // Set language to Vietnamese (VI) and load overview
  await page.addInitScript(() => {
    localStorage.setItem('gamedev_language', 'vi');
  });
  await page.goto(`${base}/#unreal-doc:unreal-engine-5-7-documentation`);

  await expect(page.locator('.unreal-doc-toolbar')).toBeVisible();
  await expect(page.getByText('Tài liệu Unreal trực tiếp')).toBeVisible();
  await expect(page.locator('.unreal-doc-body')).toBeVisible();

  // Toggle language to English (EN)
  await page.getByRole('button', { name: /chuyển ngôn ngữ/i }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('.unreal-doc-toolbar')).toBeVisible();
  await expect(page.getByText('Live Unreal Docs')).toBeVisible();
});

test('Refresh button clears cache and re-fetches from API', async ({ page, baseURL }) => {
  const base = baseURL || 'http://127.0.0.1:5173';
  await page.goto(`${base}/#unreal-doc:whats-new`);
  await expect(page.locator('.unreal-doc-toolbar')).toBeVisible();
  
  // Verify metadata badge shows "Using local cache" or "Updated from Unreal"
  const metaText = await page.locator('.unreal-doc-meta').innerText();
  expect(metaText).toMatch(/Using local cache|Updated from Unreal|Đang dùng cache local|Vừa cập nhật từ Unreal/i);

  // Click refresh button
  await page.getByRole('button', { name: /Refresh from Unreal|Cập nhật từ Unreal/i }).click();
  await expect(page.locator('.unreal-doc-body')).toBeVisible();
});
