# SwissTaxEstimator

In an attempt to estimate the tax rate for swiss revenue, I
built a small web page that will take a user's input and 
estimate how much of his revenue will be owed to the government.

To do this, I obtained a [zip file](https://www.estv.admin.ch/estv/fr/accueil/impot-federal-direct/impot-a-la-source/baremes-cantonaux.html) 
of all rates for all cantons in Switzerland. Given the format 
of this document, I first created a formatter in Go, which 
generates a set of JSON files that I can access and control
using vanilla javascript. 

## How to use the estimator

- Download the necessary [*txt*](https://www.estv.admin.ch/estv/fr/accueil/impot-federal-direct/impot-a-la-source/baremes-cantonaux.html) 
  file, and put in */Formatter/rawData/* and change the year if necessary in *formatter.go*. I used and generated the
  data based on the data from 2021.
- Now, you should have the JSON data for each canton in
  */Formatter/jsonData/*
- Open */UI/index.html* on your favorite browser
