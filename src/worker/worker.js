import { en } from "../i18n/en.js";

self.onmessage = async ({ data: { publicPath, query } }) => {
  if (publicPath) {
    __webpack_public_path__ = publicPath;
  }

  if (query) {
    const logic = await import("./worker-logic.js");
    const response = logic.calc(query);

    self.postMessage({
      response: `${en.answer} ${response}`,
    });
  }
};
