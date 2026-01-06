const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/DDD East Midlands/);
  });

  test('should display main heading', async ({ page }) => {
    await page.goto('/');
    const heading = page.getByRole('heading', {
      name: /Developer! Developer! Developer! East Midlands/i,
    });
    await expect(heading).toBeVisible();
  });

  test('should display all main content sections', async ({ page }) => {
    await page.goto('/');

    // Check for main description section
    const mainDescription = page.locator('text=DDD East Midlands was an inclusive');
    await expect(mainDescription).toBeVisible();

    // Check for event status section
    const eventStatus = page.locator('text=Event on hold indefinitely');
    await expect(eventStatus).toBeVisible();

    // Check for principles section
    const principlesHeading = page.getByRole('heading', {
      name: 'Principles',
    });
    await expect(principlesHeading).toBeVisible();

    // Check for DDD principles list items
    const saturdayPrinciple = page.locator(
      'text=The event was hosted on a Saturday'
    );
    await expect(saturdayPrinciple).toBeVisible();

    const freeTickets = page.locator(
      'text=Tickets to attend the event were free'
    );
    await expect(freeTickets).toBeVisible();

    // Check for additional principles
    const anonymousSubmissions = page.locator(
      'text=All talk submissions were anonymous'
    );
    await expect(anonymousSubmissions).toBeVisible();
  });

  test('should have header banner', async ({ page }) => {
    await page.goto('/');
    const banner = page.locator('.background');
    await expect(banner).toBeVisible();

    // Verify it has a background image set
    const hasBackgroundImage = await banner.evaluate((el) => {
      const bgImage = window.getComputedStyle(el).backgroundImage;
      return bgImage && bgImage !== 'none';
    });
    expect(hasBackgroundImage).toBe(true);
  });
});
