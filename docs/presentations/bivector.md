---
template: reveal.html
---
## Rethinking Normals
### An Introduction to Bivectors
<img src="assets/presentations/bivector/product.png" width="300">

---

## What are normals?

Notes:
Normals are everywhere in the computer graphics world.

---

## Cross Product $\times$

--

$\mathbf{a} \times \mathbf{b}$

<div class="fragment">
$$
\mathbf{a} = \begin{bmatrix} \mathbf{a}_x\\\mathbf{a}_y\\\mathbf{a}_z \end{bmatrix},\ 
\mathbf{b} = \begin{bmatrix} \mathbf{b}_x\\\mathbf{b}_y\\\mathbf{b}_z \end{bmatrix}
$$
</div>

<div class="fragment">
$$
\begin{aligned}
=\ &(\mathbf{a}_x\mathbf {\color {red}{i}} +\mathbf{a}_y\mathbf {\color {green}{j}} +\mathbf{a}_z\mathbf {\color {blue}{k}} )\times (\mathbf{b}_x\mathbf {\color {red}{i}} +\mathbf{b}_y\mathbf {\color {green}{j}} +\mathbf{b}_z\mathbf {\color {blue}{k}} ) \\
=\ &\mathbf{a}_x \mathbf{b}_x(\mathbf {\color {red}{i}} \times \mathbf {\color {red}{i}} )+\mathbf{a}_x \mathbf{b}_y(\mathbf {\color {red}{i}} \times \mathbf {\color {green}{j}} )+\mathbf{a}_x \mathbf{b}_z(\mathbf {\color {red}{i}} \times \mathbf {\color {blue}{k}} ) + \\
&\mathbf{a}_y \mathbf{b}_x(\mathbf {\color {green}{j}} \times \mathbf {\color {red}{i}} )+\mathbf{a}_y \mathbf{b}_y(\mathbf {\color {green}{j}} \times \mathbf {\color {green}{j}} )+\mathbf{a}_y \mathbf{b}_z(\mathbf {\color {green}{j}} \times \mathbf {\color {blue}{k}} ) + \\
&\mathbf{a}_z \mathbf{b}_x(\mathbf {\color {blue}{k}} \times \mathbf {\color {red}{i}} )+\mathbf{a}_z \mathbf{b}_y(\mathbf {\color {blue}{k}} \times \mathbf {\color {green}{j}} )+\mathbf{a}_z \mathbf{b}_z(\mathbf {\color {blue}{k}} \times \mathbf {\color {blue}{k}} )\\
\end{aligned}
$$
</div>
<div class="fragment">
$$
\Rightarrow\ (\mathbf{a}_y \mathbf{b}_z-\mathbf{a}_z \mathbf{b}_y)\mathbf {\color {red}{i}} +(\mathbf{a}_z \mathbf{b}_x-\mathbf{a}_x \mathbf{b}_z)\mathbf {\color {green}{j}} +(\mathbf{a}_x \mathbf{b}_y-\mathbf{a}_y \mathbf{b}_x)\mathbf {\color {blue}{k}}
$$
</div>

Notes:
Let's start by the cross product we all know by heart.

---

## Wedge Product $\wedge$

--

**Axiom:** $\mathbf{a} \wedge \mathbf{a} = 0$

<div class="fragment">
$$
\begin{align}
(&\mathbf{a}+\mathbf{b}) \wedge (\mathbf{a}+\mathbf{b})\\
=\ &\xcancel{\mathbf{a}\wedge\mathbf{a}} + \mathbf{a}\wedge\mathbf{b} + \mathbf{b}\wedge\mathbf{a} + \xcancel{\mathbf{b}\wedge\mathbf{b}} \\
=\ &\mathbf{a}\wedge\mathbf{b} + \mathbf{b}\wedge\mathbf{a} \\
\end{align}
$$
</div>

<div class="fragment">
$$
\Rightarrow\ \mathbf{a}\wedge\mathbf{b} = -\mathbf{b}\wedge\mathbf{a}
$$
</div>

--

**Axiom:** $\mathbf{a} \wedge \mathbf{a} = 0$

**Theorem 1:** $\mathbf{a}\wedge\mathbf{b} = -\mathbf{b}\wedge\mathbf{a}$

<div class="fragment">
$$
\mathbf{a} = \begin{bmatrix} \mathbf{a}_x\\\mathbf{a}_y \end{bmatrix},\ 
\mathbf{b} = \begin{bmatrix} \mathbf{b}_x\\\mathbf{b}_y \end{bmatrix}
$$
</div>

<div class="fragment">
$$
\begin{aligned}
\mathbf{a} \wedge \mathbf{b}
=\ &(\mathbf{a}_x\mathbf{\color{red}{e_1}}+\mathbf{a}_y\mathbf{\color{green}{e_2}}) \wedge (\mathbf{b}_x\mathbf{\color{red}{e_1}}+\mathbf{b}_y\mathbf{\color{green}{e_2}}) \\
=\ &(\mathbf{a}_x\mathbf{b}_x)\mathbf{\color{red}{e_1}} \wedge \mathbf{\color{red}{e_1}} + (\mathbf{a}_x\mathbf{b}_y)\mathbf{\color{red}{e_1}} \wedge \mathbf{\color{green}{e_2}}+ \\
   &(\mathbf{a}_y\mathbf{b}_x)\mathbf{\color{green}{e_2}} \wedge \mathbf{\color{red}{e_1}} + (\mathbf{a}_y\mathbf{b}_y)\mathbf{\color{green}{e_2}} \wedge \mathbf{\color{green}{e_2}} \\
=\ &(\mathbf{a}_x\mathbf{b}_y)\mathbf{\color{red}{e_1}}\wedge \mathbf{\color{green}{e_2}} - (\mathbf{a}_y\mathbf{b}_x)\mathbf{\color{red}{e_1}}\wedge \mathbf{\color{green}{e_2}} \\
=\ &(\mathbf{a}_x\mathbf{b}_y - \mathbf{a}_y\mathbf{b}_x)\mathbf{\color{red}{e_1}}\wedge \mathbf{\color{green}{e_2}}
\end{aligned}
$$
</div>

Notes:
Meet the wedge product, it is a little wedge symbol denoting an algebraric operation where the product of any two identical vectors will always be 0.

Now what can we do with this axiom? Let's try to extend it by substituting vector "a" to "a+b".

---

`$$
[ x \fragment{2}{+ y} \fragment{1}{= z} ]
$$`

Notes:
That looks like the cross product we used to know, right? So what's the difference between a cross product and a wedge product?
In fact, the cross product is just an operation specific to R3, whereas the wedge product extends and generalizes up to any vector spaces Rn.

---