window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
    package: { "[+]": ["cancel"] }
  },
  chtml: { scale: 0.9 },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  },
  loader: { load: ["[tex]/cancel"] }
};

document$.subscribe(() => { 
  MathJax.typesetPromise()
})