import { expect, test } from '@playwright/test';

test('all in one', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Test \/ Stories - Test Story/);
});
