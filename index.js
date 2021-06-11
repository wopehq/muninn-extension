const rawSchemas = localStorage.schemas || "{}";
const schemas = JSON.parse(rawSchemas);

function refreshSchemaList() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  Object.keys(schemas).forEach((key) => {
    const item = document.createElement("div");
    item.classList.add("schema-item");
    item.innerText = key;
    app.appendChild(item);
  });

  inject(schemas);
}

refreshSchemaList();
