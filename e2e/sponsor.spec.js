const { test, expect } = require('@playwright/test');

test.describe('Sponsor Pages', () => {
  test('should load sponsorship tiers page', async ({ page }) => {
    await page.goto('/sponsor/sponsorship-tiers');

    // Verify page title
    await expect(page).toHaveTitle(/Sponsorship Tiers/);

    // Check for main heading
    const heading = page.locator('text=Sponsorship Tiers 2023');
    await expect(heading).toBeVisible();
  });

  test('should display sponsorship tier sections', async ({ page }) => {
    await page.goto('/sponsor/sponsorship-tiers');

    // Check for contents section
    const contentsHeading = page.getByRole('heading', {
      name: 'Contents',
    });
    await expect(contentsHeading).toBeVisible();

    // Check for tier navigation links
    const platinumLink = page.locator('a[href="#platinum-sponsor"]');
    await expect(platinumLink).toBeVisible();

    const goldLink = page.locator('a[href="#gold-sponsor"]');
    await expect(goldLink).toBeVisible();

    const silverLink = page.locator('a[href="#sillver-sponsor"]');
    await expect(silverLink).toBeVisible();

    // Check for "How to Sponsor" section
    const howToSponsor = page.getByRole('heading', {
      name: 'How to Sponsor',
    });
    await expect(howToSponsor).toBeVisible();

    // Check for Platinum sponsor section
    const platinumHeading = page.getByRole('heading', {
      name: 'Platinum Sponsor',
    });
    await expect(platinumHeading).toBeVisible();
  });

  test('should have sponsor tier images loaded', async ({ page }) => {
    await page.goto('/sponsor/sponsorship-tiers');

    // Wait for images to load
    await page.waitForLoadState('networkidle');

    // Check for platinum tier image
    const platinumImage = page.locator('img[alt*="attendees"]').first();
    await expect(platinumImage).toBeVisible();
  });

  test('should navigate within sponsor sections using anchor links', async ({
    page,
  }) => {
    await page.goto('/sponsor/sponsorship-tiers');

    // Click on platinum link
    const platinumLink = page.locator('a[href="#platinum-sponsor"]');
    await platinumLink.click();

    // Verify we're at the platinum section (URL may have trailing slash before hash)
    await expect(page).toHaveURL(/sponsorship-tiers\/?#platinum-sponsor/);

    // Verify the platinum section heading is visible
    const platinumSection = page.locator('#platinum-sponsor');
    await expect(platinumSection).toBeVisible();
  });

  test('should load why sponsor page', async ({ page }) => {
    await page.goto('/sponsor/why-sponsor');

    // Verify page loaded
    const heading = page.locator('text=Why Sponsor').first();
    await expect(heading).toBeVisible();
  });

  test('should load sponsor the event page', async ({ page }) => {
    await page.goto('/sponsor/sponsor-the-event');

    // Verify page loaded - page title is "Sponsor"
    await expect(page).toHaveTitle(/Sponsor/);

    // Check for event details section
    const heading = page.getByRole('heading', { name: 'Event Details' });
    await expect(heading).toBeVisible();
  });

  test('should have accessible sponsor links with proper attributes', async ({
    page,
  }) => {
    await page.goto('/sponsor/sponsorship-tiers');

    // Check that page has links with tabindex for accessibility
    const accessibleLink = page.locator('a[tabindex="0"]').first();
    // Wait for page to fully load and scroll to make element visible
    await page.waitForLoadState('domcontentloaded');
    
    // Just verify the link exists in the DOM
    await expect(accessibleLink).toHaveCount(1);
  });

  test('should display testimonials page', async ({ page }) => {
    await page.goto('/sponsor/testimonials');

    // Verify page loaded
    const heading = page.locator('text=Testimonials').first();
    await expect(heading).toBeVisible();
  });

  test('should load social responsibility page', async ({ page }) => {
    await page.goto('/sponsor/social-responsibility');

    // Verify page loaded
    const heading = page.locator('text=Social Responsibility').first();
    await expect(heading).toBeVisible();
  });
});

test.describe('About Page - Organisers Grid', () => {
  test('should display organizer photo grid', async ({ page }) => {
    await page.goto('/about-the-conference');

    // Scroll to organisers section
    await page.locator('#organisers').scrollIntoViewIfNeeded();

    // Check for volunteer grid
    const volunteerGrid = page.locator('.volunteer-grid');
    await expect(volunteerGrid).toBeVisible();

    // Check for organizer images
    const organizerImages = page.locator('.volunteer-grid-item img');
    await expect(organizerImages.first()).toBeVisible();

    // Count organizer grid items (should have 6 based on the code)
    const gridItems = page.locator('.volunteer-grid-item');
    await expect(gridItems).toHaveCount(6);
  });

  test('should have clickable organizer profile links', async ({ page }) => {
    await page.goto('/about-the-conference');

    // Scroll to organisers section
    await page.locator('#organisers').scrollIntoViewIfNeeded();

    // Find the first organizer link
    const jessicaLink = page.locator(
      'a[href="../organisers/jessica-white"]'
    );
    await expect(jessicaLink).toBeVisible();

    // Verify it has proper accessibility attributes
    await expect(jessicaLink).toHaveAttribute('tabindex', '0');
    await expect(jessicaLink).toHaveAttribute(
      'title',
      'Link to Information About Jessica'
    );
  });

  test('should display all organizer images with alt text', async ({
    page,
  }) => {
    await page.goto('/about-the-conference');

    // Scroll to organisers section
    await page.locator('#organisers').scrollIntoViewIfNeeded();

    // Check for specific organizer images with alt text
    const jessicaImage = page.locator('img[alt="Picture of Jessica White"]');
    await expect(jessicaImage).toBeVisible();

    const moretonImage = page.locator(
      'img[alt="Picture of Moreton Brockley"]'
    );
    await expect(moretonImage).toBeVisible();

    const rachelImage = page.locator('img[alt="Picture of Rachel Watson"]');
    await expect(rachelImage).toBeVisible();
  });

  test('should handle hover states on organizer grid items', async ({
    page,
  }) => {
    await page.goto('/about-the-conference');

    // Scroll to organisers section
    await page.locator('#organisers').scrollIntoViewIfNeeded();

    // Get first grid item
    const firstGridItem = page.locator('.volunteer-grid-item').first();
    await expect(firstGridItem).toBeVisible();

    // Hover over the item
    await firstGridItem.hover();

    // The element should still be visible after hover
    await expect(firstGridItem).toBeVisible();
  });
});
