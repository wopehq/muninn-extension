import tooltipStyle from "./tooltipStyle";

export default `
function(){
    var tooltipEl = document.querySelector('.muninn-tooltip');

    if (tooltipEl) {
        tooltipEl.remove();
        document.querySelector('#muninn-script').remove();
        document.querySelector('#muninn-style').remove();
    }

    var tooltip = document.createElement('div');
    tooltip.classList.add('muninn-tooltip');

    tooltip.innerHTML = "<div class='muninn-tooltip-config'></div><div class='muninn-tooltip-name'></div><div class='muninn-tooltip-parent'></div><div class='muninn-tooltip-selector'></div>";

    document.body.appendChild(tooltip);

    var style = document.createElement('style');
    style.id = 'muninn-style';
    style.appendChild(document.createTextNode(\`${tooltipStyle}\`))
    document.body.appendChild(style);
}
`;
