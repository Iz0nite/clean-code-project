import { test, expect } from '@playwright/test';

test('Create card', async ({ page }) => {
  await page.goto('http://localhost:5173/cards');

  await page.waitForLoadState('networkidle');

  await page.click('button:has-text("New card")');

  await page.fill('input[name="question"]', 'A primordial question');
  await page.fill('input[name="answer"]', 'A good answer');
  await page.fill('input[name="tag"]', 'The best tag');

  await page.click('button:has-text("Submit")')

  const expectedCard = await page.waitForSelector(`text=/FIRST.*A primordial question/`);
  expect(expectedCard).toBeTruthy();
});
