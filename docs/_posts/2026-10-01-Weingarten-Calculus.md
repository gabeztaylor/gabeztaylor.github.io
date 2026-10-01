---
layout: default
title: "The Weingarten Calculus"
subtitle: "Haar integration as a problem in invariant theory and finite-dimensional linear algebra."
description: "A derivation of the fundamental theorem of Weingarten calculus, followed by examples for the symmetric and unitary groups."
mathjax: true
comments: true
date: 2026-10-01
published: true
tags: [representation theory, random matrices]
---

This post is inspired by a presentation I gave last year on a topics course in Quantum Learning Theory. 

Weingarten calculus is a method for computing polynomial integrals over compact groups. Its central idea is surprisingly simple: averaging a unitary representation over Haar measure produces an orthogonal projection. Once we identify the range of that projection, integration becomes a finite-dimensional linear algebra problem.

We first prove the fundamental theorem, then work through the symmetric group with a toy example, and finally recover the familiar unitary Weingarten formula using Schur--Weyl duality.

## The setup

Let $G$ be a compact group with normalized Haar measure $dg$, and let $\mathcal{H}$ be an $N$-dimensional Hilbert space with orthonormal basis

$$
e_1,\ldots,e_N.
$$

Suppose

$$
U:G\longrightarrow \mathrm U(\mathcal{H})
$$

is a continuous unitary representation. For $a,b\in[N]$, write

$$
U_{ab}(g)=\langle e_a,U(g)e_b\rangle.
$$

Fix $d\in\mathbb N$ and two functions $i,j:[d]\to[N]$. We want to compute integrals of the form

$$
I_{ij}=\int_G\prod_{r=1}^d U_{i(r)j(r)}(g)\,dg.
$$

This looks to be quite a hairy integral. The main insight of Weingarten calculus is that it is really a problem about the $G$-invariant subspace of $\mathcal{H}^{\otimes d}$.

For a multi-index $i\in\operatorname{Fun}(d,N)$, define

$$
e_i=e_{i(1)}\otimes\cdots\otimes e_{i(d)}.
$$

Then the matrix coefficients of the tensor-power representation satisfy

$$
\begin{aligned}
U^{\otimes d}_{ij}(g)
&=\langle e_i,U^{\otimes d}(g)e_j\rangle\\
&=\prod_{r=1}^d\langle e_{i(r)},U(g)e_{j(r)}\rangle\\
&=\prod_{r=1}^d U_{i(r)j(r)}(g).
\end{aligned}
$$

Thus the product in the integrand is just a single matrix coefficient:

$$
I_{ij}=\int_G U^{\otimes d}_{ij}(g)\,dg.
$$

## Haar averaging is an orthogonal projection

Define the operator

$$
P=\int_G U^{\otimes d}(g)\,dg.
$$

The integral is well-defined because $G$ is compact and the representation is continuous. We claim that $P$ is the orthogonal projection onto

$$
(\mathcal{H}^{\otimes d})^G
=\{v\in\mathcal{H}^{\otimes d}:U^{\otimes d}(g)v=v\text{ for every }g\in G\}.
$$

First, $P$ is idempotent. By Fubini's theorem and invariance of Haar measure,

$$
\begin{aligned}
P^2
&=\int_G\int_G U^{\otimes d}(g)U^{\otimes d}(h)\,dg\,dh\\
&=\int_G\int_G U^{\otimes d}(gh)\,dg\,dh\\
&=\int_G P\,dh\\
&=P.
\end{aligned}
$$

Second, $P$ is self-adjoint. Since the representation is unitary,

$$
\begin{aligned}
P^*
&=\int_G U^{\otimes d}(g)^*\,dg\\
&=\int_G U^{\otimes d}(g^{-1})\,dg\\
&=P,
\end{aligned}
$$

where the final equality follows from invariance of Haar measure under inversion. Therefore $P$ is an orthogonal projection.

Now we find the range. For $h\in G$,

$$
U^{\otimes d}(h)P
=\int_G U^{\otimes d}(hg)\,dg
=P,
$$

so every vector in $\operatorname{im}(P)$ is fixed by $G$. Conversely, if $v$ is $G$-invariant, then

$$
Pv=\int_G U^{\otimes d}(g)v\,dg
=\int_G v\,dg
=v.
$$

Hence

$$
\operatorname{im}(P)=(\mathcal{H}^{\otimes d})^G.
$$

This illustrates the conceptual heart of the method: **Haar integration projects onto invariant tensors.**

## The fundamental theorem

Choose any basis $a_1,\ldots,a_m$ of $(\mathcal{H}^{\otimes d})^G$, and define the matrix

$$
\mathbf A=\big[\langle e_i,a_x\rangle\big]_{
i\in\operatorname{Fun}(d,N),\,x\in[m]}.
$$

The columns of $\mathbf A$ are the invariant basis vectors written in the tensor-product basis. Since these columns are linearly independent, their Gram matrix

$$
\mathbf G=\mathbf A^*\mathbf A
$$

is invertible. The orthogonal projection onto their span is

$$
P=\mathbf A(\mathbf A^*\mathbf A)^{-1}\mathbf A^*.
$$

The **Weingarten matrix** is defined by

$$
\mathbf W=(\mathbf A^*\mathbf A)^{-1}.
$$

Since $I_{ij}=P_{ij}$, taking matrix entries gives the fundamental formula

$$
\boxed{
I_{ij}=\sum_{x,y=1}^m
\mathbf A_{ix}\mathbf W_{xy}\mathbf A^*_{yj}
}.
$$

So every Weingarten calculation has the same recipe:

1. Linearize the integrand using a tensor-power representation.
2. Find a basis for the invariant subspace.
3. Compute the Gram matrix of that basis.
4. Invert the Gram matrix and read off the desired projection entry.

## A toy example: the symmetric group

Let $G=S_N$ act on $\mathcal{H}=\mathbb C^N$ by permuting the standard basis:

$$
U(\sigma)e_x=e_{\sigma(x)}.
$$

Haar integration is now normalized counting measure, so

$$
I_{ij}
=\frac{1}{N!}\sum_{\sigma\in S_N}
\prod_{r=1}^d U_{i(r)j(r)}(\sigma).
$$

The action of $S_N$ on a function $i:[d]\to[N]$ can rename the values of $i$, but it cannot change which arguments share the same value. This motivates the equivalence relation

$$
r\sim_i s\quad\Longleftrightarrow\quad i(r)=i(s).
$$

The equivalence classes form a set partition of $[d]$, which we call $\operatorname{type}(i)$. For example, $(1,1,2)$ and $(4,4,7)$ have the same type, while $(1,2,1)$ and $(1,2,3)$ do not.

For a set partition $\lambda$ of $[d]$ with at most $N$ blocks, define the orbit sum

$$
a_\lambda
=\sum_{\substack{i\in\operatorname{Fun}(d,N)\\
\operatorname{type}(i)=\lambda}}e_i.
$$

These orbit sums form a basis for $(\mathcal{H}^{\otimes d})^{S_N}$. Distinct orbit sums have disjoint support, so they are orthogonal. If $\lambda$ has $k$ blocks, then assigning distinct labels from $[N]$ to those blocks gives

$$
\langle a_\lambda,a_\lambda\rangle
=(N)_k
=N(N-1)\cdots(N-k+1).
$$

Thus the Gram matrix and its inverse are diagonal:

$$
\mathbf G_{\lambda\mu}
=\delta_{\lambda\mu}(N)_{|\lambda|},
\qquad
\mathbf W_{\lambda\mu}
=\frac{\delta_{\lambda\mu}}{(N)_{|\lambda|}}.
$$

Moreover,

$$
\mathbf A_{i\lambda}
=\langle e_i,a_\lambda\rangle
=\mathbf 1\{\operatorname{type}(i)=\lambda\}.
$$

Substitution into the fundamental theorem yields

$$
\boxed{
I_{ij}
=\frac{\mathbf 1\{\operatorname{type}(i)=\operatorname{type}(j)\}}
{(N)_{|\operatorname{type}(i)|}}
}.
$$

This answer also has a direct probabilistic interpretation, which I'm always looking for. A permutation can carry $j$ to $i$ exactly when $i$ and $j$ have the same collision pattern. If their common type has $k$ blocks, a uniformly random permutation realizes the required matching with probability $1/(N)_k$.

## The unitary group

Now take $G=\mathrm U(N)$ with its defining representation on $\mathcal{H}=\mathbb C^N$. The center of $\mathrm U(N)$ acts on $\mathcal{H}^{\otimes d}$ by a nontrivial scalar when $d\geq1$, so this tensor power has no invariant vectors. To obtain nonzero moments, we pair entries of $U$ with entries of its complex conjugate and study integrals of the form

$$
\int_{\mathrm U(N)}
\prod_{r=1}^d U_{i_rj_r}(U)
\prod_{r=1}^d \overline{U_{i'_rj'_r}(U)}\,dU.
$$

These products arise as matrix coefficients of the conjugation representation on $\operatorname{End}(\mathcal{H}^{\otimes d})$. Its invariant subspace is the commutant

$$
\operatorname{End}_{\mathrm U(N)}(\mathcal{H}^{\otimes d})
=\{T:T U^{\otimes d}=U^{\otimes d}T
\text{ for every }U\in\mathrm U(N)\}.
$$

Schur--Weyl duality identifies this commutant with the span of the permutation operators

$$
A_\sigma(v_1\otimes\cdots\otimes v_d)
=v_{\sigma^{-1}(1)}\otimes\cdots\otimes v_{\sigma^{-1}(d)},
\qquad \sigma\in S_d.
$$

The Hilbert--Schmidt Gram matrix of these operators has a particularly nice form:

$$
\begin{aligned}
\langle A_\rho,A_\sigma\rangle
&=\operatorname{Tr}(A_\rho^*A_\sigma)\\
&=\operatorname{Tr}(A_{\rho^{-1}\sigma})\\
&=N^{\#\operatorname{cycles}(\rho^{-1}\sigma)}.
\end{aligned}
$$

Therefore

$$
\mathbf G
=\left[N^{\#\operatorname{cycles}(\rho^{-1}\sigma)}
\right]_{\rho,\sigma\in S_d}.
$$

When $N\geq d$, the permutation operators are linearly independent and the unitary Weingarten matrix is simply $\mathbf G^{-1}$. When $N<d$, they are dependent; one may either choose an independent basis for the commutant or use the corresponding Moore--Penrose inverse.

Because $\mathbf G_{\rho\sigma}$ depends only on $\rho^{-1}\sigma$, its inverse does as well. We write

$$
\mathbf W_{\rho\sigma}
=\operatorname{Wg}_N(\rho^{-1}\sigma).
$$

In terms of irreducible characters of $S_d$,

$$
\boxed{
\operatorname{Wg}_N(\pi)
=\frac{1}{d!}
\sum_{\substack{\lambda\vdash d\\\ell(\lambda)\leq N}}
\frac{f^\lambda\chi^\lambda(\pi)}
{\displaystyle\prod_{\square\in\lambda}(N+c(\square))}
}.
$$

Here $f^\lambda$ is the dimension of the irreducible $S_d$-module indexed by $\lambda$, $\chi^\lambda$ is its character, and $c(\square)$ is the content of a box in the Young diagram of $\lambda$.

Finally, for multi-indices $\mathbf i,\mathbf j,\mathbf i',\mathbf j'\in[N]^d$, the unitary moment formula is

$$
\boxed{
\begin{aligned}
&\int_{\mathrm U(N)}
\prod_{r=1}^d U_{i_rj_r}(U)
\prod_{r=1}^d \overline{U_{i'_rj'_r}(U)}\,dU\\
&\qquad=
\sum_{\rho,\sigma\in S_d}
\left(\prod_{r=1}^d\delta_{i_r,i'_{\rho(r)}}\right)
\left(\prod_{r=1}^d\delta_{j_r,j'_{\sigma(r)}}\right)
\operatorname{Wg}_N(\rho^{-1}\sigma).
\end{aligned}
}.
$$

## Two small unitary moments

For $d=1$, the Gram matrix is $[N]$, so $\operatorname{Wg}_N(e)=1/N$. We recover the familiar identity

$$
\int_{\mathrm U(N)}U_{ij}\overline{U_{i'j'}}\,dU
=\frac{1}{N}\delta_{ii'}\delta_{jj'}.
$$

For $d=2$ and $N\geq2$, the two Weingarten values are

$$
\operatorname{Wg}_N(e)=\frac{1}{N^2-1},
\qquad
\operatorname{Wg}_N((12))=-\frac{1}{N(N^2-1)}.
$$

Every fourth-order moment of Haar unitary entries is obtained by combining these two numbers with the Kronecker-delta matchings in the boxed formula above.

## The big picture

Weingarten calculus separates a difficult looking integral into two tasks:

1. **Invariant theory:** determine the tensors or operators fixed by the group action.
2. **Linear algebra:** compute and invert their Gram matrix.

For $S_N$, the invariant basis is indexed by set partitions and the Gram matrix is diagonal. For $\mathrm U(N)$, Schur--Weyl duality supplies permutation operators, and the inverse Gram matrix is governed by the character theory of $S_d$. In both cases, the integral itself is just an entry of an orthogonal projection.

## Further reading

- Benoît Collins and Piotr Śniady, [*Integration with Respect to the Haar Measure on Unitary, Orthogonal and Symplectic Group*](https://arxiv.org/abs/math-ph/0402073).
- Benoît Collins, [*Moments and Cumulants of Polynomial Random Variables on Unitary Groups, the Itzykson--Zuber Integral, and Free Probability*](https://arxiv.org/abs/math-ph/0205010).
