import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  describe("isPrime", () => {
    it('should get the answer `true` when enter a number in the input', async () => {
      await page.navigateTo();
  
      await page.enterInput('2')
  
      expect(await page.getAnswer()).toEqual('true');
    });
  
    it('should get the answer `false` when enter non-prime number in the input', async () => {
      await page.navigateTo();
  
      await page.enterInput('6')
  
      expect(await page.getAnswer()).toEqual('false');
    })
  
    it('should get the answer `false` when enter non-prime number in the input', async () => {
      await page.navigateTo();
  
      await page.enterInput('')
  
      expect(await page.getAnswer()).toEqual('false');
    })
  })

  describe("isFibonacci", () => {
    it('should get the answer `true` when enter a number in the input', async () => {
      await page.navigateTo();
  
      await page.enterInput('2')

      await page.selectDropdown('isFibonacci')
  
      expect(await page.getAnswer()).toEqual('true');
    });
  
    it('should get the answer `false` when enter non-prime number in the input', async () => {
      await page.navigateTo();
  
      await page.enterInput('6')

      await page.selectDropdown('isFibonacci')
  
      expect(await page.getAnswer()).toEqual('false');
    })
  
    it('should get the answer `false` when enter non-prime number in the input', async () => {
      await page.navigateTo();
  
      await page.enterInput('')

      await page.selectDropdown('isFibonacci')
  
      expect(await page.getAnswer()).toEqual('false');
    })
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
