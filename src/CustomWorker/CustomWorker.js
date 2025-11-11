export class CustomWorker {
  constructor(url) {
    const objectUrl = URL.createObjectURL(
      new Blob([`importScripts(${JSON.stringify(url)})`], {
        type: "application/javascript",
      })
    );
    this.worker = new Worker(objectUrl);
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
