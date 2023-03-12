const safeWidth = window.innerWidth - 30;
if (document.getElementById("rectangle-rule")) {
  function func(x) { return Math.sqrt(1 - x * x); }
  var a = Array.from({ length: 20 }, (_, i) => i / (20 - 1) * Math.PI / 2);
  var data = [{
    x: a.map(a => Math.cos(a)),
    y: a.map(a => Math.sin(a))
  }];
  let width = Math.min(300, safeWidth);
  var layout = {
    autosize: false,
    hovermode: false,
    width,
    height: width * (325.0 / 300.0),
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
  let width = Math.min(600, safeWidth);
  var layout = {
    autosize: false,
    hovermode: false,
    width,
    height: width * (240.0 / 600.0),
    margin: { l: 20, r: 20, b: 20, t: 20, },
    padding: { l: 0, r: 0, b: 0, t: 0, },
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
  let width = Math.min(400, safeWidth);
  var layout = {
    title: {
      text: "Probability Density Function (pdf)",
      font: { size: 12 },
    },
    autosize: false,
    hovermode: false,
    width,
    height: width * (240.0 / 400.0),
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
    width,
    height: width * (240.0 / 400.0),
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
      line: { width: 0.5 },
    });
    // vertical
    cdfShapes.push({
      type: 'line',
      x0: pt_x, x1: pt_x,
      y0: 0, y1: pt_y,
      line: { width: 0.5 },
    });
    Plotly.relayout("cumulative-distribution", { shapes: cdfShapes });

    var pdfShapes = document.getElementById("normal-distribution").layout.shapes || [];
    // vertical
    pdfShapes.push({
      type: 'line',
      x0: pt_x, x1: pt_x,
      y0: 0, y1: normalDistribution(pt_x),
      line: { width: 0.5 },
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

if (document.getElementById("rejection-graph")) {
  var data = [
    { x: [], y: [], mode: "markers", type: "scatter", marker: { color: "#f24a27", size: 12 } },
    { x: [], y: [], mode: "markers", type: "scatter", marker: { color: "#51ce00", size: 12 } },
  ];
  let arrow = [
    { type: 'line', x0: 0, x1: 4, y0: 0, y1: 8 },
    { type: 'line', x0: 0, x1: 4, y0: 0, y1: 3, },
    { type: 'line', x0: 4, x1: 8, y0: 8, y1: 0, },
    { type: 'line', x0: 4, x1: 8, y0: 3, y1: 0, }
  ];
  let width = Math.min(240, safeWidth);
  var layout = {
    autosize: false,
    hovermode: false,
    showlegend: false,
    width,
    height: width,
    margin: { l: 20, r: 20, b: 20, t: 20, },
    xaxis: { fixedrange: true, range: [0, 8] },
    yaxis: { fixedrange: true, range: [0, 8] },
    shapes: arrow,
  };

  const limit = 1000;
  var area = 0, inCount = 0, sampleCount = 0;
  var playing = false;
  var timeout;
  function plot() {
    function inTriangle(px, py, p0x, p0y, p1x, p1y, p2x, p2y) {
      let area = 10;
      let s = 1 / (2 * area) * (p0y * p2x - p0x * p2y + (p2y - p0y) * px + (p0x - p2x) * py);
      let t = 1 / (2 * area) * (p0x * p1y - p0y * p1x + (p0y - p1y) * px + (p1x - p0x) * py);
      return s > 0 && t > 0 && (s + t) < 1;
    }
    function inShape(x, y) {
      return inTriangle(x, y, 0, 0, 4, 3, 4, 8) || inTriangle(x, y, 4, 3, 8, 0, 4, 8);
    }
    let x = Math.random() * 8, y = Math.random() * 8;
    let inside = inShape(x, y) ? 1 : 0;
    let pdf = 1.0 / 64.0; // choose x∈[0,8] and y∈[0,8] (1/8 * 1/8)
    inCount += inside;
    area = inCount / pdf / ++sampleCount;
    if (data[inside].x.length > limit) data[inside].x.shift();
    if (data[inside].y.length > limit) data[inside].y.shift();
    data[inside].x.push(x);
    data[inside].y.push(y);
    let annotations = [{
      x: 8, xanchor: 'right',
      y: 8, yanchor: 'top',
      text: 'Expected = ' + 20,
      showarrow: false
    }, {
      x: 8, xanchor: 'right',
      y: 7.5, yanchor: 'top',
      text: 'Area ≈ ' + area.toFixed(4),
      showarrow: false
    }, {
      x: 8, xanchor: 'right',
      y: 7, yanchor: 'top',
      text: '# Samples = ' + sampleCount,
      showarrow: false
    }];
    Plotly.update("rejection-graph", { x: [data[0].x, data[1].x], y: [data[0].y, data[1].y] }, { annotations });
    timeout = setTimeout(plot, 0.5);
  }
  function startStop() {
    playing = !playing;
    document.getElementById("rejection-start").innerHTML = playing ? "Pause" : "Start";
    if (playing)
      timeout = setTimeout(plot, 0.5);
    else
      clearTimeout(timeout);
  }
  function reset() {
    area = inCount = sampleCount = 0;
    Plotly.restyle("rejection-graph", { x: [[], []], y: [[], []] });
  }

  document.getElementById("rejection-start").onclick = startStop;
  document.getElementById("rejection-reset").onclick = reset;
  Plotly.newPlot("rejection-graph", data, layout, { displayModeBar: false });
}