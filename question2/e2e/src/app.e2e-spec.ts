import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display categories table', async () => {
    await page.navigateTo();
    expect(await page.isCategoriesTablePresent()).toBeTruthy()
  });

  it('should not display filtered categories table', async () => {
    await page.navigateTo();
    expect(await page.isFilterTablePresent()).toBeFalsy()
  });

  it('should display filtered categories table when user input', async () => {
    const isInput = true

    await page.navigateTo()

    await page.waitForResultTable(!isInput)

    await page.enterInput('Animal')

    await page.waitForResultTable(isInput)

    expect(await page.isFilterTablePresent()).toBeTruthy()
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
