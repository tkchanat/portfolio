# Running Statistics
People often use running statistics in finance to model a never-ending sequence of data. I use it mostly for stochastic Monte Carlo simulation. 

## Welford's Algorithm

$$
\begin{align*}
\bar{x}_n
&= \frac{1}{n}\sum_{i=1}^n{x_i}
&
&= \frac{(n-1)\bar{x}_{n-1}+x_n}{n}\\
\sigma_n^2
&= \frac{1}{n}\sum_{i=1}^n{(x_i-\bar{x}_n)^2}
&
&= \frac{(n-1)\sigma_{n-1}^2+(x_n-\bar{x}_{n-1})(x_n-\bar{x}_n)}{n}\\
\end{align*}
$$

Precision proof version:

$$
\begin{align*}
\bar{x}_n
&= \bar{x}_{n-1} + \frac{x_n-\bar{x}_{n-1}}{n}\\
\sigma_n^2
&= \sigma_{n-1}^2 + \frac{(x_n-\bar{x}_{n-1})(x_n-\bar{x}_n) - \sigma_{n-1}^2}{n}\\
\end{align*}
$$

## Rust Example
```rs
use std::ops::{Add, Div, Mul, Sub};

#[derive(Default)]
struct WelfordOnlineStats<T> {
    pub mean: T,
    pub variance: T,
    pub count: usize,
}
impl<T> WelfordOnlineStats<T>
where
    T: Add<Output = T>
        + Sub<Output = T>
        + Mul<Output = T>
        + Div<f32, Output = T>
        + Copy
        + Clone,
{
    fn add(&mut self, value: T) {
        if self.count == 0 {
            self.mean = value;
            self.count += 1;
        } else {
            self.count += 1;
            let diff: T = value - self.mean;
            self.mean = self.mean + diff / self.count as f32;
            self.variance = self.variance
                + (diff * (value - self.mean) - self.variance) / (self.count - 1) as f32;
        }
    }
}
```