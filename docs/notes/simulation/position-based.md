# Position Based Simulation
As oppose to any other rigidbody simulations, [force-based](force-based.md) and [impulse-based](impulse-based.md) that deals with velocity and acceleration calculations, position-based simulation attempts to minimize the constrains on the position domain down to particle level. 

## Problem
Given a set of $M$ constrains (basically means there are $M$ equality or inequality equations to satisfy), we need to solve for $N\times\mathbb{R}^3$ unknowns to resolve our final positions. Most of the time, the number of constraints won't match the number of unknowns we are solving (i.e. $M \neq N$). This means if the problem was a linear system $\mathbf{A}\mathbf{x}=\mathbf{b}$, the solution can't be obtained easily by inverting the matrix and solve for $\mathbf{x}$. Not to mention the system we are solving won't necessarily be linear, for example a simple distance constraint $c(\mathbf{x}_1, \mathbf{x}_2)=\left|\mathbf{x}_1-\mathbf{x}_2\right|^2-d^2$ alone is a non-linear equation.

Thus, it all boils down to a complex problem of finding a set of positions $\mathbf{x}$ that minimize if not solved the constrained system:

$$
C(\mathbf{x}) =
\begin{cases}
c_1(\mathbf{x}_1, \mathbf{x}_2, \cdots, \mathbf{x}_N) \succ 0\\
\cdots\\
c_M(\mathbf{x}_1, \mathbf{x}_2, \cdots, \mathbf{x}_N) \succ 0\\
\end{cases}
$$

Where $\mathbf{x}$ is the concatenation of $N\times\mathbb{R}^3$ positions we are trying to solve, and the symbol $\succ$ denotes either $=$ or $\geq$. 

As said, there won't be closed form solution because the system is neither symmetric nor linear. Our best bet is to apply an iterative solver to minimize the system after a fixed amount of iterations and hope for the best that the approximated result will satisfy all our constraints. 

## Non-Linear Gauss-Seidel Solver
If all constraints in the system can't be solved at once, then we need to solve each constraint equation separately, i.e. $c(\mathbf{x})\succ0$. Since we want to find a correction $\Delta\mathbf{x}$ such that $c(\mathbf{x}+\Delta\mathbf{x})\succ0$. Thus we arrived to this constraint equation:

$$
C(\mathbf{x}+\Delta\mathbf{x})\approx C(\mathbf{x})+\nabla C(\mathbf{x})\cdot\Delta \mathbf{x} \succ 0 \tag{1}
$$

Here $\nabla C(\mathbf{x})$ is the gradient of given constraints, and the equation above literally means stepping from the current constraint value $C(\mathbf{x})$ with a step size $\Delta\mathbf{x}$ should be ended up equal or greater or equal than 0. The paper mentioned that by restricting the step direction to be $\nabla C(\mathbf{x})$, satisfies the requirement for linear and angular momentum conservation. It also means only Lagrange multiplier scalar $\lambda$ has to be found to solve the correction equation $(1)$.

$$
\Delta\mathbf{x}=\lambda \mathbf{M}^{-1}\nabla C(\mathbf{x})
$$

where $\mathbf{M}=diag(m_1, m_2, \cdots, m_N)$ (not quite sure what is it, I think it's some sort of multipliers, maybe the mass for each particles). So the correction vector of particle $i$ will be:

$$
\begin{cases}
\Delta\mathbf{x}_i &= -\lambda_i w_i \nabla_{\mathbf{x}_i} C(\mathbf{x})\\
\lambda_i &= \frac{C(\mathbf{x})}{\sum_j{w_j\left|\nabla_{\mathbf{x}_j}C(\mathbf{x})\right|^2}}
\end{cases}
$$

I wish I understand this step, maybe later... Combining all Lagrange multipliers, we get:

$$
\lambda=\frac{C(\mathbf{x})}{\nabla C(\mathbf{x})^T \mathbf{M}^{-1}\nabla C(\mathbf{x})}
$$

## Algorithm
The main position based dynamics (PBD) algorithm can be split into three different stages: prediction, constraint projection, and post-solve updates.

$$
\begin{align}
&\mathbf{while}\ \text{simulating}\\
&\quad \mathbf{for} \text{ all particles } i\\
&\quad\quad \mathbf{v}_i \leftarrow \mathbf{v}_i + \mathbf{f}_{ext}\Delta t\\
&\quad\quad \mathbf{p}_i \leftarrow \mathbf{x}_i + \mathbf{v}_i\Delta t\\
&\quad \mathbf{for} \text{ all constraints } C\\
&\quad\quad solve(C, \Delta t)\\
&\quad \mathbf{for} \text{ all particles } i\\
&\quad\quad \mathbf{v}_i \leftarrow (\mathbf{x}_i - \mathbf{p}_i) \frac{1}{\Delta t}\\
&\quad\quad \mathbf{x}_i \leftarrow \mathbf{p}_i
\end{align}
$$

### Integration


## Result
![](img/pbd.webp)

[^1]: Jan Bender, Mattias Müller, Miles Macklin. _Position-Based Simulation Methods in Computer Graphics, Eurographics 2015_. [http://mmacklin.com/EG2015PBD.pdf](http://mmacklin.com/EG2015PBD.pdf)