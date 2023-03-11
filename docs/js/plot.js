import "https://cdn.plot.ly/plotly-2.18.2.min.js"

if (document.getElementById("rectangle-rule")) {
  function func(x) { return Math.sqrt(1 - x * x); }
  var a = Array.from({ length: 20 }, (_, i) => i / (20 - 1) * Math.PI / 2);
  var data = [{
    x: a.map(a => Math.cos(a)),
    y: a.map(a => Math.sin(a))
  }];
  var layout = {
    autosize: false,
    hovermode: false,
    width: 300,
    height: 325,
    margin: { l: 20, r: 20, b: 20, t: 20, },
    xaxis: { fixedrange: true },
    yaxis: { fixedrange: true },
  };

  Plotly.newPlot("rectangle-rule", data, layout, { displayModeBar: false });
  function update() {
    var slider = document.getElementById("myRange");
    let dx = slider.value;
    let barWidth = 1 / dx;
    var shapes = [];
    var area = 0;
    for (let i = 0; i < dx; i++) {
      let x = i / dx;
      let y = func(x + barWidth / 2);
      area += barWidth * y;
      shapes.push({
        type: 'rect',
        xref: 'x',
        yref: 'y',
        x0: x,
        x1: x + barWidth,
        y0: 0,
        y1: y,
        fillcolor: '#f5a142',
        opacity: 0.5,
        line: { width: 1 }
      });
    }
    let annotations = [{
      x: 1, xanchor: 'right',
      y: 1, yanchor: 'top',
      text: 'Expected = ' + Math.PI / 4,
      showarrow: false
    }, {
      x: 1, xanchor: 'right',
      y: 0.95, yanchor: 'top',
      text: 'Area ≈ ' + area,
      showarrow: false
    }];
    document.getElementById('textInput').value = "# of Rectangles: " + dx;
    Plotly.relayout("rectangle-rule", { annotations, shapes });
  }
  // slider
  update();
  var slider = document.getElementById("myRange");
  slider.oninput = update;
}

if (document.getElementById("high-frequency")) {
  let x = Array.from({ length: 100 }, (_, i) => i);
  let y = x.map(_ => Math.random() * 10);
  var data = [{ x, y }];
  var layout = {
    autosize: false,
    hovermode: false,
    width: 600,
    height: 240,
    margin: { l: 20, r: 20, b: 20, t: 20, },
    xaxis: { fixedrange: true },
    yaxis: { fixedrange: true },
  };

  Plotly.newPlot("high-frequency", data, layout, { displayModeBar: false });
}

if (document.getElementById("normal-distribution") &&
  document.getElementById("cumulative-distribution")) {
  const n = 40;
  function normalDistribution(x, a = 1, b = 0) {
    return 1 / (a * Math.sqrt(2 * Math.PI)) * Math.pow(Math.E, -0.5 * Math.pow((x - b) / a, 2));
  }

  // Left chart
  let x = Array.from({ length: n }, (_, i) => i / (n - 1) * 10 - 5);
  let y = x.map(x => normalDistribution(x));
  var data = [{ x, y }];
  var layout = {
    title: {
      text: "Probability Density Function (pdf)",
      font: { size: 12 },
    },
    autosize: false,
    hovermode: false,
    width: 400,
    height: 240,
    margin: { l: 20, r: 20, b: 20, t: 20, },
    xaxis: { fixedrange: true },
    yaxis: { fixedrange: true },
  };

  Plotly.newPlot("normal-distribution", data, layout, { displayModeBar: false });

  // Right chart
  let c = y;
  for (var i = 1; i < n; i++) {
    c[i] = c[i] + c[i - 1];
  }
  var data = [{ x, y: c }];
  var layout = {
    title: {
      text: "Cumulative Density Function (cdf)",
      font: { size: 12 },
    },
    autosize: false,
    hovermode: false,
    width: 400,
    height: 240,
    margin: { l: 20, r: 20, b: 20, t: 20, },
    xaxis: { fixedrange: true },
    yaxis: { fixedrange: true },
  };

  Plotly.newPlot("cumulative-distribution", data, layout, { displayModeBar: false });

  function binarySearch(arr, x) {
    let start = 0, end = arr.length - 1;
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      if (arr[mid] == x) return mid;
      else if (x > arr[mid])
        start = mid + 1;
      else
        end = mid - 1;
    }
    return Math.min(start, end);
  }
  function addSample1() {
    var cdfShapes = document.getElementById("cumulative-distribution").layout.shapes || [];
    let pt_y = Math.random() * c[n - 1];
    let ci = binarySearch(c, pt_y);
    let cii = (pt_y - c[ci]) / (c[ci + 1] - c[ci]);
    let pt_x = (ci + cii + 0.5) / n * 10 - 5;
    // horizontal
    cdfShapes.push({
      type: 'line',
      x0: -5, x1: pt_x,
      y0: pt_y, y1: pt_y,
    });
    // vertical
    cdfShapes.push({
      type: 'line',
      x0: pt_x, x1: pt_x,
      y0: 0, y1: pt_y,
    });
    Plotly.relayout("cumulative-distribution", { shapes: cdfShapes });
    
    var pdfShapes = document.getElementById("normal-distribution").layout.shapes || [];
    // vertical
    pdfShapes.push({
      type: 'line',
      x0: pt_x, x1: pt_x,
      y0: 0, y1: normalDistribution(pt_x),
    });
    Plotly.relayout("normal-distribution", { shapes: pdfShapes });
  }
  function addSample10() { for (var i = 0; i < 10; i++) addSample1(); }
  function reset() { 
    Plotly.relayout("cumulative-distribution", { shapes: [] });
    Plotly.relayout("normal-distribution", { shapes: [] });
  }

  document.getElementById("cdf-1").onclick = addSample1;
  document.getElementById("cdf-10").onclick = addSample10;
  document.getElementById("cdf-reset").onclick = reset;
}