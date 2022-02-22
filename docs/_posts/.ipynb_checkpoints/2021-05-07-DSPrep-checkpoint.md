---
layout: post
title: "Data Science Interview Prep"
date: 2021-05-07
mathjax: True
---

This is a document that I am actively editing and updating in effort to hold myself accountable in my preparation for my full-time interview this summer. More topics to come. 


## Statistics

### Bayesian Philosophy

From a non-technical perspective, Bayesians “update their beliefs based on new data”. It can be instructive to explain bayesian techniques in opposition to frequentist techniques. A bayesian probability reflects a subjective degree of belief, whereas a frequentist probability asserts objective long run frequency claims. For example, take the following 95% confidence interval interpretations for the mean number of claims filed in a week:

- F: If we were to construct a new 95% confidence interval every week for many weeks, our intervals would contain the true mean number of claims 95% of the time.

- B: We are 95% confident that the true mean is contained in our interval. 

An easy way to remember the distinction between Bayesian and Frequentist approaches is in the respective treatments of parameters. 

- F: Parameters are fixed, data is random

- B: Parameters are random, data is fixed

### Bayesian Framework

If we treat a parameter as random, we can construct a distribution in order to make inferences about the parameter. How can we obtain this distribution? The answer is via, unsurprisingly, Bayes Theorem. Suppose we’re interested in a parameter P. We require three items to construct a distribution for P:

- Prior Distribution: How do we think P is distributed before observing any data?
- Model (Likelihood): How would the data be distributed given our prior beliefs about P?
- Posterior Distribution: How is P distributed after observing data?


	It can be shown (not here) that the posterior is proportional to the product of the likelihood and the prior.

### Priors

> An important part of the bayesian process is choosing the prior. 


### Random Variables

Random variables will be very important for the following concepts. Larry Wasserman defines a random variable as a mapping from a sample space to real numbers. In other words, the function of a random variable is to assign a real number to all possible outcomes in a sample space, which means a random variable must be measurable. 
Consider the first two moves of a chess game. Let P be the number pawns the white player advances in the first two moves. The possible outcomes of P are 0, 1, 2. While our sample space consists of abstract chess pieces, our random variable P has mapped the pieces to real numbers that are measurable. 
Random variables can either be continuous or discrete. The random variable P described above is an example discrete random variable, while price of a stock is continuous. 

### Distribution Functions
	
> Distribution functions summarize the probabilistic information of a random variable realizing potential outcomes. 

#### Cumulative Distribution Functions

The cumulative distribution function describes the probability of a random variable being less than or equal to a possible outcome of that random variable. 
Example: What is the probability that the sum of claims for a given policy will cost less than $1000 in the next year?

#### Probability Mass Functions

If our random variable is discrete, then the probability mass function gives the probability of the random variable realizing an outcome for all possible outcomes. 
Example: What is the probability a given policy will have 1 or more claims in the next year?

#### Probability Density Functions

If our random variable is continuous, then through integrating the probability density function we can obtain the probability of a random variable being contained in some interval of possible outcomes. 
Example: What is the probability the sum of claims for a given policy will cost between $500 and $1000 in the next year?

### Expectation
The expectation is simply the average value of a random variable. 
What is the average cost of claims in the past year?

### Variance
The variance measures the spread of a distribution of a random variable. 
On average, How much do the claims vary from the average cost?

### Covariance & Correlation
The covariance measures the joint variance of two random variables. The normalized covariance, the correlation coefficient, can measure the strength of the linear relationship between two random variables. 
Example: Is there a strong relationship between credit score and claim history

## Maximum Likelihood Estimation

We often do not know the true parameters from an underlying distribution of observed data. One way we can estimate these parameters is through maximum likelihood estimation. We construct a function of the parameter(s) of interest called the likelihood function that is simply the joint density of the observed data. Note that this function is not a density function (it won’t integrate to 1). The value in our parameter space that maximizes this function is called the Maximum Likelihood Estimate. 

In parametric models, such as Linear and Logistic Regression, we can use maximum likelihood estimation to calculate the weights of our models. While we can analytically solve for the weights in Linear Regression, which turn out to be the same solution as OLS, we need an optimization algorithm to solve for the weights in Logistic Regression. 

## Hypothesis Testing

If we want to make specific claims about a parameter of interest, we can use hypothesis testing to support or refute our claims. The general structure of hypothesis testing is for a null hypothesis, which serves as the default claim, and an alternative hypothesis, which typically represents your claim about the parameter. For example, suppose you believe your friend as a weighted coin. The results from coin tosses can be described with a binomial distribution with parameters n and p. Your null hypothesis is that p = 0.5, and your alternative is that p does not equal 0.5. If you observe sufficient evidence (i.e your friend flips 70 heads out of 100) then you reject your null hypothesis.  

- Type I Error: The null is true, but you reject it
- Type II Error: The null is false, but you fail to reject it
- Size: The probability of committing a Type I Error 
- Power: The probability of correctly rejecting the null hypothesis

### P-value 
 - Informally: The evidence against the null
 - Formally: Given the null is true, what is the probability of observing a test statistic (from our data) that is the same or more extreme than what was actually observed. 

## Modeling

### R-Squared

$$1 - RSS/TSS$$

 - RSS: residual sum of squares (predicted values - true values) ^ 2
 - TSS: total sum of sqaures (true values - mean of values) ^ 2

### Multicollinearity

Can a feature in the design matrix be explained be other features? We can measure the magnitude of multicollinearity with VIF (variance inflation factor) 

$$VIF_j = 1 / (1 - (R_j)^2)$$

Where (R_j)^2 is the R-squared of a linear model with the predictor of interest as the target. 

**Exact collinearity does not change the predicted values when the linearly dependent term(s) is removed**

Remedies include

- Removing the collinear features
- Applying ridge regression to penalize the collinear features

### Bias/Variance Tradeoff 

For any prediction model, we can decompose the error into three parts:

1. Irreducible Error: Error that we will never be able predict or minimize
2. Bias: How much our model deviates from the true data on average
3. Variance: How sensitive our model is to deviations in the training set

Clearly, the optimal scenario is to minimize both Bias and Variance. However, there is often a tradeoff between the two, which means if you decrease the Bias in your model, you will increase the Variance of the model and vice versa. A few related terms to the Bias/Variance tradeoff are:

- Model complexity: One measure of model complexity is KNN. Higher model complexity typically results in low bias, but high variance. If you have a large model, you’re likely going to learn the training data really well, but probably not generalize well to new data. 

- Underfitting: High Bias, Low Variance. Your model is pretty bad on average, but it’s consistently bad.

- Overfitting: Low Bias, High Variance. Your model did really well on the training data, but not so hot on the testing data, and is unlikely to perform well on new unseen data. 

Let’s contextualize these terms with respect to linear regression. 

### Penalized Linear Regression

The Ordinary Least Squares estimators for linear regression is proven to result in unbiased estimators given by Gauss-Markov Theorem (with certain assumptions). Despite the guarantee of low bias, OLS estimators can result in very high variance when there are multiple correlated variables in a model (the coefficients will rapidly inflate). The idea of penalized linear regression is to introduce a little bias (penalize the size of the coefficients) to reduce the variance of the model. 

### Ridge Regression

Ridge regression accomplishes this penalty by squaring the coefficients (L2 penalty). The objective function is still to minimize the squared error, but now we have a penalty, which means if we want to achieve the same minimum as OLS, we will have to shrink the values of our coefficients since they are now included in the calculation. There is also a tuning parameter that can regulate the amount of shrinkage. If the tuning parameter is 0, then we retain the OLS solution. As the tuning parameter reaches infinity, our coefficients dive to 0, but never reach 0, which means that we will always retain the full model. Not invariant to scaling!

### LASSO

Lasso is similar to Ridge, except it imposes the absolute value of the coefficients (L1 penalty). The consequences of this distinction result in a form of variable selection because now the coefficients can be shrunk all the way to 0. 

### Generalized Linear Modeling

For many problems, the assumptions of linear regression are too restrictive. GLM’s allows us to relax some of these assumptions. For example,

| Linear Regression      | Generalized Linear Models |
| ----------- | ----------- |
| Relationship between Y and x is linear      | Relationship between Y and x does not have to be linear (more on this) |
| Errors are independent   | Errors are independent        |
|Errors are normally distributed | Errors do not need to be normally   distributed|
| Constant variance of errors | No need for constant variance |


The motivation for GLMs is that we can generalize linear regression by no longer imposing a direct linear relationship between Y and x. We can assume a link function that will transform the existing relationship to a linear relationship. More specifically, we assume Y comes from some family of exponential distribution, and the link function will define the relationship between x and the mean of the distribution of Y. For example, let’s take logistic regression.

### Logistic Regression

A linear model would be inappropriate here because we need values between 0 and 1. We assume that Y is binomial. Our proposed link function is the logit link function. Now, we have retained a linear relationship between the covariates and Y, but only through the logit link function. 

## Decision Trees

### Regression Trees

How to grow a regression tree:

	For j in splitting variables

     	For s in split points
        
          		Calculate average of the target in each split region and compute the sum of squares 

Choose the best pair j, s that minimize the sum of squares

### Classification Trees

The process for growing classification trees is the same for regression trees, except we change the criteria for node splitting. Options include misclassification error, gini index, or cross-entropy. We want to minimize the impurity.

#### Tuning 

Tree depth

#### Pruning
Pruning a decision tree is motivated by the tradeoff of tree size and goodness-of-fit. Essentially, some terminal nodes may be redundant or unhelpful. Hence, we can find a subset of the original tree that can curb overfitting. 

Pros:
Highly Interpretable 

Cons:
High propensity for overfitting (Solutions: bagging and boosting)

## Random Forest

Ensemble of weak decision trees. The weak learners are built from bootstrapped data sets with a subset of randomly selected predictors. Final decision is from a majority vote (Classification) or average of the individual trees (regression). 

## Boosting

Ensemble of weak decision trees. The weak learners are successively built on the errors of the residuals of the previous learner. 

### AdaBoost
Stump models. Uniquely weighted learners

### Gradient Boost
Full trees. Scaled the same.  