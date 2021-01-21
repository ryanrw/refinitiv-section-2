import puppeteer from 'puppeteer'
import fs from 'fs'

main()

async function main() {
  console.log('Starting...')

  const browser = await puppeteer.launch()

  await downloadNavFundData(browser)

  await browser.close()

  console.log('Done!')
}

/**
 * Go to webpage and scrap the raw html from it
 * @param {puppeteer.Browser} browser 
 */
async function downloadNavFundData(browser) {
  const url = 'https://codequiz.azurewebsites.net'
  const htmlFileName = 'dist/navFund.html'

  const fileExists = fs.existsSync(htmlFileName)

  if (fileExists) {
    console.log(`Skipping download`)

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