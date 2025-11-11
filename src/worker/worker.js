self.onmessage = async ({ data: { query } }) => {
  const logic = await import("./worker-logic.js");
  const response = logic.calc(query);

  self.postMessage({
    response,
  });
};
