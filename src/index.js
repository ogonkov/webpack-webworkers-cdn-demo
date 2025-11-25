import { CustomWorker as Worker } from "./CustomWorker/CustomWorker.js";

const app = document.getElementById("root");

function getWorker() {
  return new Worker(new URL("./worker/worker.js", import.meta.url), {
    name: "calculator",
  });
}

let worker = getWorker();

worker.addEventListener("message", ({ data: { response } }) => {
  const p = document.createElement("p");
  p.textContent = JSON.stringify(response, null, 2);

  app.appendChild(p);
});

worker.postMessage({ query: 42 });

if (module.hot) {
  module.hot.accept(
    ["./CustomWorker/CustomWorker.js", "./worker/worker.js"],
    () => {
      worker.terminate();
      worker = getWorker();
    }
  );
}
