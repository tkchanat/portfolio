# Numerical Methods
In this chapter, I will cover different methods to integrate differential equations (ODE) numerically. Since the integrand is evaluated numerically, I will replace every $=$ to be $\approx$ to make it clear it's just an estimation only.

// TODO: investigate what is consistency and order in numerical methods

## Euler Method
This is a first-order numerical method to solve ordinary differential equations (ODEs) with a given initial value. It allows us to approximate a nearby point on the curve by moving a short distance $\Delta t$ along a line tangent, that is the first-order derivative $f'(t)$, to the curve $f(t)$. To write that down:

$$
\begin{cases}
f'(t) &\approx \frac{f(t+\Delta t) - f(t)}{\Delta t}\\
f(t+\Delta t) &\approx f(t) + f'(t) \Delta t
\end{cases}
$$

Rewriting it in an iterative way, we can find the next position a particle $\mathbf{x}_{n+1}$ with its current position $\mathbf{x}_n$:

$$
\mathbf{x}_{n+1} \approx \mathbf{x}_n + \dot{\mathbf{x}}(t) \Delta t
$$

## Implicit Euler Method
The implicit here means instead of computing directly the approximation $\mathbf{x}_{n+1}$ from $\mathbf{x}_n$, we need to solve an implicit equation:

$$
\begin{cases}
f'(t) &\approx \frac{f(t) - f(t-\Delta t)}{\Delta t}\\
f(t+\Delta t) &\approx f(t) + f'(t+\Delta t)\Delta t
\end{cases}
$$

Also known as backward Euler method, because it uses right-hand [quadrature method](../monte-carlo-integration.md#quadrature-rules) instead of the left-hand rectangle. Implicit method is difficult to evaluate, and usually required iterative methods to solve (e.g. fixed point iteration), but they have better numerical properties and thus more stable.

## Symplectic Euler Method
This one has way too much names, it's also called semi-implicit Euler, semi-explicit Euler, Euler-Cromer, and Newton-Størmer-Verlet[^1]. 

$$
\begin{cases}
f'(t+\Delta t) &\approx f'(t) + f''(t)\Delta t\\
f(t+\Delta t) &\approx f(t) + f'(t+\Delta t)\Delta t
\end{cases}
$$

Rewrite it in terms of motion:

$$
\begin{cases}
\mathbf{v}_{n+1} &\approx\mathbf{v}_n + \mathbf{a}_{n}\Delta t\\
\mathbf{x}_{n+1} &\approx\mathbf{x}_n + \mathbf{v}_{n+1}\Delta t\\
\end{cases}
$$

$$
\begin{align}
\therefore \mathbf{x}_{n+1}&\approx\mathbf{x}_n + (\mathbf{v}_n + \mathbf{a}_{n}\Delta t)\Delta t\\
&\approx\mathbf{x}_n + \mathbf{v}_n\Delta t + \mathbf{a}_{n}\Delta t^2
\end{align}
$$

Look familiar? This is usually seen in game physics to predict a moving body in the next time frame. It is a mix of explicit and implicit method to calculate the final body position. Velocity is integrated explicitly, and position is integrated implicitly by using the velocity from the next time frame. 

## Verlet Method[^2]
This is a second-order numerical method to integrate Newton's equations of motion. 

We begin by letting the second-derivative $\ddot{\mathbf{x}}=f''(t)$ be the **change** of the <span style="color:#388c46">**finite difference**</span> of the <span style="color:#6042a6">**backward-difference**</span> and <span style="color:#fa7e19">**forward-difference**</span>. In other words, using central difference approximation to find the second derivative. When $\Delta t\rightarrow 0$, it will converge to the true second-derivative value. In numerical computations, it will always be an approximation as it's impossible to have an infinitely small step size. 

<script src="https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>
<div id="calculator" style="width: 400px; height: 400px;"></div>
<button type="button" class="btn d-inline" id="verlet-animate">Animate</button>
<script>
  var elt = document.getElementById('calculator');
  var calculator = Desmos.GraphingCalculator(elt, {
    keypad: false,
    expressions: false,
    settingsMenu: false,
    lockViewport: true,
  });
  fetch("/assets/desmos/verlet.json")
    .then(response => response.json())
    .then(json => calculator.setState(json.state))
    .catch(err => console.error(err));
  var button = document.getElementById("verlet-animate");
  button.onclick = event => {
    calculator.getExpressions().forEach(expr => {
      if (expr.id != '2') return;
      expr.playing = !expr.playing;
      button.innerHTML = expr.playing ? "Stop" : "Animate";
      calculator.setExpression(expr);
    });
  };
</script>

$$
\begin{align}
f''(t) &\approx \frac{\frac{f(t+\Delta t)-f(t)}{\Delta t}-\frac{f(t)-f(t-\Delta t)}{\Delta t}}{\Delta t}\\
&\approx \frac{\frac{(f(t+\Delta t)-f(t))-(f(t)-f(t-\Delta t))}{\Delta t}}{\Delta t}\\
&\approx \frac{f(t+\Delta t)-2f(t)+f(t-\Delta t)}{\Delta t^2} \tag{1}
\end{align}
$$

It has an interesting property, we can see the approximated second-derivative is independent from its first-derivative. In simpler words, the next position vector $\mathbf{x}_{n+1}$ can be obtained directly by the previous two $\mathbf{x}_n$ and $\mathbf{x}_{n-1}$, without the need of calculating velocity. Continue from $(1)$, we get:

$$
\begin{align}
\ddot{\mathbf{x}} &\approx \frac{\mathbf{x}_{n+1} - 2\mathbf{x}_n + \mathbf{x}_{n-1}}{\Delta t^2}\\
\ddot{\mathbf{x}} {\Delta t^2} &\approx \mathbf{x}_{n+1} - 2\mathbf{x}_n + \mathbf{x}_{n-1}\\
\mathbf{x}_{n+1}&\approx2\mathbf{x}_n - \mathbf{x}_{n-1} + \ddot{\mathbf{x}} \Delta t^2 \tag{2}
\end{align}
$$

### Computing Velocity
Because velocities are not explicitly given by definition, it can only be estimated by the mean value theorem.

$$
f'(t) \approx \frac{f(t+\Delta t) - f(t-\Delta t)}{2\Delta t}
$$

To erase the dependency or previous position, just shift the time frame by $\Delta t$ at the cost of accuracy (forward-difference approximation). And you will soon notice it falls back to the form of [Euler method](#euler-method).

$$
\begin{align}
f'(t+\Delta t) &\approx \frac{f(t+2\Delta t) - f(t)}{2\Delta t}\\
&\approx \frac{f(t+\Delta t) - f(t)}{\Delta t}\\
\end{align}
$$

[^1]: F.Crivelli. _The Störmer-Verlet method, 2008_. [https://www2.math.ethz.ch/education/bachelor/seminars/fs2008/nas/crivelli.pdf](https://www2.math.ethz.ch/education/bachelor/seminars/fs2008/nas/crivelli.pdf)
[^2]: Gorilla Sun. _Euler and Verlet Integration for Particle Physics_. [https://www.gorillasun.de/blog/euler-and-verlet-integration-for-particle-physics/](https://www.gorillasun.de/blog/euler-and-verlet-integration-for-particle-physics/)