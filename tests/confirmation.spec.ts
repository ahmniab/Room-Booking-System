import {test , expect} from '@playwright/test';

test('Confirmation Data valid', async ({ page }) => {
    const name = 'Ahmed';
    const email = 'ahmed@ahmed.com';
    await page.goto('/checkout/room-4');
    
    const nameInput = page.locator('input[name="name"]');
    await nameInput.fill(name);
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill(email);
    const selectInput = await page.locator('[role="combobox"]');
    await selectInput.click();
    page.locator('li').filter({ hasText: '2025-08-02' }).click();
    const cloclBtn = page.locator('[data-testid="ClockIcon"]');
    await cloclBtn.click();
    await page.locator('[aria-label="12 hours"]').click();
    await page.locator('text="OK"').click();
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();
    await expect(page).toHaveURL('/confirmation');

    await expect(page.locator('#root >div p:nth-child(3)'))
        .toHaveText('Thank you for your booking, ahmniab11@gmail.com!');
    await expect(page.locator('#root >div p:nth-child(5)'))
        .toHaveText('Date 2025-08-02, Time 12:00 AM');

});