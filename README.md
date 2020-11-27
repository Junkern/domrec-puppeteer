# domrec-puppeteer

Uses `domrec-core` to record DOM changes inside puppeteer scripts. Basically, makes it possible to record videos in headless chrome.

## Installation

`npm install --save domrec-puppeteer` or `yarn add domrec-puppeteer`

## Usage

```js
const {PuppeteerRecorder} = require('domrec-puppeteer')

// ...We are skipping the full setup of the puppeteer browsing session here
const page = await browser.newPage()

// Setup the Dom Recorder
const recorder = new PuppeteerRecorder(page)
await recorder.init()

// do your thing with puppeteer

await recorder.stopRecording()
await browser.close()
const recordings = recorder.recordings
```

## API


* `new PuppeteerRecorder(page)`: Create a new `PuppeteerRecorder`. Page should be a puppeteer page
* `async init()`: Sets up everything
* `async stopRecording()`: Gathers data from the current open website. You should use this before closing the browser or after a failed test

Properties:

* `recordings`: The collected recordings. For information about the data structure see https://github.com/Junkern/DOMRec


## What to do with the `recordings`?

Use the `DOMRecPlayer` from https://github.com/Junkern/DOMRec#replaying

## Inner Working

We use the `recording.js` from `domrec-core` to record dom changes. We also have a second script to simplify using the `DOMRecorder`.

To inject the two scripts, we use `page.evaluateOnNewDocument`. To receive the data of the dom recording, we use `page.exposeFunction`.

At the moment, we only start recording after the `DOMContentLoaded` event on the website was triggered and we record the whole `document.body`.

There are plans to make both settings (when and what to record) customizable.