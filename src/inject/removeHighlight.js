export default `
function() {
    document.querySelectorAll('.muninn_highlight, .muninn_highlight_parent').forEach(el => {
        el.classList.remove('muninn_highlight');
        el.classList.remove('muninn_highlight_parent');
        delete el.dataset.muninnSelector;
        delete el.dataset.muninnParent;
        delete el.dataset.muninnConfig;
        delete el.dataset.muninnRawSelector;
        delete el.dataset.muninnName;
    });
}
`;
