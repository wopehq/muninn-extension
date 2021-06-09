const muninnStyle = `
  .muninn_highlight {
    background: #ffedaa;
    padding: 3px;
    cursor: pointer;
    border-radius: 4px;
    border-bottom-left-radius: 0px;
  }
  
  .muninn_highlight_parent {
    background: #fff6d4;
  }
  
  .muninn-tooltip {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
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
    min-height: 25px;
    font-size: 13px;
    padding: 5px;
    z-index: 1;
    color: white;
    border-radius: 8px;
  }
  
  .muninn-tooltip-name {
    background: seagreen;
    border-bottom-left-radius: 0px;
  }
  
  .muninn-tooltip-selector {
    background: royalblue;
    border-top-left-radius: 0px;
  }
  
  .muninn_active:hover {
    box-shadow: inset 0px 0px 1px 1px seagreen;
  }

  .muninn_active:hover::before {
    z-index: 2;
  }
`;

const muninnScript = `
const schema = JSON.parse(localStorage.schema || "{}");
const selectors = {};

function parseSelector(selector) {
  return selector.split("|")[0].split("@")[0]
}

function getSchemaSelector(schema, selector = '', _key = '') {
  Object.keys(schema).forEach((key) => {
    const current = schema[key];
    const currentKey = _key ? _key + '.' + key : key;

    if (typeof current === "string") {
      selectors[currentKey] = selector + ' ' + parseSelector(current);
    } else if (typeof current === "object" && current.schema) {
      const currentSelector = current.selector ? selector + " " + parseSelector(current.selector) : selector; 
      getSchemaSelector(current.schema, currentSelector, currentKey);
    } else if (typeof current === "object" && current.selector) {
      selectors[currentKey] = selector + ' ' + parseSelector(current.selector);
    }
  });
}

getSchemaSelector(schema);

Object.keys(selectors).forEach(key => {
    document.querySelectorAll(selectors[key]).forEach(el => {
        el.classList.add('muninn_highlight')
        el.dataset.muninnSelector = selectors[key];
        el.dataset.muninnName = key;
    })
})

const tooltip = document.querySelector('.muninn-tooltip');
const tooltipName = document.querySelector('.muninn-tooltip-name');
const tooltipSelector = document.querySelector('.muninn-tooltip-selector');

document.querySelectorAll(".muninn_highlight").forEach((el) => {
  el.addEventListener("mouseover", (e) => {
    if (!e.target.dataset.muninnName) {
      return;
    }
    e.stopPropagation();
    e.target.classList.add("muninn_active");
    tooltip.style.visibility = 'visible';
    tooltip.style.top = e.pageY + 'px';
    tooltip.style.left = e.pageX + 'px';
    console.log(e)
    tooltipName.innerHTML = '<b>Name:</b><span>' + e.target.dataset.muninnName + '</span>';
    tooltipSelector.innerHTML = '<b>Selector:</b><span>' + e.target.dataset.muninnSelector + '</span>';
    
  });

  el.addEventListener("mouseout", (e) => {
    e.stopPropagation();
    e.target.classList.remove("muninn_active");
    tooltip.style.visibility = 'hidden';
  });
});

`;

const script = `
function(){
    const tooltip = document.createElement('div');
    const tooltipName = document.createElement('div');
    const tooltipSelector = document.createElement('div');
    tooltip.classList.add('muninn-tooltip');
    tooltipName.classList.add('muninn-tooltip-name');
    tooltipSelector.classList.add('muninn-tooltip-selector');

    tooltip.appendChild(tooltipName);
    tooltip.appendChild(tooltipSelector);
    document.body.appendChild(tooltip);

    const style = document.createElement('style');
    style.appendChild(document.createTextNode(\`${muninnStyle}\`))
    document.body.appendChild(style);

    const script = document.createElement('script');
    script.appendChild(document.createTextNode(\`${muninnScript}\`))
    document.body.appendChild(script);
}
`;

chrome?.tabs?.executeScript({ code: `(${script})();` }, ([]) => {});
