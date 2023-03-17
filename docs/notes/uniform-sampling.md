# Uniform Sampling
Puseudo-random noise usually don't produce good uniform samples. It often produces clusters and void within the sample space. That means the sample space is not well explored, either wasting samples on similar areas or even complete ignoring some subregions. And this scales to any dimensions.

<div class="d-flex">
  <div id="white-noise-1d" style="flex: 1"></div>
  <div id="white-noise-2d" style="flex: 1"></div>
  <div id="white-noise-3d" style="flex: 1"></div>
</div>

## Stratified Sampling
Instead of recklessly scatter points around, how about subdiving the domain $\Omega$ into non-overlapping regions $\Omega_1, \dots, \Omega_n$. Noted that the union of them must cover the whole domain.

$$
\bigcup_{i=1}^n{\ \Omega_i} = \Omega
$$

<div class="d-flex">
  <div id="stratified-1d" style="flex: 1"></div>
  <div id="stratified-2d" style="flex: 1"></div>
  <div id="stratified-3d" style="flex: 1"></div>
</div>

This works pretty well in low-dimensional integration problems. However unfortunately, this suffers the same problem as the quadrature rules where it won't perform well in high frequency signals.

## Low-Discrepancy Sequences
If randomness are difficult to control, how about herding the points to position in a deterministic pattern such that they are _almost_ equal distance to each other?

### Defining Discrepancy
Imagine a $s$-dimentional unit cube $\mathbb{I}^s = [0, 1)^s$, with a point set $P = {x_1, x_2, \dots, x_N} \in \mathbb{I}^s$. We define the point set discrepancy as the proportion of points inside a sub-interval $J$.

$$
\mathcal{D}(J, P) = \left|\frac{A(J)}{N} - V(J)\right|
$$

where $A(J)$ is the number of points $x_i \in J$ and $V(J)$ is the volume of $J$. 

<div id="discrepancy"></div>

$N=$<span id="discrepancy-n"></span></br>
$\mathcal{D}(A, P) =|$<span id="discrepancy-a">$\frac{A(A)}{N}-V(A)$</span>$|=$ <span id="discrepancy-ar"></span></br>
$\mathcal{D}(B, P) =|$<span id="discrepancy-b">$\frac{A(B)}{N}-V(B)$</span>$|=$ <span id="discrepancy-br"></span></br>
$\mathcal{D}(C, P) =|$<span id="discrepancy-c">$\frac{A(C)}{N}-V(C)$</span>$|=$ <span id="discrepancy-cr"></span></br>
$\mathcal{D^*}(P) =$<span id="discrepancy-star"></span>

<button type="button" class="btn d-inline" id="discrepancy-generate">Generate Point Set</button>
<button type="button" class="btn d-inline" id="discrepancy-reset">Reset</button>

The worst-case discrepancy is called the _star-discrepancy_ and is defined as:

$$
\mathcal{D^*}(N)=\sup_{J\in\mathbb{I^s}}{|\mathcal{D}(J;P)|}
$$

A good low-discrepancy sequence should minimize the _star-discrepancy_ $\mathcal{D^*}(N)$.

[^1]: Veach, E. (1997). Robust Monte Carlo Methods for Light Transport Simulation. (Doctoral dissertation, Stanford University).
[^2]: Dalal, I., Stefan, D., & Harwayne-Gidansky, J. (2008). Low discrepancy sequences for Monte Carlo simulations on reconfigurable platforms. In 2008 International Conference on Application-Specific Systems, Architectures and Processors (pp. 108–113).

