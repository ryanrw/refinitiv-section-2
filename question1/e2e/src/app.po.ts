import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async enterInput(input: string = ""): Promise<void> {
    await element(by.css('app-root .container #number')).sendKeys(input)
  }

  async selectDropdown(input: 'isPrime' | 'isFibonacci') {
    const options = await element.all(by.css('app-root .container #func-name option'))
    
    await options[input === 'isPrime' ? 0 : 1].click()
  }

  async getAnswer() {
    return element(by.css('app-root .container .right-col')).getText()
  }
}
