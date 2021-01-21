# Note for viewer

This project is using [puppeteer](https://github.com/puppeteer/puppeteer) to scrap the page when run a `server.js` the first time, so the first time will be slow. After that first run, it will be faster (it use a saved HTML file instead).

# How to run this project

1. Install dependencies

```
npm install
```

2. Start the script

```
npm start -- <fund name>
```

## Example

```
$> npm start -- "B-FUTURESSF"
< 11.443