# Position Based Fluids
As discussed in [Position Based Simulation](position-based.md), position-based dynamics provided the foundations of simulating lagrangian fluids. 

## Density Constraint
The density constraint[^1] is a function of the particle’s position and the positions of its neighbors $(\mathbf{x}_1, \cdots, \mathbf{x}_\mathbf{n_j})$. The $\mathbf{n_j}$ denotes the number of neighboring particles, $\rho_o$ is the resting density, and $W(\vec{r}, h)$ is the smoothing kernel with kernel size of $h$.

$$
C_i(\mathbf{x}_1, \cdots, \mathbf{x}_\mathbf{n_j}) = \frac{\rho_i}{\rho_o}-1
$$

$$
\rho_i = \sum_j{m_j W(\mathbf{x}_i - \mathbf{x}_j, h)}
$$

For a $N$-particle simulation, every particles need to apply a density constraint to ensure its local density $\rho$ remain the same at all time. Notice how bilateral condition $C(\mathbf{x})=0$ is used here, enforcing the incompressibility property of fluids.

$$
C_{density}(\mathbf{x}) =
\begin{cases}
C_1(\mathbf{x}_1, \cdots, \mathbf{x}_\mathbf{n_j}) = 0\\
\cdots\\
C_N(\mathbf{x}_1, \cdots, \mathbf{x}_\mathbf{n_j}) = 0\\
\end{cases}
$$

## Smoothing Kernels
Smoothing kernels are essential for integrating local density of a particle in an SPH simulation. They need to fulfill a few requirements:

- Radially symmetric (i.e. only depends on distance)
- Finite support (i.e. particles should only affect up to a certain distance)
- Differentiable and integrates to 1

### Poly6
In 3D:

$$
W_{poly6}(\vec{r}, h) = \frac{315}{64 \pi h^9}
  \begin{cases}
  (h^2-\|r\|^2)^3 & \text{if } 0\leq \|r\|\leq h\\
  0               & \text{else}
  \end{cases}
$$

### Spiky
In 3D:

$$
W_{spiky}(\vec{r}, h) = \frac{15}{\pi h^6}
  \begin{cases}
  (h-\|r\|)^3 & \text{if } 0\leq \|r\|\leq h\\
  0           & \text{else}
  \end{cases}
$$

## Tensile Instability
Quoting from the paper[^1]:
> A common problem in SPH simulations is particle clustering or
clumping caused by negative pressures when a particle has only a
few neighbors and is unable to satisfy the rest density.

Lone particles that do not have sufficient neighbor particles to satisfy its density constraint will cause numerical instability in the constraint projection stage. Resulting in extreme correction vector value and can break the simulation. One method is to clamp the density constraint result to zero to prevent negative pressure.

$$
C_i(\mathbf{x}_1, \cdots, \mathbf{x}_\mathbf{n_j}) = \max(0, \frac{\rho_i}{\rho_o}-1)
$$

Even though negative pressure is not a thing in real life, it models the cohesion nature of fluid particles. So by clamping the constraint, we are also limiting ourselves from having the cohesive behavior.

Luckily, in the paper "SPH without a tensile instability"[^2], an artificial pressure correction factor is proposed. Where $\Delta\vec{q}$ is vector to a point at some fixed distance inside the smoothing kernel radius $h$ and $\epsilon$ is a small positive constant. The recommended values are $\|\Delta\vec{q}\|=\{0.1h, \cdots, 0.3h\}$, $\epsilon = 0.1$ and $n = 4$ work well in most cases.

$$
\lambda_{corr}=-\epsilon\cdot\left(\frac{W(\vec{r}, h)}{W(\Delta\vec{q}, h)}\right)^n
$$

[^1]: Macklin, M., & Müller, M. (2013). Position based fluids. ACM Transactions on Graphics (TOG), 32(4), 1-12.
[^2]: Monaghan, J. J. (2000). SPH without a tensile instability. Journal of computational physics, 159(2), 290-311.

## Bloopers
|1|2|3|
|:--:|:--:|:--:|
|![](/img/blooper1.webp)|![](/img/blooper2.webp)|![](/img/blooper3.webp)