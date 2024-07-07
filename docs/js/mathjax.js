window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
    package: { "[+]": ["cancel"] }
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  },
  loader: { load: ["[tex]/cancel"] }
};

document$.subscribe(() => { 
  MathJax.typesetPromise()
})