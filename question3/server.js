import puppeteer from 'puppeteer'
import fs from 'fs'
import cheerio from 'cheerio'

main()

async function main() {
  const browser = await puppeteer.launch()

  await downloadNavFundData(browser)

  const navFunds = await parseNavFund()

  printNavFundValue(navFunds)

  await browser.close()
}

/**
 * Go to webpage and scrap the raw html from it
 * @param {puppeteer.Browser} browser 
 */
async function downloadNavFundData(browser) {
  const url = 'https://codequiz.azurewebsites.net'
  const htmlFileName = 'dist/navFund.html'

  const fileExists = fs.existsSync(htmlFileName)

  // Using file instead, which is faster
  if (fileExists) {
    return
  }

  const html = await fetchUrl(browser, url)

  await fs.promises.writeFile(htmlFileName, html)
}

/**
 * Fetch a page from URL
 * @param {puppeteer.Browser} browser 
 * @param {string} url 
 */
async function fetchUrl(browser, url) {
  const page = await newPage(browser)

  await page.goto(url, {
    timeout: 20000, // 20s
    waitUntil: 'domcontentloaded'
  })

  await clickOnAcceptButton(page)

  const html = await page.content()

  await page.close()

  return html
}

/**
 * Create a new page
 * @param {puppeteer.Browser} browser 
 */
async function newPage(browser) {
  const page = await browser.newPage()

  page.setDefaultTimeout(20000) // 20s

  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36 Edg/87.0.664.75')

  await page.setViewport({
    width: 1980,
    height: 1080
  })

  return page
}

/**
 * Click on accept button on the page to accept cookies
 * @param {puppeteer.Page} page
 */
async function clickOnAcceptButton(page) {
  await page.$eval('input[type=button]', button => button.click())
}

/**
 * @typedef {object} NavFund - NavFund
 * @property {string} fundName
 * @property {string} nav
 * @property {string} bid
 * @property {string} offer
 * @property {string} change
 */

/**
 * Parse raw HTML into NavFund object
 * @returns {NavFund[]}
 */
async function parseNavFund() {
  const htmlFileName = 'dist/navFund.html'

  const html = await fs.promises.readFile(htmlFileName)

  const $ = cheerio.load(html)

  const $trs = $('table tbody tr')

  const values = $trs.toArray().filter(tr => $(tr).find('td').toArray().length > 0).map(tr => {
    const tds = $(tr).find('td').toArray()

    const navFund = {
      fundName: '',
      nav: '',
      bid: '',
      offer: '',
      change: ''
    }

    const keys = Object.keys(navFund)

    tds.forEach((td, index) => {
      const $td = $(td)

      navFund[keys[index]] = $td.text()
    })

    return navFund
  })

  return values
}

/**
 * Print NAV value to console
 * @param {NavFund[]} navFunds 
 */
function printNavFundValue(navFunds) {
  const value = navFunds.find(item => item.fundName === process.argv[process.argv.length - 1])

  if (value) {
    console.log(value.nav)
  }
}