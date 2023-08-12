# Microfacet Theory

## Fresnel (F)

## Normal Distribution (D)

## Geometric Attenuation (G)


## Various Models


### Schlick's Approximation
Christophe Schlick proposed an inexpensive and efficient model[^1] in attempt to capture the microfacet properties. This is probably the most popular go-to model aside from the Cook-Torrance model, usually used in real-time graphics since it has less mathematical operations. Both $F$ and $G$ terms are inspired from the Cook-Torrance model, while the $D$ term is derived from the Beckmann distribution.

$$F(\mathbf{v},\mathbf{h})=f_0+(1-f_0)(1-\left|\mathbf{v}\cdot\mathbf{h}\right|)^5$$

$$D(\mathbf{h})=\frac{\alpha^3x}{\left|\mathbf{n}\cdot\mathbf{h}\right|(\alpha x^2-x^2+\alpha^2)^2},\quad x=\left|\mathbf{n}\cdot\mathbf{h}\right|+\alpha-1$$

$$G(\mathbf{l},\mathbf{v},\mathbf{h})=G_1(\mathbf{l})\ G_1(\mathbf{v}),\quad G_1(\mathbf{v})=\frac{\left|\mathbf{n}\cdot\mathbf{h}\right|}{\left|\mathbf{n}\cdot\mathbf{h}\right|(1-k)+k},\quad k=\sqrt{\frac{\pi}{2\alpha^2}}$$

### Unreal 4
Epic Games[^2] mostly adopts the formulations of $F$ and $G$ from the Schlick's model, but uses Disney's choice of $G$ in GGX. It seems to me that every decisions are sacrificing minor visual error for faster computations.

$$F(\mathbf{v},\mathbf{h})=f_0+(1-f_0)\cdot2^{(-5.55473\left|\mathbf{v}\cdot\mathbf{h}\right|-6.98316)\left|\mathbf{v}\cdot\mathbf{h}\right|}$$

$$D(\mathbf{h})=\frac{\alpha^2}{\pi(\left|\mathbf{n}\cdot\mathbf{h}\right|^2(\alpha^2-1)+1)^2}$$

$$G(\mathbf{l},\mathbf{v},\mathbf{h})=G_1(\mathbf{l})\ G_1(\mathbf{v}),\quad G_1(\mathbf{v})=\frac{\left|\mathbf{n}\cdot\mathbf{h}\right|}{\left|\mathbf{n}\cdot\mathbf{h}\right|(1-k)+k},\quad k=\frac{(\alpha+1)^2}{8}$$




[^1]: Schlick C. (1994, August). [An inexpensive BRDF model for physically‐based rendering](https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=183db641ff80ff21234040ccce884cb06227dad4). _In Computer graphics forum (Vol. 13, No. 3, pp. 233-246). Edinburgh, UK: Blackwell Science Ltd._
[^2]: Karis B, Epic Games. (2013). [Real shading in unreal engine 4](https://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf). _Proc. Physically Based Shading Theory Practice, 4(3), 1._