// duplicated from scrollbars.css
const SCROLLBAR_CSS = `* {
  scrollbar-width: thin;
  scrollbar-color: rgb(148 163 184 / 0.6) transparent;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background: rgb(148 163 184 / 0.6);
  border-radius: 4px;
  border: 2px solid transparent;
  background-clip: content-box;
}

*::-webkit-scrollbar-thumb:hover {
  background: rgb(148 163 184 / 0.8);
  background-clip: content-box;
}

*::-webkit-scrollbar-corner {
  background: transparent;
}`;

export default SCROLLBAR_CSS;
