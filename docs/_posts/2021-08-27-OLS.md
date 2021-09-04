---
layout: post
title: "No bullshit Simple Linear Regression OLS Estimates Derivation"
mathjax: true
comments: true
date: 2021-08-27
---

### Objective Function

$$ \min_{\beta_0, \beta_1} \text{RSS} = \sum_i^n (y_i - (\beta_0 + \beta_1x_i))^2$$

### Partial Derivatives

$$\frac{d\text{RSS}(\beta_0, \beta_1)}{d\beta_0} = -2 \sum_i^n (y_i - (\beta_0 + \beta_1x_i)) = 0$$ 

$$\frac{d\text{RSS}(\beta_0, \beta_1)}{d\beta_1} = -2 \sum_i^n x_i (y_i - (\beta_0 + \beta_1x_i)) = 0$$ 

Solving for $\beta_0$

Drop the constant

$$\sum_i^n (y_i - \beta_0 - \beta_1x_i) = 0$$

Move the components that depend on $i$ to the other side

$$ \sum_i^n\beta_0   = \sum_i^n y_i - \sum_i^n\beta_1x_i$$

$\beta_0$ is just a constant, so we will have it $n$ times

$$ n\beta_0   = \sum_i^n y_i - \sum_i^n\beta_1x_i$$

Dividing by $n$ yields the mean for $y$ and $x$

$$\hat \beta_0   = \bar y - \hat \beta_1 \bar x$$

Solving for $\beta_1$

$$ -2 \sum_i^n x_i (y_i - \beta_0 + \beta_1x_i) = 0$$ 

Drop the constant

$$ \sum_i^n x_i (y_i - (\beta_0 + \beta_1x_i)) = 0$$ 

Substitute solution for $\hat \beta_0$

$$ \sum_i^n x_i (y_i - \bar y - \hat \beta_1 \bar x -  \hat \beta_1x_i) = 0$$ 

Group terms

$$ \sum_i^n x_i ((y_i - \bar y) - \hat \beta_1 (x_i - \bar x )) = 0$$ 

Distribute $x_i$

$$ \sum_i^n x_i(y_i - \bar y) - \hat \beta_1 x_i(x_i - \bar x ) = 0$$ 

Move terms to right hand side

$$ \sum_i^n x_i(y_i - \bar y) = \sum_i^n \hat \beta_1 x_i(x_i - \bar x )$$ 

Solve for $\hat \beta_1$

$$ \hat \beta_1 = \frac{ \sum_i^n x_i(y_i - \bar y)}{ \sum_i^n  x_i(x_i - \bar x )}$$ 

Note that

$$\sum_i^n x_i(y_i - \bar y) = \sum_i^n (x_i - \bar x)(y_i - \bar y)$$

because

$$\sum_i^n \bar x(y_i - \bar y) = 0$$

So,

$$\sum_i^n (x_i - \bar x)(y_i - \bar y) = \sum_i^n  x_i(y_i - \bar y) -\sum_i^n \bar x(y_i - \bar y)$$

$$\sum_i^n (x_i - \bar x)(y_i - \bar y) = \sum_i^n  x_i(y_i - \bar y) - 0$$

$$\sum_i^n (x_i - \bar x)(y_i - \bar y) = \sum_i^n  x_i(y_i - \bar y)$$

Furthermore,

$$\sum_i^n  x_i(x_i - \bar x ) = \sum_i^n  (x_i - \bar x)^2$$

because 

$$\sum_i^n \bar x(x_i - \bar x) = 0$$

So,

$$\sum_i^n (x_i - \bar x)^2 = \sum_i^n  x_i(x_i - \bar x) -\sum_i^n \bar x(x_i - \bar x)$$

$$\sum_i^n (x_i - \bar x)^2 = \sum_i^n  x_i(x_i - \bar x) - 0$$

$$\sum_i^n (x_i - \bar x)^2 = \sum_i^n  x_i(x_i - \bar x)$$

Hence,

$$ \hat \beta_1 = \frac{ \sum_i^n x_i(y_i - \bar y)}{ \sum_i^n  x_i(x_i - \bar x )} = \frac{ \sum_i^n (x_i - \bar x)(y_i - \bar y)}{ \sum_i^n  (x_i - \bar x )^2}$$ 

 
