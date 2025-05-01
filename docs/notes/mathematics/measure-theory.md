# Measure Theory

## Preface
I saw an interesting argument on the internet the other day, claiming that measure theory should be a part of the high school curriculum before touching any topics in statistics or calculus. That sparks my curiosity in learning what the measure theory is actually about. I thought it would be a good start to read through Terence Tao's book ["An Introduction to Measure Theory"](https://terrytao.files.wordpress.com/2012/12/gsm-126-tao5-measure-book.pdf). Hopefully this gives me better insights into what measurement is about in the mathematic world. 

## Problem of Measure
What is a measure? The first thing comes to my mind was to use a ruler, scale, etc., something with a discrete interval to physically measure a body $E$. It's either length of a rope, or weight of a rock. Doesn't matter. It's just about how to obtain a quantitative measurement of something, a magnitude.

But in the real world, everything is made of immeasurable atomic components. Think of the [Coastline Paradox](https://en.wikipedia.org/wiki/Coastline_paradox). So to formalize this intuition would be defining a solid body as consisting an infinite and uncountable number of points, each of which has a measure of zero. Even though this sounds reasonable at first, it causes two problems:

1. $0\cdot\infty$ is undefined, we simply couldn't measure it mathematically.
2. Two bodies that have exactly the same number of points, need not have the same measure. Imagine a rope of length 1, you disassemble it into an uncountable number of points and reassemble it twice further apart, now you got the same rope but with length of 2.

If a measurement is infinitesimally small, what is its length? No one governs its length, right?

Ones might blame the infinite partitions that causes all sorts of weirdness. But the [Banach-Tarski paradox](https://youtu.be/s86-Z-CbaHA?si=HM-8MQncXfS7Iv6g&t=679) uses a combination of set theory to demonstrate that it's theoretically possible to disassemble a unit sphere $B := \{(x,y,z) \in \mathbf{R}^3: x^2+y^2+z^2\leq1\}$ into 5 pieces, which can then be reassembled by rigid motion (translation/rotation) to form two disjoint copies of the original sphere. 

My head is about to explode when I read until here. I'm sure everyone is. This is why mathematicians try not to think about them. These ideas are considered highly [pathological](<https://en.wikipedia.org/wiki/Pathological_(mathematics)#:~:text=Here%2C%20an%20input%20(or%20set,complexity%2C%20or%20even%20its%20correctness.>) and considered as not having much practical applications in mathematics. Therefore, the modern problem of measure has shifted the focus to a certain subset of the non-pathological cases in $\mathbf{R}^d$, which mathematicians refer as the _measurable sets_. Then the following subproblem arose:

1. What does it mean for a subset $E$ of $\mathbf{R}^d$ to be measurable?
2. If a set $E$ is measurable, how does one define its measure?
3. What nice properties or axioms does measure obey?
4. Are ordinary sets (e.g. cubes, sphere, platonic solids, etc.) measurable?
5. Does the measure of an ordinary set equal the naive geometric measure?

## Lebesgue Integral
Most continuous functions can be integrated using a Riemann integral, i.e. using infinitesimal rectangles to approximate the area under a curve. For example, a simple function like:

$$
f(x) = 
\begin{cases}
0 \quad x \in [0, 1]
\end{cases}
$$

Of course its integral is zero, since every rectangles have a height of zero. But what if the function is one exclusively at both ends?

$$
f(x) = 
\begin{cases}
1 \quad x = 0\\
0 \quad x \in (0, 1)\\
1 \quad x = 1
\end{cases}
$$

Despite it's a discontinuous function, this still can be evaluated by a Riemann integral. Since the rectangle width at both ends tends to zero, their areas are still zero. And hence the whole integral evaluates to zero.

Following the same logic, no matter how many points in the interval [0, 1] that I disconnect from the function and set its value to 1, the integral will always evaluates to be zero. Or, is it? 

Consider the following:

$$
\mathbf{1}_\mathbb{Q}(x) = 
\begin{cases}
1 \quad x \in \mathbb{Q}\\
0 \quad x \notin \mathbb{Q}
\end{cases}
$$

This is called a [Dirichlet function](https://en.wikipedia.org/wiki/Dirichlet_function). It is an example of a pathological function where it's 1 if $x$ is a rational number and 0 if $x$ is irrational. 

This cannot be solved by the Riemann integral due to rational and irrational number are closely packed on the real number line. No matter how small the interval around a rational number (width of a infinitesimal rectangle), you will always capture an infinite number of irrational numbers around the rational number.

This is where the Lebesgue integral comes to rescue. It's base on the axiom that the measure of a single point on the real number line is zero. This is denoted by:

$$
\mu(\text{point})=0
$$

If we just look at all the rational numbers, since they are just individual points with 0 measurement, their sum is going to be zero (regardless of its defined value in the function). For the irrationals, their sum is zero too. So the entire integral is zero.

However, when we swap the rationals and irrationals in the Dirichlet function. That is,

$$
\mathbf{1}_\mathbb{Q}(x) = 
\begin{cases}
1 \quad x \notin \mathbb{Q}\\
0 \quad x \in \mathbb{Q}
\end{cases}
$$

Noted that the rationals still evaluates to zero due to the zero measurement of a point as discussed above. What different is the irrationals. We all know the integral length of [0, 1] is one, and the fact that real numbers is a union of rational and irrational numbers (i.e. $\mathbb{R}=\text{rational}\ \cap\ \text{irrational}$). Thus, the integral must be 1 because the irrational set must be the complement that make up the rest of the interval.

Bizarre, I know.