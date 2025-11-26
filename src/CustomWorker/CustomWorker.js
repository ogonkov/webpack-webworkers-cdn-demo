export class CustomWorker {
  constructor(url, options) {
    const objectUrl = URL.createObjectURL(
      new Blob([`importScripts(${JSON.stringify(url)})`], {
        type: "application/javascript",
      })
    );
    this.worker = new Worker(objectUrl, options);
    this.worker.postMessage({ publicPath: window.__PUBLIC_PATH__ });
    URL.revokeObjectURL(objectUrl);
  }

  postMessage(...args) {
    this.worker.postMessage(...args);
  }

  addEventListener(...args) {
    this.worker.addEventListener(...args);
  }

  terminate() {
    this.worker.terminate();
  }
}
