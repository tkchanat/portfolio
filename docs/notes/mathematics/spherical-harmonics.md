# Spherical Harmonics
If you know what Fourier series are, spherical harmonics are very similar periodic basis functions. But rather on the time domain, it's defined on the surface of a sphere $S^2$. 

## Analogy to Fourier series
Let's start small. Fourier series is defined as the expansion of a periodic function into a sum of trigonometric functions[^1]. So it's just a sum of basis wave functions (i.e. $\sin$ and $\cos$). It's often expressed in the time domain, which is a single variable only. 

Here is the square wave fourier series expansion up to $n$ terms. It's defined as:

$$
y=\frac{4}{\pi} \sum_{k=1}^n {\frac{\sin((2k-1)x)}{2k-1}}
$$

<div id="fourier-1d" style="width: 100%; height: 240px;"></div>
<script src="/js/desmos.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
      let colorScheme = document.querySelector('meta[name="color-scheme"]');
    var elt = document.getElementById('fourier-1d');
    var calculator = Desmos.GraphingCalculator(elt, {
      keypad: false,
      invertedColors: colorScheme.content == "dark",
      expressions: false,
      settingsMenu: false,
      lockViewport: true,
    });
    calculator.setExpression({ id: "fourier", latex: "\\frac{4}{\\pi}\\sum_{k=1}^{n}\\frac{\\sin((2k-1)x)}{(2k-1)}", color: Desmos.Colors.BLUE });
    calculator.setExpression({ id: "n", latex: "n=6", sliderBounds: { min: 1, max: 10, step: 1 }, color: Desmos.Colors.RED, });
    calculator.setExpression({ id: "slider", type: 'table', columns: [ { latex: 'x', values: ['-2', '2'] }, { latex: 'y', values: ['-2', '-2'], color: Desmos.Colors.RED, columnMode: Desmos.ColumnModes.LINES, lineOpacity: 0.2 } ] });
    calculator.setExpression({ id: "knob", latex: "(2(2(n-1)/9-1), -2)", dragMode: "X", label: "`n=${n}`", showLabel: true, color: Desmos.Colors.RED });
  }, false);
</script>

Now imagine transferring the square waves onto a unit circle $S^1$. I guess you could call it "Circular Harmonics"[^2], if you really want to give it a name. 

But at the end, this is still a Fourier series, just with a different parameterization. Noted that $x$ is now mapped to the angular part $\theta \in [0, 2\pi)$, and $y$ is mapped to the radial part $r$ in a polar coordinate system. There is no significant difference from our first equation.

$$
r = \frac{4}{\pi} \sum_{k=1}^n {\frac{\sin((2k-1)\theta)}{2k-1}}
$$

<div id="fourier-circle" style="width: 100%; height: 240px;"></div>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    let colorScheme = document.querySelector('meta[name="color-scheme"]');
    var elt = document.getElementById('fourier-circle');
    var calculator = Desmos.GraphingCalculator(elt, {
      keypad: false,
      invertedColors: colorScheme.content == "dark",
      expressions: false,
      settingsMenu: false,
      polarMode: true,
      lockViewport: true,
    });
    let aspect = elt.clientWidth / elt.clientHeight;
    calculator.setMathBounds({ left: -1.5*aspect, right: 1.5*aspect, bottom: -1.5, top: 1.5 });
    calculator.setExpression({ id: "positive", latex: "r=\\frac{4}{\\pi}\\sum_{k=1}^{n}\\frac{\\sin((2k-1)\\theta)}{(2k-1)}", color: Desmos.Colors.BLUE });
    calculator.setExpression({ id: "negative", latex: "r=-\\frac{4}{\\pi}\\sum_{k=1}^{n}\\frac{\\sin((2k-1)\\theta)}{(2k-1)}", color: Desmos.Colors.ORANGE });
    calculator.setExpression({ id: "n", latex: "n=6", sliderBounds: { min: 1, max: 10, step: 1 }, color: Desmos.Colors.RED, });
    calculator.setExpression({ id: "slider", type: 'table', columns: [ { latex: 'x', values: ['-2', '2'] }, { latex: 'y', values: ['-1.2', '-1.2'], color: Desmos.Colors.RED, columnMode: Desmos.ColumnModes.LINES, lineOpacity: 0.2 } ] });
    calculator.setExpression({ id: "knob", latex: "(2(2(n-1)/9-1), -1.2)", dragMode: "X", label: "`n=${n}`", showLabel: true, color: Desmos.Colors.RED });
  }, false);
</script>

I purposely color the positive and negative lobes in two different colors, because in one sine function cycle, $[0, \pi]$ is positive and $[\pi, 2\pi]$ is negative. When it's wrapped around a circle, they become distinct lobes carrying opposite sign.

Let's break the series back to its basis functions. That is, without the scaling, we now truly obtained the "Circular Harmonics" bases. And here is how they look.

$$
r=\sin(k\theta)
$$

<div id="circular-harmonics" style="width: 100%; height: 240px;"></div>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    let colorScheme = document.querySelector('meta[name="color-scheme"]');
    var elt = document.getElementById('circular-harmonics');
    var calculator = Desmos.GraphingCalculator(elt, {
      keypad: false,
      invertedColors: colorScheme.content == "dark",
      expressions: false,
      settingsMenu: false,
      polarMode: true,
      lockViewport: true,
    });
    let aspect = elt.clientWidth / elt.clientHeight;
    calculator.setMathBounds({ left: -1.5*aspect, right: 1.5*aspect, bottom: -1.5, top: 1.5 });
    calculator.setExpression({ id: "positive", latex: "r=\\sin(k\\theta)", color: Desmos.Colors.BLUE });
    calculator.setExpression({ id: "negative", latex: "r=-\\sin(k\\theta)", color: Desmos.Colors.ORANGE });
    calculator.setExpression({ id: "k", latex: "k=1", sliderBounds: { min: 1, max: 10, step: 1 }, color: Desmos.Colors.RED, });
    calculator.setExpression({ id: "slider", type: 'table', columns: [ { latex: 'x', values: ['-2', '2'] }, { latex: 'y', values: ['-1.2', '-1.2'], color: Desmos.Colors.RED, columnMode: Desmos.ColumnModes.LINES, lineOpacity: 0.2 } ] });
    calculator.setExpression({ id: "knob", latex: "(2(2(k-1)/9-1), -1.2)", dragMode: "X", label: "`k=${k}`", showLabel: true, color: Desmos.Colors.RED });
  }, false);
</script>

Looks a lot like spherical harmonics, right? With these basis functions, they can theoretically form any functions if it's an infinite series expansion. But realistically, in most applications, only a few of them are needed to approximate/fit a smooth circular function. 

!!! note "Circular Harmonics Rotation"

    One interesting observation about rotating these basis functions, is that the choice of the oscillating/trigonometric function. Recall that $\sin(\theta)=\cos(\frac{\pi}{2}-\theta)$, meaning cosine is just an off-phase sine. Therefore, substituding the sine to cosine is all we need to rotate it by $90^{\circ}$.

## Definition
Citing from Wikipedia again, spherical harmonics originate from solving Laplace's equation in the spherical domains. Functions that are solutions to Laplace's equation are called harmonics[^3]. 

// TODO


[^1]: Fourier series (2024). In Wikipedia. [https://en.wikipedia.org/wiki/Fourier_series]()
[^2]: Circular Harmonics: Digging in circles (2021). Jon Valdés. [https://valdes.cc/articles/ch.html]()
[^3]: Spherical harmonics (2024). In Wikipedia. [https://en.wikipedia.org/wiki/Spherical_harmonics]()