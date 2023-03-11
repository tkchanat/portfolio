# Monte Carlo Integration

## Quadrature rules
To integrate the function $I = \int_{\Omega}{f(x) dx}$, where $\Omega$ is the domain of integration. If $f(x)$ known to you and can be evaluated analytically, then you are good. But usually that's not the case, $f(x)$ behaves like a blackbox (you give it an input and it spits out an output), it needs to be integrated numerically. 

Pretend you don't know the equation for the following function and you want to know its area bounded by it. In high school, we were taught that the integral can be approximated with infinitesimal rectangles, a.k.a. the rectangle rules. So let's put together a bunch of rectangles and crunch some numbers!

<div id="rectangle-rule">
  <input type="range" min="2" max="64" value="8" class="slider center" id="myRange">
  <input type="text" id="textInput" value="8">
</div>

As the number of rectangles grows, the closer it fills the target area. To which I can say with confidence the area is $\pi/4$ since it's obviously a quarter of a circle. 

There are more similar approaches to do integration and they are known as quatrature rules. The generalized form looks like this $\hat{I} = \sum_{i=1}^n w_i\ f(x_i)$. The weight $w_i$ is defined differently in other rules, e.g. _Midpoint rule_, _Trapezoid rule_, _Simpson's rule_, etc. 

### Downside
These kind of numerical approximations suffers from two major problems. 

#### High-frequency signals
<div id="high-frequency"></div>
Graphs like this can't be easily approximated with thick bars. To get closer to the real value, the bars must be really narrow which means more iterations to compute. 

#### High-dimensional domains
$$
\hat{I}=\sum_{i_1=1}^n \sum_{i_2=1}^n \dots \sum_{i_s=1}^n{w_{i_1} w_{i_2} \dots w_{i_s} f(x_{i_1}, x_{i_2}, \dots, x_{i_s})}
$$

where $s$ is the dimension, $w_i$ is the weights and $x_i$ is the sample position in the domain. Which is always the case when solving light transport problems.

## Motivation
As the name suggests, we can integrate functions with stochastic approaches through random sampling. With the Monte Carlo method, we can tap into the power of integrating arbitrary multi-dimensional functions!

$$
F_N = \frac{1}{N} \sum_{i=1}^N{ \frac{f(X_i)}{p(X_i)} }
$$

where $p(X_i)$ is the probability density function (pdf). And we can verify that with sufficient samples, it will eventually converge to the expected value $I$.

$$
\begin{align}
E[F_N] &= E[\frac{1}{N}\sum_{i=1}^N{\frac{f(X_i)}{p(X_i)}}] \\
&= \frac{1}{N}\sum_{i=1}^N{\int_{\Omega}{\frac{f(x)}{p(x)} p(x) d\mu(x)}} \\
&= \int_{\Omega}{f(x) d\mu(x)} \\
&= I
\end{align}
$$

It comes with the following benefits:

1. It has a convergence rate of $O(N^{-\frac{1}{2}})$ in any number of dimensions, which quadrature rule methods cannot achieve.
2. Simplicity. All you need is two functions `sample()` and `eval()`, and occationally finding a suitable pdf.

## Sampling random variables
Of course we can sample uniformly across the domain, but that's usually not the best way to generate samples for our Monte Carlo integral. Picking the random samples carefully helps us to reach the convergence value faster.

### Inverse Transform Sampling
This is a method for generating random variables from a given probability distribution by using its inverse cumulative distribution (cdf). The inversion method states that given a density function $p(x)$ 

<div style="display: flex">
  <div id="normal-distribution" style="flex: 1"></div>
  <div id="cumulative-distribution" style="flex: 1"></div>
</div>
<button type="button" class="btn d-inline" id="cdf-1">Add 1 sample</button>
<button type="button" class="btn d-inline" id="cdf-10">Add 10 samples</button>
<button type="button" class="btn d-inline" id="cdf-reset">Reset</button>

### Rejection Sampling


<link href="../../css/app.css" rel="stylesheet"></style>
<script type="module" src="../../js/plot.js"></script>
