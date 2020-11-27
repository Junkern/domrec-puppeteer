const fs = require('fs')
const path = require('path')

class PuppeteerRecorder {
  constructor(page) {
    this.page = page
    this.collectedSaves = []
  }

  async init() {
    await this.page.exposeFunction('sendData', (data)=> {
      this.collectedSaves.push(data)
    })
    await this.page.evaluateOnNewDocument(this.loadDOMRecordingScript());
    await this.page.evaluateOnNewDocument(this.loadControllerScript());
  }
  loadDOMRecordingScript() {
    const filePath = path.join(__dirname, '..', 'node_modules', 'domrec-core', 'dist', 'recording.js')
    return fs.readFileSync(filePath, 'utf-8')
  }
  loadControllerScript() {
    const filePath = path.join(__dirname, 'assets', 'scriptTag.js')
    return fs.readFileSync(filePath, 'utf-8')
  }

  async stopRecording() {
    await this.page.evaluate(async () => {
      const data = window.rec.stop()
      window.sendData(data)
    });
  }
}


module.exports = {PuppeteerRecorder}