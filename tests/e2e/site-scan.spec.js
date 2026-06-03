import { expect, test } from '@playwright/test';
import fs from 'node:fs';

const navData = JSON.parse(fs.readFileSync(new URL('../../src/utils/navigation.json', import.meta.url), 'utf8'));

const collectPaths = (items, paths = []) => {
  for (const item of items) {
    if (item.path && !item.placeholder) {
      paths.push({ id: item.id, title: item.title, path: item.path });
    }
    if (item.children) {
      collectPaths(item.children, paths);
    }
  }
  return paths;
};

const allArticlePaths = navData.categories.flatMap((category) => collectPaths(category.items));

const waitForReaderToSettle = async (page) => {
  await page.waitForFunction(() => {
    const readerHasSettled = document.querySelector('.markdown-body, .unity-doc-body, .reader-error, .placeholder-container');
    const loader = document.querySelector('.reader-loader');
    return Boolean(readerHasSettled) && !loader;
  }, null, { timeout: 15_000 });
};

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('gamedev_language', 'vi');
  });
});

test('scan all navigation pages without raw Vite HTML or reader errors', async ({ page }, testInfo) => {
  test.setTimeout(180_000);
  const failures = [];

  for (const item of allArticlePaths) {
    await page.goto(`/#${item.path}`);
    await waitForReaderToSettle(page);
    await page.waitForTimeout(150);

    const state = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      return {
        title: document.querySelector('.markdown-body h1, .unity-doc-body h1, .reader-error h3')?.textContent?.trim() || '',
        hasReaderError: Boolean(document.querySelector('.reader-error')),
        hasMermaidError: bodyText.includes('Syntax error in text')
          || bodyText.includes('mermaid version')
          || bodyText.includes('Diagram error'),
        hasRawViteHtml: bodyText.includes('/@vite/client')
          || bodyText.includes('<script type="module"')
          || bodyText.includes('<meta charset="UTF-8"')
          || bodyText.includes('<title>Road Map GameDev</title>'),
        hasContent: Boolean(document.querySelector('.markdown-body, .unity-doc-body, .placeholder-container'))
      };
    });

    if (state.hasReaderError || state.hasMermaidError || state.hasRawViteHtml || !state.hasContent) {
      const safeName = item.id.replace(/[^\w-]/g, '_');
      if (failures.length < 5) {
        await page.screenshot({ path: testInfo.outputPath(`failure-${safeName}.png`) });
      }
      failures.push({ ...item, ...state });
    }
  }

  expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
});

test('capture representative pages after language switching', async ({ page }, testInfo) => {
  await page.goto('/#03-Unity/01-Manual/03-Packages-Management/00-packages-management-overview.md');
  await waitForReaderToSettle(page);
  await page.waitForTimeout(150);
  await expect(page.locator('.reader-error')).toHaveCount(0);
  await expect(page.getByText('/@vite/client')).toHaveCount(0);
  await expect(page.getByText('Syntax error in text')).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('manual-packages-vi.png'), fullPage: true });

  await page.goto('/#03-Unity/02-ScriptingAPI/01-UnityEngine/04-physics-api.md');
  await waitForReaderToSettle(page);
  await expect(page.locator('.unity-doc-toolbar')).toHaveCount(0);
  await expect(page.getByText('Global physics properties and helper methods.')).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('scripting-physics-vi.png'), fullPage: true });

  await page.getByRole('button', { name: /chuyển ngôn ngữ/i }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('.unity-doc-toolbar')).toBeVisible();
  await expect(page.getByText('Global physics properties and helper methods.')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('scripting-physics-en.png'), fullPage: true });
});
