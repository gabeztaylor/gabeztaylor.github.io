---
layout: post
title: "How Sure Are You?"
comments: true
date: 2022-02-06
---

A friend of mine and I made an R Shiny App that makes the calibration quiz in Chapter 6 of Julia Galef's 'Scout Mindset' slightly more accessible. You can access it [here](https://gabrieltaylor.shinyapps.io/Calibration/?_ga=2.56086636.631607110.1644073854-1888315552.1644073854).

![ ](/pics/calquiz.png)

Essentially, a well-calibrated individual makes claims exactly consistent with their confidence. For example, if I say *"I'm 95% sure Khabib Nurmagomedov would beat Conor McGregor again"*, then I should be right about 95% of the time for similar 95% confident predictions. Let's say I make 100 of these claims:

    1. I'm 95% sure Khabib Nurmagomedov would beat Conor McGregor again

    2. I'm 95% sure Donald Cerrone would beat Al Iaquinta

    ...

    100. I'm 95% sure Kamaru Usman would beat Georges St. Pierre

If were a perfectly calibrated human, only 5 of these predictions would be false, if realized. 

The app we created allows you to test your own calibration by asking you to select not only your answer to each question, but also you associated confidence of each answer. There are only five options for simplicity. For example, of the questions you selected 55% confidence, you should get 55% of those answers correct, and for 95% confidence you should get 95% of those questions correct. 