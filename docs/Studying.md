---
layout: page
title: Studying
permalink: /Studying/
---

### 2/18/26

- **8:15 AM – 11:04 AM**: PDE homework which mainly covered weak derivatives and more practice solving 1d wave equations
  - **Tags**
    - #homework
    - #pde

### 2/17/26

- **11:20 AM – 12:59 PM**: More asymptotics of rl
  - **Tags**
    - #research
  - **Notes**
    - Went over the convergence in the finite time case and discovered why the result holds for all discount factors there

- **10:55 AM – 11:20 AM**: Logic puzzle and integral
  - **Sources**
    - dailyintegral.com

- **9:15 AM – 9:45 AM**: Asymptotics in RL with NN
  - **Tags**
    - #research
    - #rl

- **7:57 AM – 8:57 AM**: Read more of high-dimensional probability by Vershnin. Did the first exercise in Chapter 2
  - **Tags**
    - #probability
    - #exercise
  - **Notes**
    - I got the lower bound with induction, upper bound using Markov's after logging, exponentiating
  - **Screenshots**
    - ![](/assets/study-journal/2026-02-17T14-59-15-638Z_6c4318_Screenshot_2026-02-17_at_8.59.12_AM.png)

### 2/16/26

- **7:30 AM – 9:00 AM**: Reviewed Asymptotics of RL paper and talked a bit with Gemini and NotebookLM
  - **Notes**
    - Mainly focused on overall proof flow. The trickiest step is the stochastic decomposition step where the martingale terms pop out.

- **9:30 AM – 11:00 AM**: Cleared Anki deck, roughly 250 cards.
  - **Notes**
    - Still struggling with colors, blues always give me a tough time

### 2/15/26

- **7:30 AM – 8:00 AM**: Relearned comparative advantage
  - **Sources**
    - https://en.wikipedia.org/wiki/Comparative_advantage
  - **Notes**
    - So the only reason this works is because of relative opportunity cost. Even if party A has an absolute advantage in efficiency over party B, paty A has an opportunity cost in choosing to spend time making something that they aren't **most** efficient at. Thus, they leave it to the scrubs to make that thing (even thought party A is better at it).

- **8:00 AM – 8:30 AM**: Continued learning transformers
  - **Sources**
    - Karpathy's tutorial on youtube
  - **Notes**
    - Biggest takeaway from this session was learning the difference between encoder and decoder, which he doesn't really explain until the end

- **8:28 AM – 9:13 AM**: Built this app, made some git repos and pushed changes

- **9:18 AM – 12:42 PM**: Continued studying Asymptotics of RL paper
  - **Sources**
    - https://arxiv.org/pdf/1911.07304
  - **Notes**
    - The measure for the weight distribution is frozen in time, but the solution still evolves in time. Roughly, the network is so wide that we're making tiny enough updates that the distribution doesn't change, but the accumulated changes over all weights is $$O(1)$$. The learning is driven from the kernel $$A$$ and the TD-error given from the environment. The network acts as like a fixed feature space instead of learning to represent new features.

