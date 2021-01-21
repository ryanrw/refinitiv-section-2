import puppeteer from 'puppeteer'

main()

async function main() {
  console.log('Starting...')

  const browser = await puppeteer.launch()

  await browser.close()

  console.log('Done!')
}