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

if (document.getElementById("white-noise-1d")) {
  let rng = new Math.seedrandom(123);
  let x = Array.from({ length: 30 }, _ => rng());
  let y = Array.from({ length: 30 }, _ => 0);
  var data = [{ x, y, mode: "markers", type: "scatter", marker: { color: "#000000", size: 8 } }];
  let width = Math.min(250, safeWidth);
  var layout = {
    autosize: false,
    hovermode: false,
    width,
    height: width,
    margin: { l: 30, r: 30, b: 30, t: 30, },
    padding: { l: 0, r: 0, b: 0, t: 0, },
    title: "1D",
    xaxis: { fixedrange: true, range: [0, 1] },
    yaxis: { fixedrange: true, visible: false },
  };
  Plotly.newPlot("white-noise-1d", data, layout, { displayModeBar: false });
}

if (document.getElementById("white-noise-2d")) {
  let rng = new Math.seedrandom(123);
  let x = Array.from({ length: 100 }, _ => rng());
  let y = Array.from({ length: 100 }, _ => rng());
  var data = [{ x, y, mode: "markers", type: "scatter", marker: { color: "#000000", size: 8 } }];
  let width = Math.min(250, safeWidth);
  var layout = {
    autosize: false,
    hovermode: false,
    width,
    height: width,
    margin: { l: 30, r: 30, b: 30, t: 30, },
    padding: { l: 0, r: 0, b: 0, t: 0, },
    title: "2D",
    xaxis: { fixedrange: true, range: [0, 1], autotick: false, tick0: 0, dtick: 0.5 },
    yaxis: { fixedrange: true, range: [0, 1], autotick: false, tick0: 0, dtick: 0.5 },
  };
  Plotly.newPlot("white-noise-2d", data, layout, { displayModeBar: false });
}

if (document.getElementById("white-noise-3d")) {
  let rng = new Math.seedrandom(114);
  let x = Array.from({ length: 200 }, _ => rng());
  let y = Array.from({ length: 200 }, _ => rng());
  let z = Array.from({ length: 200 }, _ => rng());
  var data = [{ x, y, z, mode: "markers", type: "scatter3d", marker: { color: "#000000", size: 4 } }];
  let width = Math.min(250, safeWidth);
  var layout = {
    autosize: false,
    hovermode: false,
    width,
    height: width,
    margin: { l: 30, r: 30, b: 30, t: 30, },
    padding: { l: 0, r: 0, b: 0, t: 0, },
    title: "3D",
    scene: {
      dragmode: false,
      xaxis: { showspikes: false, range: [0, 1] },
      yaxis: { showspikes: false, range: [0, 1] },
      zaxis: { showspikes: false, range: [0, 1] },
    }
  };
  Plotly.newPlot("white-noise-3d", data, layout, { displayModeBar: false });
}

if (document.getElementById("stratified-1d")) {
  let rng = new Math.seedrandom(2);
  let stratum = 20;
  let x = Array.from({ length: stratum }, (_, i) => (i + rng()) / stratum);
  let y = Array.from({ length: stratum }, _ => 0);
  var data = [{ x, y, mode: "markers", type: "scatter", marker: { color: "#000000", size: 8 } }];
  let width = Math.min(250, safeWidth);
  var layout = {
    autosize: false,
    hovermode: false,
    width,
    height: width,
    margin: { l: 30, r: 30, b: 30, t: 30, },
    padding: { l: 0, r: 0, b: 0, t: 0, },
    title: `1D (${stratum} stratum)`,
    xaxis: { autotick: false, tick0: 0, dtick: 1.0 / stratum, fixedrange: true, range: [0, 1] },
    yaxis: { fixedrange: true, visible: false },
  };
  Plotly.newPlot("stratified-1d", data, layout, { displayModeBar: false });
}

if (document.getElementById("stratified-2d")) {
  let stratum = 10;
  let rng = new Math.seedrandom(1);
  let x = Array.from({ length: stratum * stratum }, (_, i) => (i % stratum + rng()) / stratum);
  let y = Array.from({ length: stratum * stratum }, (_, i) => (Math.floor(i / stratum) + rng()) / stratum);
  var data = [{ x, y, mode: "markers", type: "scatter", marker: { color: "#000000", size: 8 } }];
  let width = Math.min(250, safeWidth);
  var layout = {
    autosize: false,
    hovermode: false,
    width,
    height: width,
    margin: { l: 30, r: 30, b: 30, t: 30, },
    padding: { l: 0, r: 0, b: 0, t: 0, },
    title: `2D (${stratum} stratum)`,
    xaxis: { autotick: false, tick0: 0, dtick: 1.0 / stratum, fixedrange: true, range: [0, 1] },
    yaxis: { autotick: false, tick0: 0, dtick: 1.0 / stratum, fixedrange: true, range: [0, 1] },
  };
  Plotly.newPlot("stratified-2d", data, layout, { displayModeBar: false });
}

if (document.getElementById("stratified-3d")) {
  let stratum = 6;
  let rng = new Math.seedrandom(4);
  let x = Array.from({ length: stratum * stratum * stratum }, (_, i) => (i % stratum + rng()) / stratum);
  let y = Array.from({ length: stratum * stratum * stratum }, (_, i) => (Math.floor(i / stratum) % stratum + rng()) / stratum);
  let z = Array.from({ length: stratum * stratum * stratum }, (_, i) => (Math.floor(i / (stratum * stratum)) + rng()) / stratum);
  var data = [{ x, y, z, mode: "markers", type: "scatter3d", marker: { color: "#000000", size: 4 } }];
  let width = Math.min(250, safeWidth);
  var layout = {
    autosize: false,
    hovermode: false,
    width,
    height: width,
    margin: { l: 30, r: 30, b: 30, t: 30, },
    padding: { l: 0, r: 0, b: 0, t: 0, },
    title: `3D (${stratum} stratum)`,
    scene: {
      dragmode: false,
      xaxis: { showspikes: false, autotick: false, tick0: 0, dtick: 1.0 / stratum, fixedrange: true, range: [0, 1] },
      yaxis: { showspikes: false, autotick: false, tick0: 0, dtick: 1.0 / stratum, fixedrange: true, range: [0, 1] },
      zaxis: { showspikes: false, autotick: false, tick0: 0, dtick: 1.0 / stratum, fixedrange: true, range: [0, 1] },
    }
  };
  Plotly.newPlot("stratified-3d", data, layout, { displayModeBar: false });
}

if (document.getElementById("discrepancy")) {
  let x = [], y = [];
  var data = [{ x, y, mode: "markers", type: "scatter", marker: { color: "#000000", size: 4 } }];
  let width = Math.min(250, safeWidth);
  let boxes = [[0, 0, 0.5, 1], [0.8, 0.8, 1, 1], [0.8, 0, 1, 0.4]];
  function area(box) {
    return (box[2] - box[0]) * (box[3] - box[1]);
  }
  function inBox(box, point) {
    return point[0] > box[0] && point[0] < box[2] && point[1] > box[1] && point[1] < box[3];
  }
  let shapes = boxes.map(box => ({
    type: 'rect',
    x0: box[0], y0: box[1],
    x1: box[2], y1: box[3],
    line: { color: 'rgba(0, 0, 0, 0.8)', width: 1 },
    fillcolor: 'rgba(0, 0, 0, 0.2)'
  }));
  let annotations = boxes.map((box, i, _) => ({
    showarrow: false,
    text: (i + 10).toString(36).toUpperCase(),
    x: (box[0]+box[2]) / 2,
    y: (box[1]+box[3]) / 2,
  }));
  var layout = {
    autosize: false,
    hovermode: false,
    width,
    height: width,
    margin: { l: 30, r: 30, b: 30, t: 30, },
    padding: { l: 0, r: 0, b: 0, t: 0, },
    shapes,
    annotations,
    xaxis: { autotick: false, tick0: 0, dtick: 0.1, fixedrange: true, range: [0, 1] },
    yaxis: { autotick: false, tick0: 0, dtick: 0.1, fixedrange: true, range: [0, 1] },
  };
  function generate() {
    reset();
    let n = 100;
    // let rng = new Math.seedrandom(1);
    let x = Array.from({ length: n }, _ => Math.random());
    let y = Array.from({ length: n }, _ => Math.random());
    let count = Array(boxes.length).fill(0);
    for (var i = 0; i < n; ++i) {
      for (var j = 0; j < boxes.length; ++j) {
        count[j] += inBox(boxes[j], [x[i], y[i]]) ? 1 : 0;
      }
    }
    let areaA = area(boxes[0]), areaB = area(boxes[1]), areaC = area(boxes[2]);
    let jA = count[0]/parseFloat(n), jB = count[1]/parseFloat(n), jC = count[2]/parseFloat(n);
    let dA = Math.abs(jA-areaA), dB = Math.abs(jB-areaB), dC = Math.abs(jC-areaC);
    document.getElementById("discrepancy-n").innerText = `${n}`;
    document.getElementById("discrepancy-a").innerText = `${jA.toFixed(4)}-${areaA.toFixed(4)}`;
    document.getElementById("discrepancy-b").innerText = `${jB.toFixed(4)}-${areaB.toFixed(4)}`;
    document.getElementById("discrepancy-c").innerText = `${jC.toFixed(4)}-${areaC.toFixed(4)}`;
    document.getElementById("discrepancy-ar").innerText = `${dA.toFixed(4)}`;
    document.getElementById("discrepancy-br").innerText = `${dB.toFixed(4)}`;
    document.getElementById("discrepancy-cr").innerText = `${dC.toFixed(4)}`;
    document.getElementById("discrepancy-star").innerText = `${Math.max.apply(null, [dA, dB, dC]).toFixed(4)}`;
    Plotly.restyle("discrepancy", { x: [x], y: [y] }, [0]);
  }
  function reset() {
    Plotly.restyle("discrepancy", { x: [[]], y: [[]] });
  }

  document.getElementById("discrepancy-generate").onclick = generate;
  document.getElementById("discrepancy-reset").onclick = reset;
  Plotly.newPlot("discrepancy", data, layout, { displayModeBar: false });
}