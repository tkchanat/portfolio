# Measure Theory

## Preface
I saw an argument on the internet the other day, claiming that high school students should really learn the basics of measure theory before touching any topics in statistics study. That sparks my interest in learning what the measure theory is actually about. Nothing is better than learning it through Terence Tao's book ["An Introduction to Measure Theory"](https://terrytao.files.wordpress.com/2012/12/gsm-126-tao5-measure-book.pdf). Hopefully this gives me better insights into the statistical world. 

## Problem of Measure
What is a measure? The first thing comes to my mind was to use a ruler, scale, etc., something with a discrete interval to physically measure a body $E$. But in the real world, everything is made of immeasurable atomic components. Think of the [Coastline Paradox](https://en.wikipedia.org/wiki/Coastline_paradox). So to formalize this intuition would be defining a solid body as consisting an infinite and uncountable number of points, each of which has a measure of zero. Even though this sounds reasonable at first, it causes two problems:

1. $0\cdot\infty$ is undefined, we simply couldn't measure it mathematically.
2. Two bodies that have exactly the same number of points, need not have the same measure. Imagine a rope of length 1, you disassemble it into an uncountable number of points and reassemble it twice further apart, now you got the same rope but with length of 2.

Ones might blame the infinite partitions that causes all sorts of weirdness. But the [Banach-Tarski paradox](https://youtu.be/s86-Z-CbaHA?si=HM-8MQncXfS7Iv6g&t=679) demonstrates that it's theoretically possible to disassemble a unit sphere $B := \{(x,y,z) \in \mathbf{R}^3: x^2+y^2+z^2\leq1\}$ into 5 pieces, which can then be reassembled by rigid motion (translation/rotation) to form two disjoint copies of the original sphere.

But the idea of this decomposition is highly [pathological](<https://en.wikipedia.org/wiki/Pathological_(mathematics)#:~:text=Here%2C%20an%20input%20(or%20set,complexity%2C%20or%20even%20its%20correctness.>) and considered as not having much practical applications in mathematics. Therefore, the modern problem of measure has shifted the focus to a certain subset of the non-pathological cases in $\mathbf{R}^d$, which mathematicians refer as the _measurable sets_. Then the following subproblems arose:

1. What does it mean for a subset $E$ of $\mathbf{R}^d$ to be measurable?
2. If a set $E$ is measurable, how does one define its measure?
3. What nice properties or axioms does measure obey?
4. Are ordinary sets (e.g. cubes, sphere, platonic solids, etc.) measurable?
5. Does the measure of an ordinary set equal the naive geometric measure?
