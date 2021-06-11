const muninnStyle = `
  .muninn-tooltip {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    transition: .3s;
  }

  .muninn_highlight {
    background: #ffedaa;
    padding: 3px;
    margin: 1px;
    cursor: pointer;
    opacity: 1;
    border-radius: 4px;
    box-shadow: 0px 0px 1px 1px #d6bd60;
  }
  
  .muninn_highlight_parent {
    background: #fffbeb;
    border-radius: 4px;
  }

  .muninn-tooltip span {
    background: #333;
    border-radius: 4px;
    padding: 4px;
    margin-left: 5px;
  }

  .muninn-tooltip > div {
    display: inline-flex;
    align-items: center;
    min-height: 20px;
    font-size: 13px;
    padding: 5px;
    padding-left: 8px;
    z-index: 1;
    color: white;
    border-radius: 8px;
  }
  
  .muninn-tooltip-config {
    background: #6D51ED;
    border-bottom-left-radius: 0px !important;
  }
  
  .muninn-tooltip-name {
    background: #5462F7;
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
  }
  
  .muninn-tooltip-parent {
    background: #5887E0;
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
  }
  
  .muninn-tooltip-selector {
    background: #54B8F7;
    border-top-left-radius: 0px !important;
  }
  
  .muninn_active:hover {
    box-shadow: inset 0px 0px 0px 1px white;
  }

  .muninn_active:hover::before {
    z-index: 2;
  }
`;

const muninnScript = `
window.selectors = {};

function injectParent(selector, parent = "") {
  return selector.split(",")
  .map((key) => parent + " " + key)
  .join(", ");
}

function parseSelector(selector, parent) {
  return injectParent(selector.split("|")[0].split("@")[0], parent);
}

function getSchemaSelector(schema, selector = "", _key = "", config = "") {
  Object.keys(schema).forEach((key) => {
    const current = schema[key];
    const currentKey = _key ? _key + "." + key : key;

    if (typeof current === "string") {
      const _selector = parseSelector(current, selector);
      window.selectors[currentKey] = {
        selector: _selector,
        rawSelector: parseSelector(current),
        config: config,
        parent: selector,
      };
    } else if (typeof current === "object" && current.schema) {
      const currentSelector = current.selector
        ? parseSelector(current.selector, selector)
        : parseSelector(selector);
        
      getSchemaSelector(current.schema, currentSelector, currentKey, config);
    } else if (typeof current === "object" && current.selector) {
      window.selectors[currentKey] = {
        selector: parseSelector(current.selector, selector),
        rawSelector: parseSelector(current.selector),
        config: config,
        parent: selector,
      };
    }
  });
}


if (window.schemas) {
  Object.keys(window.schemas).forEach(key => {
    getSchemaSelector(window.schemas[key].schema, window.schemas[key].parent, "", key);
  });
};

Object.keys(window.selectors).forEach(key => {
    const currentSelector = window.selectors[key];

    if (currentSelector.parent) {
      document.querySelectorAll(currentSelector.parent).forEach(el => {
        el.classList.add('muninn_highlight_parent')
      })
    }

    document.querySelectorAll(currentSelector.selector).forEach(el => {
        el.classList.add('muninn_highlight')
        el.dataset.muninnSelector = currentSelector.selector;
        el.dataset.muninnParent = currentSelector.parent;
        el.dataset.muninnConfig = currentSelector.config;
        el.dataset.muninnRawSelector = currentSelector.rawSelector;
        el.dataset.muninnName = key;
    })
})

const tooltip = document.querySelector('.muninn-tooltip');
const tooltipConfig = document.querySelector('.muninn-tooltip-config');
const tooltipName = document.querySelector('.muninn-tooltip-name');
const tooltipParent = document.querySelector('.muninn-tooltip-parent');
const tooltipSelector = document.querySelector('.muninn-tooltip-selector');

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


`;

function inject(schemas) {
  const script = `
  function(){
    const tooltip = document.createElement('div');
    const tooltipConfig = document.createElement('div');
    const tooltipName = document.createElement('div');
    const tooltipParent = document.createElement('div');
    const tooltipSelector = document.createElement('div');
    tooltip.classList.add('muninn-tooltip');
    tooltipConfig.classList.add('muninn-tooltip-config');
    tooltipName.classList.add('muninn-tooltip-name');
    tooltipParent.classList.add('muninn-tooltip-parent');
    tooltipSelector.classList.add('muninn-tooltip-selector');

    tooltip.appendChild(tooltipConfig);
    tooltip.appendChild(tooltipName);
    tooltip.appendChild(tooltipParent);
    tooltip.appendChild(tooltipSelector);
    document.body.appendChild(tooltip);

    const style = document.createElement('style');
    style.appendChild(document.createTextNode(\`${muninnStyle}\`))
    document.body.appendChild(style);
    
    const schemaScript = document.createElement('script');
    schemaScript.id = 'muninn-script';
    document.body.appendChild(schemaScript);
    schemaScript.innerText = 'window.schemas = ${JSON.stringify(schemas)}';
    const script = document.createElement('script');
    script.id = 'muninn-script';
    script.appendChild(document.createTextNode(\`${muninnScript}\`))
    document.body.appendChild(script);
}
`;

  chrome?.tabs?.executeScript({ code: `(${script})();` }, ([]) => {});
}
