export default (configs) => `
function() {
  var selectors = {};

  function parseSelector(selector, parent) {
    return selector.split("|")[0].split("@")[0];
  }

  function getSchemaSelector(schema, selector = "", _key = "", config = "") {
    if (!selectors[config]) {
      selectors[config] = {};
    }

    Object.keys(schema || {}).forEach((key) => {
      var current = schema[key];
      var currentKey = _key ? _key + "." + key : key;

      if (typeof current === "string") {
        var _selector = parseSelector(current, selector);
        selectors[config][currentKey] = {
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
        selectors[config][currentKey] = {
          selector: parseSelector(current.selector, selector),
          rawSelector: parseSelector(current.selector),
          config: config,
          parent: selector,
        };
      }
    });
  }

  var configs = ${JSON.stringify(configs)};

  if (configs) {
    Object.keys(configs).forEach((key) => {
      getSchemaSelector(
        configs[key].schema,
        configs[key].parent,
        "",
        key
      );
    });
  }

  Object.keys(selectors).forEach((config) => {
    Object.keys(selectors[config]).forEach((key) => {
        var currentSelector = selectors[config][key];
  
        if (currentSelector.parent) {
          document.querySelectorAll(currentSelector.parent).forEach((el) => {
            el.classList.add("muninn_highlight_parent");

            if (currentSelector.selector) {
              el.querySelectorAll(currentSelector.selector).forEach((el) => {
                el.classList.add("muninn_highlight");
                el.dataset.muninnSelector = currentSelector.selector;
                el.dataset.muninnParent = currentSelector.parent;
                el.dataset.muninnConfig = currentSelector.config;
                el.dataset.muninnRawSelector = currentSelector.rawSelector;
                el.dataset.muninnName = key;
              });
            }
          });
        } else {
          if (currentSelector.selector) {
            document.querySelectorAll(currentSelector.selector).forEach((el) => {
              el.classList.add("muninn_highlight");
              el.dataset.muninnSelector = currentSelector.selector;
              el.dataset.muninnParent = currentSelector.parent;
              el.dataset.muninnConfig = currentSelector.config;
              el.dataset.muninnRawSelector = currentSelector.rawSelector;
              el.dataset.muninnName = key;
            });
          }
        }
    });
  });
    
  var tooltip = document.querySelector(".muninn-tooltip");
  var tooltipConfig = document.querySelector(".muninn-tooltip-config");
  var tooltipName = document.querySelector(".muninn-tooltip-name");
  var tooltipParent = document.querySelector(".muninn-tooltip-parent");
  var tooltipSelector = document.querySelector(".muninn-tooltip-selector");
  
  document.querySelectorAll(".muninn_highlight").forEach((el) => {
    el.addEventListener("mouseover", (e) => {
      if (!e.target.dataset.muninnName) {
        return;
      }
      e.stopPropagation();
      e.target.classList.add("muninn_active");
      tooltip.style.opacity = 1;
      tooltip.style.top = e.pageY + "px";
      tooltip.style.left = e.pageX + "px";
      tooltipConfig.innerHTML =
        "<b>Config:</b><span>" + e.target.dataset.muninnConfig + "</span>";
      tooltipName.innerHTML =
        "<b>Name:</b><span>" + e.target.dataset.muninnName + "</span>";
      tooltipParent.innerHTML =
        "<b>Parent:</b><span>" + e.target.dataset.muninnParent + "</span>";
      tooltipSelector.innerHTML =
        "<b>Selector:</b>" +
        e.target.dataset.muninnRawSelector
          .split(", ")
          .map((selector) => "<span>" + selector + "</span>")
          .join(" ");
    });
    
    el.addEventListener("mouseout", (e) => {
      e.stopPropagation();
      e.target.classList.remove("muninn_active");
      tooltip.style.opacity = 0;
    });
  });

  var muninnConfigScriptEl = document.querySelector('#muninn-config-script');

  if (muninnConfigScriptEl) {
      muninnConfigScriptEl.remove();
  }

  var schemaScript = document.createElement('script');
  schemaScript.id = 'muninn-config-script';
  document.body.appendChild(schemaScript);
  schemaScript.innerText = 'window.selectors = ' + JSON.stringify(selectors);
}
`;
