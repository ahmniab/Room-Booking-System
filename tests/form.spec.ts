import { test, expect } from '@playwright/test';

test('Name can be entered', async ({ page }) => {
    await page.goto('/checkout/room-2');
    
    const nameInput = page.locator('input[name="name"]');
    await nameInput.fill('Ahmed');
    await expect(nameInput).toHaveValue('Ahmed');

});

test('Email can be entered', async ({ page }) => {
    await page.goto('/checkout/room-2');
    
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill('ahmniab@ahmed.com');
    await expect(emailInput).toHaveValue('ahmniab@ahmed.com');

});

test('Duration can be entered', async ({ page }) => {
    await page.goto('/checkout/room-2');
    
    const durationInput = page.locator('input[name="duration"]');
    await durationInput.fill('5');
    await expect(durationInput).toHaveValue('5');

});

test('Day can be choosen', async ({ page }) => {
    await page.goto('/checkout/room-2');
    
    const selectInput = await page.locator('[role="combobox"]');
    await selectInput.click();
    page.locator('li').filter({ hasText: '2025-08-01' }).click();
    await expect(selectInput).toHaveText('2025-08-01');
});

test('Time can picked', async ({ page }) => {
    await page.goto('/checkout/room-2');
    
    const cloclBtn = page.locator('[data-testid="ClockIcon"]');
    await cloclBtn.click();
    await page.locator('[aria-label="12 hours"]').click();
    await page.locator('text="OK"').click();

    const hourSpan = await page.locator('[aria-label="Hours"]');
    await expect(hourSpan).toHaveText('12');
    
    const minutesSpan = await page.locator('[aria-label="Minutes"]');
    await expect(minutesSpan).toHaveText('00');

    const amPmSpan = await page.locator('[aria-label="Meridiem"]');
    await expect(amPmSpan).toHaveText('AM');
});

test('Empty form cann\'t be submitted', async ({ page }) => {
    await page.goto('/checkout/room-2');
    
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();
    
    await expect(page).toHaveURL('/checkout/room-2');

});

test('Form can be submited', async ({ page }) => {
    await page.goto('/checkout/room-2');
    
    const nameInput = page.locator('input[name="name"]');
    await nameInput.fill('Ahmed');
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill('ahmed@ahmed.com');
    const durationInput = page.locator('input[name="duration"]');
    await durationInput.fill('5');
    const selectInput = await page.locator('[role="combobox"]');
    await selectInput.click();
    page.locator('li').filter({ hasText: '2025-08-01' }).click();
    const cloclBtn = page.locator('[data-testid="ClockIcon"]');
    await cloclBtn.click();
    await page.locator('[aria-label="12 hours"]').click();
    await page.locator('text="OK"').click();
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();
    await expect(page).toHaveURL('/confirmation');
});