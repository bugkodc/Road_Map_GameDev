import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('gamedev_language', 'vi');
  });
});

test('sidebar groups reliably collapse and expand', async ({ page }) => {
  await page.goto('/#unreal-doc:unreal-engine-5-7-documentation');
  const group = page.getByRole('button', { name: 'Nền tảng phát triển', exact: true });

  await expect(group).toHaveAttribute('aria-expanded', 'true');
  await group.click();
  await expect(group).toHaveAttribute('aria-expanded', 'false');
  const firstChild = page.locator('.sidebar-nav a[href="#unreal-doc:understanding-the-basics-of-unreal-engine"]');
  await expect(firstChild).toHaveCount(0);

  await group.click();
  await expect(group).toHaveAttribute('aria-expanded', 'true');
  await expect(firstChild).toBeVisible();
});

test('track buttons and internal links navigate once and remain responsive', async ({ page }) => {
  await page.goto('/#home');
  await page.getByRole('button', { name: 'Unreal', exact: true }).click();
  await expect(page.getByText('Unreal', { exact: true }).last()).toBeVisible();

  await page.getByRole('link', { name: 'Roadmap', exact: true }).click();
  await expect(page).toHaveURL(/#roadmap\/unreal$/);
  await expect(page.locator('.roadmap-hero h1')).toContainText('Unreal Engine');

  await page.getByRole('link', { name: /Mở bài đầu tiên|Open first lesson/ }).click();
  await expect(page).toHaveURL(/#unreal-doc:unreal-engine-5-7-documentation$/);
  await expect(page.locator('.unreal-doc-body')).toBeVisible();
});

test('Unreal images use bounded sources without oversized srcset', async ({ page }) => {
  await page.goto('/#unreal-doc:unreal-engine-5-7-documentation');
  await expect(page.locator('.unreal-doc-body')).toBeVisible();

  const imageState = await page.locator('.unreal-doc-body img').evaluateAll((images) =>
    images.slice(0, 8).map((image) => ({
      src: image.getAttribute('src'),
      srcset: image.getAttribute('srcset'),
      loading: image.getAttribute('loading'),
      width: image.clientWidth,
      height: image.clientHeight
    }))
  );

  expect(imageState.length).toBeGreaterThan(0);
  expect(imageState.every((image) => image.srcset === null)).toBeTruthy();
  expect(imageState.some((image) => image.loading === 'eager')).toBeTruthy();
  expect(imageState.every((image) => !image.src?.includes('width=3840'))).toBeTruthy();
});

test('header, progress, and mobile menu buttons update their states', async ({ page }) => {
  await page.goto('/#unreal-doc:whats-new');

  const themeButton = page.locator('.theme-toggle');
  const initialTheme = await page.locator('html').getAttribute('data-theme');
  await themeButton.click();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', initialTheme || 'light');

  await page.locator('.language-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');

  const completionButton = page.locator('.btn-complete-toggle');
  await completionButton.click();
  await expect(completionButton).toHaveClass(/active/);

  await page.setViewportSize({ width: 390, height: 844 });
  const menuButton = page.locator('.menu-toggle-btn');
  await menuButton.click();
  await expect(page.locator('.sidebar-nav')).toHaveClass(/open/);
  await page.locator('.sidebar-overlay').click();
  await expect(page.locator('.sidebar-nav')).not.toHaveClass(/open/);
});
