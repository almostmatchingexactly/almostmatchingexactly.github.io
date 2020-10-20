---
layout: default
title: Usage Guide
nav_order: 1
permalink: /software/dame-flame/usage
parent: DAME-FLAME Python Package
grand_parent: Software Packages
has_children: true
---

# Usage Guide
{: .no_toc }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## Required data format

The `DAME-FLAME` package requires input data to have specific format. The input data can be either a file, or a **Python Pandas Data Frame**. However, all covariates in the input data should be categorical covariates, represented as an *integer* data type. If there are continuous covariates, please consider regrouping. In addition to input data columns, the input data must contain (1) A column indicating the outcome variable as an *integer* or *float* data type, and (2) A column specifying whether a unit is treated or control (treated = 1, control = 0) as an *integer* data type. There are no requirements for input data column names or order of columns. Below is an example of input data with n units and m covariates.


*Column-name / unit-id*  | x_1 | x_2 |...| x_m | outcome | treated
--- | --- | --- | --- | --- | --- | --- |
**1** | 2 | 3 | ... | 4 | 9 | 0
**2** | 1 | 3 | ... | 3 | 5.5 | 1
**3** | 1 | 4 | ... | 5 | -1 | 0
... | ... | ... | ... | ... | ... | ...
**n** | 0 | 5 | ... | 0 | 1 | 1
*Data Type*| *integer* | *integer* | *integer* | *integer* |  *numeric* | *0 or 1* |

The holdout training set, if provided, should also follow the same format.


## Other requirements

1.  `DAME-FLAME` requires installation of python, specifically with at least python 3.* version. If your computer system does not have python 3.*, install from [here](https://www.python.org/downloads/).

2. Dependencies on the following packages: Pandas, Scikit learn, Numpy. If your python version does not have these packages, install from [here](https://packaging.python.org/tutorials/installing-packages/)

## Example

We run the DAME function with the following basic command. In this example, we provide only the basic inputs: (1) input data as a dataframe or file, (2) the name of the outcome column, and (3) the name of the treatment column.

In this example, because of the toy sized small dataset, we set the holdout dataset equal to the complete input dataset.

<div class="code-example" markdown="1">
```python
import pandas as pd
import dame_flame
df = pd.read_csv("dame_flame/data/sample.csv")
model = dame_flame.matching.DAME(repeats=False, verbose=1, early_stop_iterations=False)
model.fit(holdout_data=df)
result = model.predict(input_data=df)
print(result)
#>    x1   x2   x3   x4
#> 0   0   1    1    *     
#> 1   0   1    1    *     
#> 2   1   0    *    1     
#> 3   1   0    *    1     
print(model.groups_per_unit)
#> 0    1.0
#> 1    1.0
#> 2    1.0
#> 3    1.0
print(model.units_per_group)
#> [[2, 3], [0, 1]]
```
</div>

result is type **Data Frame**. The dataframe contains all of the units that were matched, and the covariates and corresponding values, that it was matched on. 
The covariates that each unit was not matched on is denoted with a " * " character.

model.groups_per_unit is a **Data Frame** with a column of unit weights which specifies the number of groups that each unit was placed in. 

model.units_per_group is a **list** in which each list is a main matched group, and the unit ids that belong to that group.

Additional values based on additional optional parameters can be retrieved, detailed in additional documentation below. 

To find the main matched group of a particular unit or group of units after DAME has been run, use the function *MG*:

<div class="code-example" markdown="1">
```python
mmg = dame_flame.utils.post_processing.MG(matching_object=model, unit_id=0)
print(mmg)
#>      x1    x2    x3    x4    treated    outcome
#> 0    0     1     1     *     0          5
#> 1    0     1     1     *     1          6
```
</div>

To find the conditional treatment effect (CATE) for the main matched group of a particular unit or group of units, use the function *CATE*:

<div class="code-example" markdown="1">
```python
te = dame_flame.utils.post_processing.CATE(matching_object=model, unit_id=0)
print(te)
#> 3.0
```
</div>

To find the average treatment effect (ATE) or average treatment effect on the treated (ATT), use the functions *ATE* and *ATT*, respectively:

<div class="code-example" markdown="1">
```python
ate = dame_flame.utils.post_processing.ATE(matching_object=model)
print(ate)
#> 2.0
att = dame_flame.utils.post_processing.MG(matching_object=model)
print(att)
#> 2.0
```
</div>