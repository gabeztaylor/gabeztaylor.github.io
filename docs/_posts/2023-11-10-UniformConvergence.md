---
layout: default
title: "A Gaussian Counterexample for the Uniform Convergence of Power Series"
mathjax: true
comments: true
date: 2023-11-10
published: true
---

Suppose that 

$$f(x) = \sum_{n=0}^{\infty} a_n x^n$$

converges with infinite radius of convergence. Moreover, suppose that 

$$\lim_{x \to \pm \infty} f(x) = L < \infty$$

Do the sequence of functions

$$f_n(x) = \sum_{k=0}^{n} a_k x^k$$

converge to $f(x)$ uniformly? No. Consider the counterexample:

$$e^{-x^2} = \sum_{n=0}^{\infty} \frac{(-1)^nx^{2n}}{n!}$$

Consider

$$
a_n = 
\begin{cases}
    \frac{(-1)^k}{k!}& \text{if $n = 2k$} \\
    0 & \text{if $n = 2k+1$}
\end{cases}
$$

Then,

$$\lim \sup |a_{n}|^{1/n} =\lim |a_{2k}|^{1/2k} = \lim \frac{1}{k!^{1/2k}} = 0$$

Thus, $\sum_{n=0}^{\infty} \frac{(-1)^nx^{2n}}{n!}$ has infinite radius of convergence. Moreover,

$$\lim_{x \to \pm \infty} e^{-x^2} = 0$$

However, if $f_n \to f$ uniformly, then 

$$\lim \sup\{|f_n(x) - f(x)| : x \in \mathbb{R}\} = 0$$

But any partial sum will be unbounded on $\mathbb{R}$. 

$$
\begin{aligned}
    &\sup \{|f_n(x) - f(x)| : x \in \mathbb{R}\}\\
    &= \sup \left \{\left |\sum_{k=0}^{n} \frac{(-1)^kx^{2k}}{k!} - e^{-x^2} \right | : x \in \mathbb{R} \right \} \\
    &= +\infty \quad x \to \infty \\
\end{aligned}    
$$

Thus, $f_n(x)$ does not converge uniformly to $f(x)$.