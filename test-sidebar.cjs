const { chromium } = require('playwright');

async function testSidebar() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to the application...');
    await page.goto('http://localhost:5173');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    console.log('Page loaded, checking for errors...');
    
    // Check for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Console Error:', msg.text());
      }
    });
    
    // Check for network errors
    page.on('response', response => {
      if (!response.ok()) {
        console.log('Network Error:', response.status(), response.url());
      }
    });
    
    // Take a screenshot
    await page.screenshot({ path: 'sidebar-test.png', fullPage: true });
    console.log('Screenshot saved as sidebar-test.png');
    
    // Check if we're on login page
    const loginForm = await page.locator('form').first();
    if (await loginForm.isVisible()) {
      console.log('On login page, attempting to login...');
      
      // Fill in login form with test credentials
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="password"]', 'password123');
      
      // Click login button
      await page.click('button[type="submit"]');
      
      // Wait for navigation
      await page.waitForLoadState('networkidle');
      
      // Take another screenshot
      await page.screenshot({ path: 'after-login.png', fullPage: true });
      console.log('Screenshot after login saved as after-login.png');
    }
    
    // Check for sidebar elements
    console.log('Checking for sidebar elements...');
    const sidebar = await page.locator('[data-sidebar]').first();
    if (await sidebar.isVisible()) {
      console.log('Sidebar is visible');
    } else {
      console.log('Sidebar not found or not visible');
    }
    
    // Check for specific sidebar components
    const sidebarTrigger = await page.locator('[data-sidebar-trigger]').first();
    if (await sidebarTrigger.isVisible()) {
      console.log('Sidebar trigger found');
    } else {
      console.log('Sidebar trigger not found');
    }
    
    // Check for any error messages
    const errorMessages = await page.locator('[class*="error"], [class*="destructive"]').all();
    if (errorMessages.length > 0) {
      console.log('Found error messages:');
      for (const error of errorMessages) {
        const text = await error.textContent();
        if (text && text.trim()) {
          console.log('-', text.trim());
        }
      }
    }
    
    // Wait a bit to see the page
    await page.waitForTimeout(3000);
    
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await browser.close();
  }
}

testSidebar();
