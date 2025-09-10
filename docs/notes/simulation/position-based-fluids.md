# Position Based Fluids
As discussed in [Position Based Simulation](position-based-dynamics.md), position-based dynamics provided the foundations of simulating lagrangian fluids. Remember PBD is all about how to put constraints on particles and how to resolve them. Similarly, we can model how fluid particles interact by posing some constraints on them.

## Density Constraint
The density constraint[^1] aims to model the [compressibility on fluids](https://en.wikipedia.org/wiki/Compressibility) by constraining the density (measuring the amount of mass per unit volume) of a single fluid particle.


$$
C_i(\mathbf{x}_1, \cdots, \mathbf{x}_\mathbf{n_j}) = \frac{\rho_i}{\rho_o}-1
$$

$$
\rho_i = \sum_j{m_j W(\mathbf{x}_i - \mathbf{x}_j, h)}
$$

Since we only care about local density around a given particle, the density constraint takes all its neighboring particle positions $\mathbf{x}_1, \cdots, \mathbf{x}_\mathbf{n_j}$, and sum up their masses to $\rho_i$. Noted that each particles are weighted by a smoothing function $W$ that falls off radially from the center of the kernel, which we will discuss more in the [smoothing kernel](#smoothing-kernels) section. The ratio to its rest density $\rho_o$ is then evaluated, indicating whether the fluid is being compressed locally (e.g. $\rho_i > \rho_o$). In a perfect equilibrium, $\rho_i$ should equal to $\rho_o$ and the constraint $C_i=0$ will be satisfied, meaning this fluid particle is happy :)

$$
C_{density}(\mathbf{x}) =
\begin{cases}
C_1(\mathbf{x}_1, \cdots, \mathbf{x}_\mathbf{n_j}) = 0\\
\cdots\\
C_N(\mathbf{x}_1, \cdots, \mathbf{x}_\mathbf{n_j}) = 0\\
\end{cases}
$$

Scaling up the above to a $N$-particle simulation, every particles will be assigned a density constraint, to ensure its local density remain the same at all time. This is why the bilateral condition $C(\mathbf{x})=0$ is used here. Once we run the solver for a decent number of iterations, every fluid particles should be happily resting at their stable positions.

!!! thonk "What if the density is lower than the rest condition (e.g. $\rho_i < \rho_o$)?"
    There will be cases where a lone particle wandered into the void, where a few or even no neighboring particles are present in its surroundings. This posed a tensile instability in our simulation, which can cause clustering or clumping due to negative pressures.
    
    This can result in extreme correction vectors and can break the simulation. One solution is to clamp the density constraint result to zero to prevent negative pressure.

    $$
    C_i(\mathbf{x}_1, \cdots, \mathbf{x}_\mathbf{n_j}) = \max(0, \frac{\rho_i}{\rho_o}-1)
    $$

    However, this also means the cohesion nature of fluid particles is gone, particles almost always repel with each other. So by clamping the constraint, we are also limiting ourselves from having this cohesive behavior.

    Luckily, in the paper "SPH without a tensile instability"[^2], an artificial pressure correction factor is proposed. Where $\Delta\vec{q}$ is vector to a point at some fixed distance inside the smoothing kernel radius $h$ and $k$ is a small positive constant. $\|\Delta\vec{q}\|=\{0.1h, \cdots, 0.3h\}$, $k = 0.001$ and $n = 4$ work well in my case.

    $$
    \lambda_{corr}=-k\cdot\left(\frac{W(\vec{r}, h)}{W(\Delta\vec{q}, h)}\right)^n
    $$

### Smoothing Kernels
Smoothing kernels are essential for integrating local density of a particle in an SPH simulation. A good kernel needs to fulfill a few requirements:

- Radially symmetric (i.e. only depends on distance)
- Finite support (i.e. particles should only affect up to a certain distance)
- Differentiable and integrates to 1

|Kernel Type|Function $W(\vec{r}, h)$|
|:--:|:--:|
|Smooth (2D)|$W_{smooth}(\vec{r}, h) = \frac{35}{32\pi h^7} \begin{cases} (h^2-\|r\|^2)^3 & \text{if } 0\leq \|r\|\leq h\\ 0 & \text{else} \end{cases}$|
|Smooth (3D)|$W_{smooth}(\vec{r}, h) = \frac{315}{64 \pi h^9} \begin{cases} (h^2-\|r\|^2)^3 & \text{if } 0\leq \|r\|\leq h\\ 0 & \text{else} \end{cases}$|
|Spiky (2D)|$W_{spiky}(\vec{r}, h) = \frac{2}{\pi h^4} \begin{cases} (h-\|r\|)^3 & \text{if } 0\leq \|r\|\leq h\\ 0 & \text{else} \end{cases}$|
|Spiky (3D)|$W_{spiky}(\vec{r}, h) = \frac{15}{\pi h^6} \begin{cases} (h-\|r\|)^3 & \text{if } 0\leq \|r\|\leq h\\ 0 & \text{else} \end{cases}$|

<div id="smoothing-kernel" style="width: 100%; height: 240px;"></div>
<script>
  document.addEventListener('DOMContentLoaded', () => {
      let colorScheme = document.querySelector('meta[name="color-scheme"]');
    var elt = document.getElementById('smoothing-kernel');
    var calculator = Desmos.GraphingCalculator(elt, {
      keypad: false,
      invertedColors: colorScheme.content == "dark",
      expressions: false,
      settingsMenu: false,
      lockViewport: true,
    });
    let aspect = elt.clientWidth / elt.clientHeight;
    calculator.setMathBounds({ left: -1.5*aspect, right: 1.5*aspect, bottom: -0.2, top: 1 });
    calculator.setExpression({ id: "smooth", latex: "W_{smooth}\\left(r\\right)=\\frac{35}{32\\pi h^{7}}\\left\\{\\left|r\\right|<h:\\left(h^{2}-\\left|r\\right|^{2}\\right)^{3}\\ ,\\ 0\\right\\}", color: Desmos.Colors.RED });
    calculator.setExpression({ id: "spiky", latex: "W_{spiky}\\left(r\\right)=\\frac{2}{\\pi h^{4}}\\left\\{\\left|r\\right|<h:\\left(h-\\left|r\\right|\\right)^{3}\\ ,\\ 0\\right\\}", color: Desmos.Colors.BLUE });
    calculator.setExpression({ id: "h", latex: "h=1", sliderBounds: { min: 1, max: 3 }, color: Desmos.Colors.RED, });
    calculator.setExpression({ id: "hbound", latex: "x=[-h,h]", lineStyle: Desmos.Styles.DASHED, lineWidth: 1, color: Desmos.Colors.BLACK, });
    calculator.setExpression({ id: "hslider", type: 'table', columns: [ { latex: 'x', values: ['-2', '-1'] }, { latex: 'y', values: ['-0.05', '-0.05'], color: Desmos.Colors.ORANGE, columnMode: Desmos.ColumnModes.LINES, lineOpacity: 0.2 } ] });
    calculator.setExpression({ id: "hknob", latex: "((h-1)/2-2, -0.05)", dragMode: "X", label: "`h=${h}`", showLabel: true, color: Desmos.Colors.ORANGE });
    calculator.setExpression({ id: "r", latex: "R=0", sliderBounds: { min: -4, max: 4 }, color: Desmos.Colors.ORANGE });
    calculator.setExpression({ id: "rslider", type: 'table', columns: [ { latex: 'x', values: ['1', '2'] }, { latex: 'y', values: ['-0.05', '-0.05'], color: Desmos.Colors.ORANGE, columnMode: Desmos.ColumnModes.LINES, lineOpacity: 0.2 } ] });
    calculator.setExpression({ id: "rknob", latex: "((R+4)/8+1, -0.05)", dragMode: "X", label: "`r=${R}`", showLabel: true, color: Desmos.Colors.ORANGE });
    calculator.setExpression({ id: "smooth-eval", latex: "E_{smooth}=W_{smooth}(R)", hidden: true});
    calculator.setExpression({ id: "spiky-eval", latex: "E_{spiky}=W_{spiky}(R)", hidden: true});
    calculator.setExpression({ id: "smooth-label", label: "`W_{smooth}=`${E_{smooth}}", labelOrientation: Desmos.LabelOrientations.ABOVE_RIGHT, latex: "(R, W_{smooth}(R))", color: Desmos.Colors.RED, showLabel: true, pointStyle: Desmos.Styles.CROSS, dragMode: Desmos.DragModes.NONE });
    calculator.setExpression({ id: "spiky-label", label: "`W_{spiky}=`${E_{spiky}}", labelOrientation: Desmos.LabelOrientations.ABOVE_RIGHT, latex: "(R, W_{spiky}(R))", color: Desmos.Colors.BLUE, showLabel: true, pointStyle: Desmos.Styles.CROSS, dragMode: Desmos.DragModes.NONE });
  }, false);
</script>

In order to attract or repel neighboring particles, we need to compute the gradient of the smoothing kernel $\nabla W(\vec{r}, h)$.

|Kernel Type|Gradient $\nabla W(\vec{r}, h)$|
|:--:|:--:|
|Smooth (2D)|$\nabla W_{smooth}(\vec{r}, h) = -\vec{r}\frac{105}{16\pi h^7} \begin{cases} (h^2-\|r\|^2)^2 & \text{if } 0\leq \|r\|\leq h\\ 0 & \text{else} \end{cases}$|
|Smooth (3D)|$\nabla W_{smooth}(\vec{r}, h) = -\vec{r}\frac{945}{32 \pi h^9} \begin{cases} (h^2-\|r\|^2)^2 & \text{if } 0\leq \|r\|\leq h\\ 0 & \text{else} \end{cases}$|
|Spiky (2D)|$\nabla W_{spiky}(\vec{r}, h) = -\frac{\vec{r}}{\|\vec{r}\|}\frac{6}{\pi h^4} \begin{cases} (h-\|r\|)^2 & \text{if } 0\leq \|r\|\leq h\\ 0 & \text{else} \end{cases}$|
|Spiky (3D)|$\nabla W_{spiky}(\vec{r}, h) = -\frac{\vec{r}}{\|\vec{r}\|}\frac{45}{\pi h^5} \begin{cases} (h-\|r\|)^2 & \text{if } 0\leq \|r\|\leq h\\ 0 & \text{else} \end{cases}$|

## Bloopers
|1|2|3|
|:--:|:--:|:--:|
|![](../../img/blooper1.webp)|![](../../img/blooper2.webp)|![](../../img/blooper3.webp)

[^1]: Macklin, M., & Müller, M. (2013). Position based fluids. ACM Transactions on Graphics (TOG), 32(4), 1-12.
[^2]: Monaghan, J. J. (2000). SPH without a tensile instability. Journal of computational physics, 159(2), 290-311.