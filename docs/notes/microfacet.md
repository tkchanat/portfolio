# Microfacet Theory
There is a well-written paper by Eric Heitz[^1] explaining every details about the microfacet theory. I highly recommend everyone to read it to get a thorough understanding from beginning to end. The stuff I write here was just my rough understanding of the work, happy to correct this page anytime. 

## Radiance on Surface
Here is the definition of radiance from wikipedia.
> In radiometry, radiance is the radiant flux emitted, reflected, transmitted or received by a given surface, per unit solid angle per unit projected area $[W\cdot sr^{-1}\cdot m^{-2}]$.

It matches the one defined in Veach's thesis, which is written as:

$$
\begin{align*}
L(\omega, \mathbf{x}) &= \frac{d^2\Phi(\omega)}{dA^\bot_{\omega}(\mathbf{x})\ d\sigma(\omega)}\\
&= \frac{d^2\Phi(\omega)}{\left|\omega\cdot \mathbf{n}\right|dA(\mathbf{x})\ d\sigma(\omega)}\\
&= \frac{d^2\Phi(\omega)}{dA(\mathbf{x})\ d\sigma^\bot_{\omega}(\omega)}
\end{align*}
$$

The $A^\bot_{\omega}$ here means the area projected from the hypothetical surface onto the observed direction $\omega$. For a real surface, the projected area measure $dA^\bot_{\omega}$ in a real surface can be written as $\left|\omega\cdot \mathbf{n}\right|dA(\mathbf{x})$. Even better, the dot product $\left|\omega\cdot \mathbf{n}\right|$ can be transfered into the solid angle measure $(\sigma_\omega \rightarrow \sigma^\bot_{\omega})$, which can be beneficial sometimes if we want to leverage that property during integration, e.g. [Stratified sampling of projected spherical caps, EGSR 2018](http://www.iliyan.com/publications/ProjectedSphericalCaps).

Extending this to a microfacet model, where every micronormals $\omega_m$ has its own direction, we need to integrate that over a small patch of surface $\mathcal{M}$. 

$$
L(\omega_o, \mathcal{M}) = \frac{\int_\mathcal{M}{A^\bot_{\omega_o}(\mathbf{x})\ L(\omega_o, \mathbf{x})\ d\mathbf{x}}}{A^\bot_{\omega_o}(\mathcal{M})}
$$

For every infinitesimal points $\mathbf{x}\in\mathcal{M}$, its local radiance towards the observing direction is $A^\bot_{\omega_o}L(\omega_o,\mathbf{x})$. So the integrated result will be the total amount of watts per steradian $[W\cdot sr^{-1}]$ that is radiating off to the observing direction $\omega_o$. The purpose of the denominator $A^\bot_{\omega_o}(\mathcal{M})$ which represents the total projected area of $\mathcal{M},$ is here merely to normalize the entire thing back to per unit area $[W\cdot sr^{-1}\cdot m^{-2}]$.

Fun little fact, for marcosurface $\mathcal{G}$ which its normal doesn't vary within the domain, it's radiance is no difference than the original definition of radiance.

$$
\begin{align*}
L(\omega_o, \mathcal{G}) &= \frac{\int_\mathcal{G}{A^\bot_{\omega_o}(\mathbf{x})\ L(\omega_o, \mathbf{x})\ d\mathbf{x}}}{A^\bot_{\omega_o}(\mathcal{G})}\\
&= \frac{A^\bot_{\omega_o}(\mathcal{G})\ L(\omega_o, \mathbf{x})}{A^\bot_{\omega_o}(\mathcal{G})}\\
&= L(\omega_o, \mathbf{x})
\end{align*}
$$

## Normal Distribution Function
Spatial integral isn't ideal to work with because the whole microfacet theory is based on a statistical model, it's not necessarily tied to an actual spatial representation. That being said, we need a way to convert that integral into the solid angle domain. Luckily, the distribution of normals is able to provide just that.

$$
D(\omega) = \int_\mathcal{M}{\delta_\omega(\omega_m(\mathbf{x}))\ d\mathbf{x}}
$$

It is expressed in square meters per steradian $[m^2\cdot sr^{-1}]$, representing the density of normals that aligns a given direction $\omega$ over the surface $\mathcal{M}$, hence the dirac delta function $\delta_\omega$. To better understand this magical function, imagine counting the number of micronormals in the patch that are pointing to the direction $\omega$ within the domain space $\mathcal{M}$. Its sum will be the area covering the selected population of normals, and this is where the area term $m^2$ comes from. This adds on top of the fact that dirac delta always has the inverse dimension of its argument, which is in $sr$ here, so its unit is per steradian $sr^{-1}$. 

Let's talk about an interesting property of the integral of normal distribution. Over any arbitrary solid angle region $\Omega'\subset\Omega$ on the unit sphere, it always gives the total covered area whose normals lie in $\Omega'$.

$$
\int_\mathcal{M'}1\ d\mathbf{x} = \int_{\Omega'} D(\omega_m)\ d\omega_m
$$

This makes $\int_\Omega D(\omega_m)\ d\omega_m$ the total area of the microsurface $\mathcal{M}$. Magical, right? Now any attempts of integrating a function of the microsurface normal $\omega_m$ spatially over $\mathcal{M}$ can be converted into a statistial integral:

$$
\int_\mathcal{M}f(\omega_m(\mathbf{x}))\ d\mathbf{x} = \int_\Omega f(\omega_m)\ D(\omega_m)\ d\omega_m
$$

TODO...

## Geometric Attenuation
$G_1(\omega_o, \omega_m)$ is the statistical masking function of micro-normal $\omega_m$. 

$G_1(\omega_i, \omega_m)$ is the statistical shadowing function of micro-normal $\omega_m$

$G(\omega_i, \omega_o)$ is the shadowing-masking term

## Various Models
!!! info "Notation"

    $\chi^+(a)$ is a special step function, called Heaviside function. It is defined as $1$ if $a>0$ and $0$ if $a\leq 0$.

    $\omega_m$ is my preferred notation for micro-normal, it's also known as $\mathbf{h}$ or $\mathbf{m}$.

    $\omega_g$ is my preferred notation for geometric normal, it is also known as $\mathbf{n}$ or $Z=(0,0,1)$ if in local tangent-space.

### Trowbridge–Reitz (GGX)
There are way too many forms online, I picked the known ones to show you that they are all equivalent. 

$$
\begin{align}
D(\omega_m, \alpha) &=
\frac{\alpha^2\chi^+(\omega_m\cdot\mathbf{\omega_g})}
     {\pi cos^4\theta_m(\alpha^2+tan^2\theta_m)^2}
& \text{Walter et al. 2007}
\\
&=
\frac{\alpha^2\chi^+(\omega_m\cdot\mathbf{\omega_g})}
     {\pi cos^4\theta_m (\frac{sin^2\theta_m}{cos^2\theta_m}+\alpha^2\frac{\cancel{cos^2\theta_m}}{\cancel{cos^2\theta_m}})^2}
\\
&=
\frac{\alpha^2\chi^+(\omega_m\cdot\mathbf{\omega_g})}
     {\pi (sin^2\theta_m+\alpha^2cos^2\theta_m)^2}
\\
&=
\frac{\chi^+(\omega_m\cdot\mathbf{\omega_g})}
     {\pi \alpha^2 (\frac{1}{\alpha^2}(sin^2\theta_m+\alpha^2cos^2\theta_m))^2}
\\
&=
\frac{\chi^+(\omega_m\cdot\mathbf{\omega_g})}
     {\pi \alpha^2 (\frac{sin^2\theta_m}{\alpha^2}+cos^2\theta_m)^2}
\\
&=
\frac{\chi^+(\omega_m\cdot\mathbf{\omega_g})}
     {\pi \alpha^2 (\frac{x_m^2 + y_m^2}{\alpha^2}+z_m^2)^2}
\\
D(\omega_m, \alpha_x, \alpha_y) &=
\frac{\chi^+(\omega_m\cdot\mathbf{\omega_g})}
     {\pi \alpha_x \alpha_y (\frac{x_m^2}{\alpha_x^2}+\frac{y_m^2}{\alpha_y^2}+z_m^2)^2}
& \text{Heitz 2018}
\end{align}
$$

$$G(\mathbf{l},\mathbf{v},\omega_m)=\chi^+\left(\frac{\left<\mathbf{v}\cdot\omega_m\right>}{\left<\mathbf{v}\cdot\mathbf{n}\right>}\right)\quad\frac{2}{1+\sqrt{1+\alpha^2tan^2\theta_\mathbf{v}}}$$

### Unreal 4 Approximation
Epic Games[^4] mostly adopts the formulations of $F$ and $G$ from the Schlick's model with slight modifications, but picked the $D$ in the Disney's GGX model. These are obviously an approximation on top of an approximation. Every decisions made here are sacrificing minor visual error for faster computations.

$$F(\mathbf{v},\omega_m)=f_0+(1-f_0)\cdot2^{(-5.55473\left<\mathbf{v}\cdot\omega_m\right>-6.98316)\left<\mathbf{v}\cdot\omega_m\right>}$$

$$D(\omega_m)=\frac{\alpha^2}{\pi(\left<\mathbf{n}\cdot\omega_m\right>^2(\alpha^2-1)+1)^2}$$

$$G(\mathbf{l},\mathbf{v},\omega_m)=G_1(\mathbf{l})\ G_1(\mathbf{v}),\quad G_1(\mathbf{v})=\frac{\left<\mathbf{n}\cdot\omega_m\right>}{\left<\mathbf{n}\cdot\omega_m\right>(1-k)+k},\quad k=\frac{(\alpha+1)^2}{8}$$



[^1]: Heitz E. (2014). [Understanding the masking-shadowing function in microfacet-based BRDFs](https://jcgt.org/published/0003/02/03/paper.pdf). _Journal of Computer Graphics Techniques, 3(2), 32-91._
[^2]: Walter B., Marschner S. R., Li H., & Torrance K. E. (2007, June). [Microfacet models for refraction through rough surfaces](https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf). _In Proceedings of the 18th Eurographics conference on Rendering Techniques (pp. 195-206)._
[^3]: Schlick C. (1994, August). [An inexpensive BRDF model for physically‐based rendering](https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=183db641ff80ff21234040ccce884cb06227dad4). _In Computer graphics forum (Vol. 13, No. 3, pp. 233-246). Edinburgh, UK: Blackwell Science Ltd._
[^4]: Karis B, Epic Games. (2013). [Real shading in unreal engine 4](https://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf). _Proc. Physically Based Shading Theory Practice, 4(3), 1._