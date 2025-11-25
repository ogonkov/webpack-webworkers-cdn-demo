import { CustomWorker as Worker } from "./CustomWorker/CustomWorker.js";
import { domReady } from "./utils/domReady.js";

const app = document.getElementById("root");
const log = document.getElementById("log");

function getWorker() {
  return new Worker(new URL("./worker/worker.js", import.meta.url), {
    name: "calculator",
  });
}

let worker = getWorker();

worker.addEventListener("message", ({ data: { response } }) => {
  const p = document.createElement("p");
  p.textContent = JSON.stringify(response, null, 2);

  log.appendChild(p);
});

domReady(() => {
  app.querySelector("form")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target;

    if (form) {
      const data = new FormData(form);
      const value = Number(data.get("value"));

      if (!Number.isNaN(value) && typeof value === "number") {
        worker.postMessage({ query: value });
      }
    }
  });
});

if (module.hot) {
  module.hot.accept(
    ["./CustomWorker/CustomWorker.js", "./worker/worker.js"],
    () => {
      worker.terminate();
      worker = getWorker();
    }
  );
}
