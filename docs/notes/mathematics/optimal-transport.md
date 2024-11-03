# Optimal Transport
It's hard to imagine there's a distance between two distinct probability distributions. It is theoretically possible to flow from one distribution to the other through a [transportation](https://en.wikipedia.org/wiki/Transportation_theory_(mathematics)). Optimal transport in this context, simply means finding the shortest distance in such transportation that reaches the other distribution. These measurement of distances are often refer to [divergence](https://en.wikipedia.org/wiki/Divergence).

## Divergence

### Kullback-Lieibler Divergence
<div id="kl-divergence" style="width: 100%; height: 240px;"></div>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    let colorScheme = document.querySelector('meta[name="color-scheme"]');
    var elt = document.getElementById('kl-divergence');
    var calculator = Desmos.GraphingCalculator(elt, {
      keypad: false,
      invertedColors: colorScheme.content == "dark",
      expressions: false,
      settingsMenu: false,
      lockViewport: true,
    });
    let aspect = elt.clientWidth / elt.clientHeight;
    calculator.setMathBounds({ left: -aspect, right: aspect, bottom: -1, top: 2 });
    calculator.setExpression({ id: "d1", latex: "D_1(x) = G(x, u_1, 0.5)", color: Desmos.Colors.RED });
    calculator.setExpression({ id: "d1-shade", latex: "0 <= y <= D_1(x)", color: Desmos.Colors.RED });
    calculator.setExpression({ id: "d1-label", latex: "(u_1, D_1(u_1))", color: Desmos.Colors.RED, label: "P", showLabel: true, hidden: true, labelOrientation: Desmos.LabelOrientations.ABOVE });
    calculator.setExpression({ id: "d1-u", latex: "u_1 = -0.5", color: Desmos.Colors.RED, sliderBounds: { min: -1, max: 0 } });
    calculator.setExpression({ id: "d1-u-slider", type: 'table', columns: [ { latex: 'x', values: ['-2', '-1'] }, { latex: 'y', values: ['-0.5', '-0.5'], color: Desmos.Colors.RED, columnMode: Desmos.ColumnModes.LINES, lineOpacity: 0.2 } ] });
    calculator.setExpression({ id: "d1-u-knob", latex: "((u_1+1)-2, -0.5)", dragMode: "X", label: "`P_\\mu=${u_1}`", showLabel: true, color: Desmos.Colors.RED, labelOrientation: Desmos.LabelOrientations.BOTTOM });
    calculator.setExpression({ id: "d2", latex: "D_2(x) = G(x, u_2, 0.5)", color: Desmos.Colors.BLUE });
    calculator.setExpression({ id: "d2-shade", latex: "0 <= y <= D_2(x)", color: Desmos.Colors.BLUE });
    calculator.setExpression({ id: "d2-label", latex: "(u_2, D_2(u_2))", color: Desmos.Colors.BLUE, label: "Q", showLabel: true, hidden: true, labelOrientation: Desmos.LabelOrientations.ABOVE });
    calculator.setExpression({ id: "d2-u", latex: "u_2 = 0.5", color: Desmos.Colors.BLUE, sliderBounds: { min: 0, max: 1 } });
    calculator.setExpression({ id: "d2-u-slider", type: 'table', columns: [ { latex: 'x', values: ['1', '2'] }, { latex: 'y', values: ['-0.5', '-0.5'], color: Desmos.Colors.BLUE, columnMode: Desmos.ColumnModes.LINES, lineOpacity: 0.2 } ] });
    calculator.setExpression({ id: "d2-u-knob", latex: "((u_2-1)+2, -0.5)", dragMode: "X", label: "`Q_\\mu=${u_2}`", showLabel: true, color: Desmos.Colors.BLUE, labelOrientation: Desmos.LabelOrientations.BOTTOM });
    calculator.setExpression({ id: "gaussian", latex: "G(x, u, s) = \\frac{e^{-0.5(\\frac{x-u}{s})^2}}{s\\sqrt{2\\pi}}" });
    calculator.setExpression({ id: "divergence", latex: "D = \\int_{-10}^{10}{D_{KLeval}(D_1(x), D_2(x))} dx" });
    calculator.setExpression({ id: "divergence-eval", latex: "D_{KLeval}(p, q) = p \\log(\\frac{p}{q})" });
    calculator.setExpression({ id: "divergence-plot", latex: "D_{KLeval}(D_1(x), D_2(x))", color: Desmos.Colors.GREEN, lineStyle: Desmos.Styles.DASHED });
    calculator.setExpression({ id: "divergence-label", latex: "(0, -0.5)", label: "`D_{KL}(P, Q) = ${D}`", color: Desmos.Colors.GREEN, showLabel: true, hidden: true });
  }, false);
</script>

$$
D_{KL}(P||Q) = \int{ p(x)\ log\left(\frac{p(x)}{q(x)}\right) } dx
$$

You may also think of $P$ and $Q$ are probability [measures](measure-theory.md) on a measurable space where $x\in\mathcal{X}$. Then the divergence is said to be the relative entropy from $Q$ to $P$.