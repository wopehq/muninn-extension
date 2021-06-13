export default function (script, callback) {
  chrome?.tabs?.executeScript({ code: `(${script})();` }, ([results]) => {
    if (callback) callback(results);
  });
}
