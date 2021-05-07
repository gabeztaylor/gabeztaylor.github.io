---
layout: page
title: Working
permalink: /working/
---

> "All models are wrong, but some are useful" - George E. P. Box

## Programming Languages

I work every day in Python (for work & school) and R (for school). I'm normally lucky enough to program outside of SAS. 

### Python - Advanced

Common libraries I use:

- `pandas` for data wrangling
- `numpy` for math operations 
- `scipy` for stats operations
- `sklearn` for lazy machine learning
- `Keras` for training neural nets
- `OpenCV` for computer vision
- `matplotlib` for plotting
- `seaborn` for prettier plotting
- `bokeh` for dashboards

### R - Advanced

Common libraries I use:

- `dplyr` for data wrangling
- `kableExtra` for sweet LATEX tables
- `ggplot2`for plotting
- `caret` for lazy machine learning
- `stringr` for string manipulation
- `shiny` for dashboards

### SAS - Intermediate

SAS gets a lot hate, and you know what, it deserves every bit. 


## MAGNet Project Summaries

Below, I summarize each of my three projects I have completed at my internship with State Farm. 

### Recalibration of Neural Networks (Spring 2021)

A few recent papers have demonstrated that artificial neural networks achieve very low error in classification tasks at the expense of a growing disparity between the predicted probabilities and the true confidence of the model. This semester, we attempted to implement recalibration techniques that appear to close the gap between predicted probabilities and the true confidence of the model without sacrificing the accuracy of the model, and even improving the accuracy in some cases. First, we examined two post hoc techniques: Temperature Scaling and Dirichlet Calibration, which apply simple transformations to the logits after the weights in the original model have been learned. Next, we explored Maximum Mean Calibration Error, which changes the actual objective function of the task, in effort to simultaneously optimize for both accuracy and calibration error during training. We implemented all of the methods from scratch through the custom layer and loss function APIs in the Keras library. In our small study, we found that the combination of MMCE and Dirichlet Calibration yielded the lowest calibration error and largest increase in accuracy. 


### Detection and Extraction of Feature Interactions (Fall 2020)

Over the course of the semester, my team and I successfully a developed tool in Python that automatically detects feature interactions for a given data set, and constructs new features that attempt to capture the detected interactions. Our tool is divided into two main parts: Detection and Extraction. Detection is only concerned with searching for pairwise feature interactions by calculating the Maximum Absolute Deviation between the observed Ripley’s K Estimates and Complete Spatial Randomness for every possible pair of features. Extraction attempts to define the region where an interaction occurs using the Hough Transform and contour searching algorithms, in order to construct an indicator function that will be included as a new feature.  Ultimately, we demonstrated that our tool can be implemented into any Data Scientist’s workflow and can detect the most likely feature interactions in minutes, even in the presence of hundreds of features. Through developing the tool, we had several triumphs including the discovery of the “White Tophat” morphological transformation which serves as a helpful preliminary supplement to our contour search by enhancing lower density regions. Applying the White Tophat transformation allows the user to capture multiple contours simultaneously, rather than iteratively searching for multiple contours.

### Automatic Refitting of Models (Summer 2020)

The purpose of this project is to investigate whether automatic refitting could provide any advantages over manual refitting. We define manual refitting as the process of building a model on a specified length of training data in order to make predictions for a given length of time into the future, where eventually the model will then be “manually” refit on new data. In contrast, we define automatic refitting as the practice of “automatically” refitting our model immediately upon acquiring new data in order to make predictions. For example, a “manually” refitted model may be refitted once every one to two years. Whereas an automatically refitted model could be refit every month, week, or even day. We used XGBoost on water coverage claims data for a binary classification task. As a result of underlying distributional shifts, automatic refitting detects the most recent drifts in the population, which results in a more accurate model compared to a manually refit model built on outdated data.  We support this claim through visualization given by a dynamic Bokeh Dashboard depicting the performance of our models iteratively built “over-time”. In the dashboard, the user can select the training and testing windows in order to view 95% bootstrapped confidence intervals of the c-stat at each testing point in the future. On a separate tab, the user can view a heat map of the p-values of Chi-Square Tests for selected predictors over a specified period of time to view the distributional data shift of many predictors at a time.

## Publication

Somehow I wrote a paper (along with a lot of help from people a lot smarter than me) about interpretable machine learning with implementations in SAS that got accpeted for the 2019 SAS global forum. If you really have nothing better to do, you can [read it here](https://www.sas.com/content/dam/SAS/support/en/sas-global-forum-proceedings/2020/5116-2020.pdf) and the accompanying E-poster that exposes my lack of design talent [here](https://drive.google.com/file/d/1yAAPK0YgsX-gb1ooGY5VBwnYg1Zt3Cpu/view?usp=sharing).  


