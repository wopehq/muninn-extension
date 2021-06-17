export default `
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
    z-index: 99999;
  }

  .muninn_highlight {
    background: #fdf0f0;
    padding: 3px;
    margin: 1px;
    cursor: pointer;
    opacity: 1;
    border-radius: 4px;
    box-shadow: 0px 0px 1px 1px #ffd2d2;
  }
  
  .muninn_highlight_parent {
    background: #fef8f8;
    border-radius: 4px;
  }
  
  .muninn_active:hover {
    background: #ffd2d2;
    box-shadow: inset 0px 0px 0px 1px white;
  }

  .muninn_active:hover::before {
    z-index: 2;
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
`;
