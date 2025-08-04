import { test, expect } from '@playwright/test';

test('Can list rooms', async ({ page }) => {
  
  await page.goto('/');
  const roomContainer = page.locator('#root > div:nth-child(2)');
  await expect(roomContainer).toBeVisible(); 

  const rooms = roomContainer.locator('>div');
  await expect(rooms).toHaveCount(4); 
  await expect(rooms.first()).toContainText('Conference Room');
});

test('Can filter rooms by date', async ({ page }) => {
  await page.goto('/');
  
  const calBtn = page.locator('#root > div:first-child button');
  const btns = page.locator('div[role="dialog"] button');
  const roomContainer = page.locator('#root > div:nth-child(2)');
  
  // Test filtering by date
  calBtn.click();
  btns.locator('text="8"').click();
  const rooms = roomContainer.locator('>div');
  await expect(rooms).toHaveCount(2); 

  // Test filtering for a second date
  calBtn.click();
  btns.locator('text="5"').click();
  await expect(rooms).toHaveCount(1);
  await expect(rooms.first()).toContainText('Training Room C');

  // Test coosesing a date that has no rooms
  calBtn.click();
  btns.locator('text="13"').click();
  await expect(rooms).toHaveCount(0);

  // Test clearing the filter
  const resetBtn = page.locator('#root > div:first-child > header > div:first-child > div:first-child');
  await resetBtn.click();
  await expect(rooms).toHaveCount(4);

});

test('Available can be selected', async ({ page }) => {
  await page.goto('/');
  
  const roomContainer = page.locator('#root > div:nth-child(2)');
  const room = roomContainer.locator('>div').first();
  
  // 
  await expect(room).toContainText('Conference Room A');
  await room.locator('button').click();
  await expect(page).toHaveURL(/checkout/);
  await expect(page.locator('h2')).toHaveText('Conference Room A');
  
});


