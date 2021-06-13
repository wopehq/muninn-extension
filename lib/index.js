function getSchemas() {
  const rawSchemas = localStorage.schemas || "{}";
  const schemas = JSON.parse(rawSchemas);
  return schemas;
}

function setSchemas(schemas) {
  localStorage.schemas = JSON.stringify(schemas || {});
}

function refreshSchemaList() {
  const configList = document.querySelector(".config-list");
  configList.innerHTML = "";

  const schemas = getSchemas();
  Object.keys(schemas).forEach((key) => {
    const item = document.createElement("div");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("config-item-delete");
    deleteBtn.innerText = "❌";
    item.classList.add("config-item");
    item.innerText = key;
    item.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function () {
      const schemas = getSchemas();
      delete schemas[key];
      setSchemas(schemas);
      inject(schemas);
      refreshSchemaList();
    });
    configList.appendChild(item);
  });

  inject(schemas);
}

refreshSchemaList();
