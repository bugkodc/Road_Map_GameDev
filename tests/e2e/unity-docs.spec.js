import { expect, test } from '@playwright/test';

const routes = {
  gameObject: '/#03-Unity/02-ScriptingAPI/01-UnityEngine/01-core-api.md',
  accessibility: '/#03-Unity/02-ScriptingAPI/01-UnityEngine/accessibility.md',
  manualPackages: '/#03-Unity/01-Manual/03-Packages-Management/00-packages-management-overview.md'
};

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test('Unity docs API routes Manual and ScriptReference to the correct upstream folders', async ({ request, baseURL }) => {
  const base = baseURL || 'http://127.0.0.1:5173';
  const manual = await request.get(`${base}/api/unity-docs?path=Packages.html&version=6000.4&isManual=true`);
  expect(manual.ok()).toBeTruthy();
  const manualPayload = await manual.json();
  expect(manualPayload.sourceUrl).toContain('/Documentation/Manual/Packages.html');
  expect(manualPayload.html).toContain('Packages');

  const scripting = await request.get(`${base}/api/unity-docs?path=Physics.html&version=6000.4&isManual=false`);
  expect(scripting.ok()).toBeTruthy();
  const scriptingPayload = await scripting.json();
  expect(scriptingPayload.sourceUrl).toContain('/Documentation/ScriptReference/Physics.html');
  expect(scriptingPayload.html).toContain('Scripting API');
});

test('Unity namespace route does not show a 404 reader error', async ({ page, baseURL }) => {
  const base = baseURL || 'http://127.0.0.1:5173';
  await page.addInitScript(() => {
    localStorage.setItem('gamedev_language', 'en');
  });
  await page.goto(`${base}${routes.accessibility}`);

  await expect(page.locator('.unity-doc-toolbar')).toBeVisible();
  await expect(page.locator('.reader-error')).toHaveCount(0);
  await expect(page.getByText(/Unity docs trả về 404|Unity docs returned 404/i)).toHaveCount(0);
  await expect(page.locator('.unity-doc-body')).toBeVisible();
});

test('Unity docs strip Unity feedback and submission UI', async ({ page, baseURL }) => {
  const base = baseURL || 'http://127.0.0.1:5173';
  await page.addInitScript(() => {
    localStorage.setItem('gamedev_language', 'en');
  });
  await page.goto(`${base}${routes.gameObject}`);

  await expect(page.locator('.unity-doc-body h1, .unity-doc-body .heading').first()).toContainText('GameObject');
  await expect(page.getByText('Submission failed')).toHaveCount(0);
  await expect(page.getByText('Success!')).toHaveCount(0);
  await expect(page.getByText('Suggest a change')).toHaveCount(0);
  await expect(page.getByText('Leave feedback')).toHaveCount(0);
  await expect(page.locator('textarea#suggest_body')).toHaveCount(0);
});

test('language toggle switches Scripting API between Vietnamese local docs and English live docs', async ({ page, baseURL }) => {
  const base = baseURL || 'http://127.0.0.1:5173';
  await page.goto(`${base}${routes.gameObject}`);

  await expect(page.locator('.unity-doc-toolbar')).toHaveCount(0);
  await expect(page.locator('.markdown-body h1').first()).toContainText(/UnityEngine Core API|UnityEngine/);

  await page.getByRole('button', { name: /chuyển ngôn ngữ/i }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('button', { name: /refresh from unity/i })).toBeVisible();
  await expect(page.getByText('Open source page')).toBeVisible();
  await expect(page.getByText('Mở trang gốc')).toHaveCount(0);

  await page.getByRole('button', { name: /switch language/i }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await expect(page.locator('.unity-doc-toolbar')).toHaveCount(0);
  await expect(page.getByText('Open source page')).toHaveCount(0);
});

test('language toggle switches Unity Manual between Vietnamese local docs and English live Manual docs', async ({ page, baseURL }) => {
  const base = baseURL || 'http://127.0.0.1:5173';
  await page.goto(`${base}${routes.manualPackages}`);

  await expect(page.locator('.reader-error')).toHaveCount(0);
  await expect(page.locator('.unity-doc-toolbar')).toHaveCount(0);
  await expect(page.locator('.markdown-body h1').first()).toContainText('Packages & Assembly Definitions');
  await expect(page.getByText('Unity Manual 6000.4')).toHaveCount(0);

  await page.getByRole('button', { name: /chuyển ngôn ngữ/i }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('.reader-error')).toHaveCount(0);
  await expect(page.locator('.unity-doc-toolbar')).toBeVisible();
  await expect(page.getByText('Unity Manual 6000.4')).toBeVisible();
  await expect(page.getByText('Open source page')).toBeVisible();
  await expect(page.locator('.unity-doc-body')).toBeVisible();

  await page.getByRole('button', { name: /switch language/i }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await expect(page.locator('.reader-error')).toHaveCount(0);
  await expect(page.locator('.unity-doc-toolbar')).toHaveCount(0);
  await expect(page.locator('.markdown-body h1').first()).toContainText('Packages & Assembly Definitions');
});

test('Unity doc internal links route through the adapter', async ({ page, baseURL }) => {
  const base = baseURL || 'http://127.0.0.1:5173';
  await page.addInitScript(() => {
    localStorage.setItem('gamedev_language', 'en');
  });
  await page.goto(`${base}${routes.gameObject}`);

  await page.locator('.unity-doc-body a[href^="#unity-doc:Component.html"]').first().click();
  await expect(page).toHaveURL(/#unity-doc:Component\.html$/);
  await expect(page.locator('.unity-doc-body h1, .unity-doc-body .heading').first()).toContainText('Component');
  await expect(page.locator('.reader-error')).toHaveCount(0);
});
