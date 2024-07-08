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

## Derivation of Spherical Harmonics
> Spherical harmonics originate from solving Laplace's equation in the spherical domains. Functions that are solutions to Laplace's equation are called harmonics[^3]. 

To recap Laplace's equation is to solve for a function $f$ where its divergence of gradient is 0, e.g. $\nabla^2f=0$. In Cartesian coordinates, the three-dimensional Laplacian is defined as:

$$
\nabla^2 f = \frac{\partial^2f}{\partial x^2} + \frac{\partial^2f}{\partial y^2} + \frac{\partial^2f}{\partial z^2}
$$

In spherical coordinates $x=r\sin\theta\cos\phi,\ y=r\sin\theta\sin\phi,\ z=r\cos\theta$, it became: ([full derivation](https://planetmath.org/derivationofthelaplacianfromrectangulartosphericalcoordinates))

$$
\begin{align*}
\nabla^2f &= \frac{1}{r^2\sin\theta}
  \left(
    \frac{\partial}{\partial r} r^2 \sin\theta \frac{\partial}{\partial r} + \frac{\partial}{\partial \theta} \sin\theta \frac{\partial}{\partial\theta} + \frac{\partial}{\partial\phi} \csc\theta \frac{\partial}{\partial\phi}
  \right) \\
  &= \frac{1}{r^2}
  \frac{\partial}{\partial r} \left(r^2 \frac{\partial f}{\partial r}\right) + 
  \frac{1}{r^2\sin\theta} \frac{\partial}{\partial \theta} \left(\sin\theta \frac{\partial f}{\partial\theta}\right) + 
  \frac{1}{r^2\sin^2\theta} \frac{\partial^2 f}{\partial\phi^2}
\end{align*}
$$

To separate the radial part ($r$) from the angular part ($\theta, \phi$), we need to let $f(r, \theta, \phi)=R(r)Y(\theta, \phi)$ and perform what's called a [separation of variables](https://en.wikipedia.org/wiki/Separation_of_variables).

$$
\begin{align*}
    &\ \nabla^2 (R(r)Y(\theta, \phi))\\ 
  = &\ \frac{1}{r^2} \frac{\partial}{\partial r} \left(r^2 \frac{\partial R(r)Y(\theta, \phi)}{\partial r}\right) + 
  \frac{1}{r^2\sin\theta} \frac{\partial}{\partial \theta} \left(\sin\theta \frac{\partial R(r)Y(\theta, \phi)}{\partial\theta}\right) + 
  \frac{1}{r^2\sin^2\theta} \frac{\partial^2 R(r)Y(\theta, \phi)}{\partial\phi^2}\\
  = &\cancel{\frac{1}{r^2}}\ Y(\theta, \phi)\left(\frac{\partial}{\partial r} \left(r^2 \frac{\partial R(r)}{\partial r}\right)\right) + 
  \cancel{\frac{1}{r^2}}R(r)\left(
  \frac{1}{\sin\theta} \frac{\partial}{\partial \theta} \left(\sin\theta \frac{\partial Y(\theta, \phi)}{\partial\theta}\right) + 
  \frac{1}{\sin^2\theta} \frac{\partial^2 Y(\theta, \phi)}{\partial\phi^2}\right)\\
  = &\ Y(\theta, \phi)\left(\frac{\partial}{\partial r} \left(r^2 \frac{\partial R(r)}{\partial r}\right)\right) + R(r)\left(
  \frac{1}{\sin\theta} \frac{\partial}{\partial \theta} \left(\sin\theta \frac{\partial Y(\theta, \phi)}{\partial\theta}\right) + 
  \frac{1}{\sin^2\theta} \frac{\partial^2 Y(\theta, \phi)}{\partial\phi^2}\right)
\end{align*}
$$

Multiply both side by $\frac{1}{R(r)Y(\theta, \phi)}$:

$$
\begin{align*}
  Y(\theta, \phi)\left(\frac{\partial}{\partial r} \left(r^2 \frac{\partial R(r)}{\partial r}\right)\right) + R(r)\left(
  \frac{1}{\sin\theta} \frac{\partial}{\partial \theta} \left(\sin\theta \frac{\partial Y(\theta, \phi)}{\partial\theta}\right) + 
  \frac{1}{\sin^2\theta} \frac{\partial^2 Y(\theta, \phi)}{\partial\phi^2}\right) &= 0
  \\
  \frac{\cancel{Y(\theta, \phi)}}{R(r)\cancel{Y(\theta, \phi)}}\frac{\partial}{\partial r} \left(r^2 \frac{\partial R(r)}{\partial r}\right) + \frac{\cancel{R(r)}}{\cancel{R(r)}Y(\theta, \phi)}\left(
  \frac{1}{\sin\theta} \frac{\partial}{\partial \theta} \left(\sin\theta \frac{\partial Y(\theta, \phi)}{\partial\theta}\right) + 
  \frac{1}{\sin^2\theta} \frac{\partial^2 Y(\theta, \phi)}{\partial\phi^2}\right) &= \frac{1}{R(r)Y(\theta, \phi)} \cdot 0
  \\
  \underbrace{\frac{1}{R(r)}\frac{\partial}{\partial r} \left(r^2 \frac{\partial R(r)}{\partial r}\right)}_{r\text{-dependent}} + \underbrace{\frac{1}{Y(\theta, \phi)}\left(
  \frac{1}{\sin\theta} \frac{\partial}{\partial \theta} \left(\sin\theta \frac{\partial Y(\theta, \phi)}{\partial\theta}\right) + 
  \frac{1}{\sin^2\theta} \frac{\partial^2 Y(\theta, \phi)}{\partial\phi^2}\right)}_{\theta\phi\text{-dependent}} &= 0
\end{align*}
$$

Now we can introduce a separation constant $\ell(\ell+1)$ such that both $r\text{-dependent}$ and $\theta\phi\text{-dependent}$ parts still adds up to 0, satisfying the original Laplace's equation.

$$
\begin{cases}
  \frac{1}{R(r)}\frac{\partial}{\partial r} \left(r^2 \frac{\partial R(r)}{\partial r}\right)
  = \ell(\ell+1)\\
  \frac{1}{Y(\theta, \phi)}\left(
  \frac{1}{\sin\theta} \frac{\partial}{\partial \theta} \left(\sin\theta \frac{\partial Y(\theta, \phi)}{\partial\theta}\right) + 
  \frac{1}{\sin^2\theta} \frac{\partial^2 Y(\theta, \phi)}{\partial\phi^2}\right)
  =
  -\ell(\ell+1)
\end{cases}
$$

Then we have successfully obtained two separated ordinary differential equations, the radial part $\eqref{1}$ and the angular part $\eqref{2}$.

$$
\begin{align*}
  &\frac{\partial}{\partial r} \left(r^2 \frac{\partial R(r)}{\partial r}\right) = \ell(\ell+1)R(r) &\tag{1}\label{1}\\
  &\frac{1}{\sin\theta} \frac{\partial}{\partial \theta} \left(\sin\theta \frac{\partial Y(\theta, \phi)}{\partial\theta}\right) + \frac{1}{\sin^2\theta} \frac{\partial^2 Y(\theta, \phi)}{\partial\phi^2} = -\ell(\ell+1)Y(\theta, \phi) &\tag{2}\label{2}
\end{align*}
$$

Spherical harmonics arises from the angular part $Y(\theta, \phi)$ of a spherical Laplace's equation. Those "harmonics" are forms an infinite set of solutions that satisfy the angular part of the Laplace's equation. Therefore, the radial part $R(r)$ can be omitted for now.

???+ note "Linearity of Laplace's equation and relation to SH"

    The Laplace operator $\nabla^2$ is a linear operator since it satisfies the superposition principle, where the sum of any two solutions is also a solution. That is, $\nabla^2(a\theta + b\phi) = a\nabla^2(\theta) + b\nabla^2(\phi)$. The only prerequisite is that $\nabla^2(\theta)=0$ and $\nabla^2(\phi)=0$, and thus proofing its linearity (i.e. $a\cdot0+b\cdot0=0$).
    
    $$
    \underbrace{\frac{1}{\sin\theta} \frac{\partial}{\partial \theta} \left(\sin\theta \frac{\partial Y(\theta, \phi)}{\partial\theta}\right) + \frac{1}{\sin^2\theta} \frac{\partial^2 Y(\theta, \phi)}{\partial\phi^2}}_{\nabla^2 f} = \underbrace{-\ell(\ell+1)}_{\text{eigenvalue}(\lambda)}\underbrace{Y(\theta, \phi)}_{\text{eigenfunction}(f)}
    $$
    
    Taking equation $(2)$ and simplify it to $\nabla^2(Y(\theta, \phi)) = -\ell(\ell+1)Y(\theta, \phi)$. It's not hard to see that this takes the form of $Df=\lambda f$, where $D$ is a linear operator[^4]. And just so happened the Laplace operator $\nabla^2$ is also a linear operator! So, our separation constant $-\ell(\ell+1)$ are actually **eigenvalues** and the spherical harmonics $Y(\theta, \phi)$ are indeed **eigenfunctions**.

By writing $Y(\theta, \phi)=\Theta(\theta)\Phi(\phi)$, we are going to perform the separation of variable again. That gives us:

$$
\begin{align*}
\frac{1}{\sin\theta} \frac{\partial}{\partial \theta} \left(\sin\theta \frac{\partial (\Theta(\theta)\Phi(\phi))}{\partial\theta}\right) + \frac{1}{\sin^2\theta} \frac{\partial^2 (\Theta(\theta)\Phi(\phi))}{\partial\phi^2} &= -\ell(\ell+1)(\Theta(\theta)\Phi(\phi))\\
\frac{\Phi(\phi)}{\sin\theta} \frac{\partial}{\partial \theta} \left(\sin\theta \frac{\partial \Theta(\theta)}{\partial\theta}\right) + \frac{\Theta(\theta)}{\sin^2\theta} \frac{\partial^2 \Phi(\phi)}{\partial\phi^2} + \ell(\ell+1)(\Theta(\theta)\Phi(\phi)) &= 0\\
\end{align*}
$$

Multiplying both sides by $\frac{\sin^2\theta}{\Theta(\theta)\Phi(\phi)}$ [^6]:

$$
\begin{align*}
\frac{\sin^2\theta}{\Theta(\theta)\Phi(\phi)}\left(\frac{\Phi(\phi)}{\sin\theta} \frac{\partial}{\partial \theta} \left(\sin\theta \frac{\partial \Theta(\theta)}{\partial\theta}\right) + \frac{\Theta(\theta)}{\sin^2\theta} \frac{\partial^2 \Phi(\phi)}{\partial\phi^2} + \ell(\ell+1)(\Theta(\theta)\Phi(\phi))\right) &= \frac{\sin^2\theta}{\Theta(\theta)\Phi(\phi)}\cdot0\\
\underbrace{\frac{\sin\theta}{\Theta(\theta)} \frac{\partial}{\partial \theta} \left(\sin\theta \frac{\partial \Theta(\theta)}{\partial\theta}\right) + \ell(\ell+1)\sin^2\theta}_{\theta\text{-dependent}} + \underbrace{\frac{1}{\Phi(\phi)} \frac{\partial^2 \Phi(\phi)}{\partial\phi^2}}_{\phi\text{-dependent}} &= 0 \tag{3}\label{3}\\
\end{align*}
$$

This time let $m^2$ be the separation constant:

$$
\begin{align*}
  &\frac{\sin\theta}{\Theta(\theta)} \frac{\partial}{\partial \theta} \left(\sin\theta \frac{\partial \Theta(\theta)}{\partial\theta}\right) + \ell(\ell+1)\sin^2\theta = m^2 &\tag{4}\label{4} \\
  &\frac{1}{\Phi(\phi)}{\frac{\partial^2 \Phi(\phi)}{\partial\phi^2}} = -m^2 &\tag{5}\label{5}
\end{align*}
$$

Fortunately, $\eqref{5}$ already has solutions of $\Phi(\phi)=e^{\pm im\phi}$, which is the two-dimensional angular Laplacian. Substituding it back into $\eqref{3}$ and solve for the $\theta\text{-dependent}$ portion, we get the solutions of $\Theta(\theta)=P_\ell^m(\cos\theta)$ in the form of a Legendre polynomial $P_\ell^m(x)$. (1)
{ .annotate }

1.  I have zero clue on this part about Legendre polynomials. Come back here when I am prepared.

$$
P_\ell^m(x) = \frac{(-1)^m}{2^\ell \ell!}(1-x^2)^\frac{m}{2} \frac{\partial^{\ell+m}}{\partial x^{\ell+m}} (x^2-1)^\ell
$$

Noted that this formula must have $\ell \geq 0$ and $m$ being integers such that $|m| \leq \ell$. 

With that, we get the solution to $\eqref{2}$, which is the spherical harmonics $Y(\theta, \phi)=P_\ell^m(\cos\theta)e^{\pm im\phi}$. And just like vectors, to enforce orthonormality, a normalization factor is required to make independent spherical harmonics orthonormal.

$$
Y_\ell^m(\theta, \phi) = \underbrace{\sqrt{\frac{2\ell+1}{4\pi}\frac{(\ell-m)!}{(\ell+m)!}}}_{\text{normalization factor}} P_\ell^m(\cos\theta)e^{\pm im\phi}
$$

$Y(\theta, \phi)$ denotes the whole sets of infinitely many solutions to the angular Laplacian. With this notation $Y_\ell^m(\theta, \phi)$ means it's a specific spherical harmonic with **order** $\ell$ and **degree** $m$. 

<div id="spherical-harmonics-plot" style="width: 100%; height: 240px;"></div>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    let colorScheme = document.querySelector('meta[name="color-scheme"]');
    var elt = document.getElementById('spherical-harmonics-plot');
    var calculator = Desmos.GraphingCalculator(elt, {
      keypad: false,
      invertedColors: colorScheme.content == "dark",
      expressions: false,
      settingsMenu: false,
      polarMode: true,
      lockViewport: true,
    });
    console.log(calculator);
    let aspect = elt.clientWidth / elt.clientHeight;
    calculator.setMathBounds({ left: -1.5*aspect, right: 1.5*aspect, bottom: -1.5, top: 1.5 });
    calculator.setExpression({ id: "index", latex: "i=l(l+1)+m+1", hidden: true });
    calculator.setExpression({ id: "P", latex: "P=[ \
      \\sqrt{\\frac{1}{4\\pi}}, \
      \\sqrt{\\frac{3}{8\\pi}}\\sin(\\theta), \
      \\sqrt{\\frac{3}{4\\pi}}\\cos(\\theta), \
      \\sqrt{\\frac{3}{8\\pi}}\\sin(\\theta), \
      \\sqrt{\\frac{15}{32\\pi}}(\\sin(\\theta))^2, \
      \\sqrt{\\frac{15}{8\\pi}}\\sin(\\theta)\\cos(\\theta), \
      \\sqrt{\\frac{5}{16\\pi}}(3(\\cos(\\theta))^2-1), \
      \\sqrt{\\frac{15}{8\\pi}}\\sin(\\theta)\\cos(\\theta), \
      \\sqrt{\\frac{15}{32\\pi}}(\\sin(\\theta))^2, \
      \\sqrt{\\frac{35}{64\\pi}}(\\sin(\\theta))^3, \
      \\sqrt{\\frac{105}{16\\pi}}(\\sin(\\theta))^2\\cos(\\theta), \
      \\sqrt{\\frac{21}{64\\pi}}\\sin(\\theta)(5(\\cos(\\theta))^2-1), \
      \\sqrt{\\frac{7}{16\\pi}}(5(\\cos(\\theta))^3-3\\cos(\\theta)), \
      \\sqrt{\\frac{21}{64\\pi}}\\sin(\\theta)(5(\\cos(\\theta))^2-1), \
      \\sqrt{\\frac{105}{16\\pi}}(\\sin(\\theta))^2\\cos(\\theta), \
      \\sqrt{\\frac{35}{64\\pi}}(\\sin(\\theta))^3 \
      ]", hidden: true });
    calculator.setExpression({ id: "harmonic-positive", latex: "r=P[i] \\left\\{P[i]>=0\\right\\}", color: Desmos.Colors.ORANGE });
    calculator.setExpression({ id: "harmonic-negative", latex: "r=-P[i] \\left\\{P[i]<0\\right\\}", color: Desmos.Colors.BLUE });
    calculator.setExpression({ id: "inner-m", latex: "m_0=1", sliderBounds: { min: -3, max: 3, step: 1 }, color: Desmos.Colors.RED, });
    calculator.setExpression({ id: "m", latex: "m=\\max(\\min(m_0, l), -l)", sliderBounds: { min: -3, max: 3, step: 1 }, color: Desmos.Colors.RED, });
    calculator.setExpression({ id: "l", latex: "l=2", sliderBounds: { min: 0, max: 3, step: 1 }, color: Desmos.Colors.RED, });
    calculator.setExpression({ id: "slider-l", type: 'table', columns: [ { latex: 'x', values: ['-2', '-0.5'] }, { latex: 'y', values: ['-1.2', '-1.2'], color: Desmos.Colors.RED, columnMode: Desmos.ColumnModes.LINES, lineOpacity: 0.2 } ] });
    calculator.setExpression({ id: "slider-m", type: 'table', columns: [ { latex: 'x', values: ['0.5', '2'] }, { latex: 'y', values: ['-1.2', '-1.2'], color: Desmos.Colors.RED, columnMode: Desmos.ColumnModes.LINES, lineOpacity: 0.2 } ] });
    calculator.setExpression({ id: "knob-l", latex: "(1.5*l/3-2, -1.2)", dragMode: "X", label: "`l=${l}`", showLabel: true, color: Desmos.Colors.RED, labelOrientation: Desmos.LabelOrientations.ABOVE });
    calculator.setExpression({ id: "knob-m", latex: "(1.5*m_0/7+1.25, -1.2)", dragMode: "X", label: "`m=${m}`", showLabel: true, color: Desmos.Colors.RED, labelOrientation: Desmos.LabelOrientations.ABOVE });
  }, false);
</script>

[^1]: Fourier series (2024). In Wikipedia. [https://en.wikipedia.org/wiki/Fourier_series]()
[^2]: Circular Harmonics: Digging in circles (2021). Jon Valdés. [https://valdes.cc/articles/ch.html]()
[^3]: Spherical harmonics (2024). In Wikipedia. [https://en.wikipedia.org/wiki/Spherical_harmonics]()
[^4]: Eigenfunction (2024). In Wikipedia. [https://en.wikipedia.org/wiki/Eigenfunction]()
[^5]: All You Need to Know about Spherical Harmonics. Mathcube. [https://www.cantorsparadise.com/all-you-need-to-know-about-spherical-harmonics-29ff76e74ad5]()
[^6]: Spherical Harmonic. Weisstein, Eric W. From MathWorld--A Wolfram Web Resource. [https://mathworld.wolfram.com/SphericalHarmonic.html]()
[^7]: Associated Lengendre Polynormial. Weisstein, Eric W. From MathWorld--A Wolfram Web Resource. [https://mathworld.wolfram.com/AssociatedLegendrePolynomial.html]()