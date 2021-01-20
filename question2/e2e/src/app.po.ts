import { browser, by, element, until } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async enterInput(input: string): Promise<void> {
    element(by.css('app-root .input-container input')).sendKeys(input)
  }

  async isCategoriesTablePresent(): Promise<boolean> {
    return element(by.css('app-root')).isElementPresent(by.css('table.categories'))
  }

  async isFilterTablePresent(): Promise<boolean> {
    return element(by.css('app-root')).isElementPresent(by.css('table.result'))
  }

  async waitForResultTable(isInput: boolean) {
    await browser.wait(until.elementsLocated(by.css(isInput ? 'table.result td' : 'table.categories td')))
  }
}
