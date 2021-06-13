export default `
window.selectors = {};

function injectParent(selector, parent = "") {
  return selector.split(",")
  .map((key) => parent + " " + key)
  .join(", ");
}

function parseSelector(selector, parent) {
  return injectParent(selector.split("|")[0].split("@")[0], parent);
}

function getSchemaSelector(schema, selector = "", _key = "", config = "unnamed") {
  window.selectors[config] = {}

  Object.keys(schema).forEach((key) => {
    var current = schema[key];
    var currentKey = _key ? _key + "." + key : key;

    if (typeof current === "string") {
      var _selector = parseSelector(current, selector);
      window.selectors[config][currentKey] = {
        selector: _selector,
        rawSelector: parseSelector(current),
        config: config,
        parent: selector,
      };
    } else if (typeof current === "object" && current.schema) {
      var currentSelector = current.selector
        ? parseSelector(current.selector, selector)
        : parseSelector(selector);
        
      getSchemaSelector(current.schema, currentSelector, currentKey, config);
    } else if (typeof current === "object" && current.selector) {
      window.selectors[config][currentKey] = {
        selector: parseSelector(current.selector, selector),
        rawSelector: parseSelector(current.selector),
        config: config,
        parent: selector,
      };
    }
  });
}
`;
