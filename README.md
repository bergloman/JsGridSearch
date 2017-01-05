# JsGridSearch

Simple mechanism for performing grid-search in node.js - parameter tuning for machine learning algorithms.

## Basic idea

This class creates simple plaforms for performing parameter tuning using [grid-search](https://en.wikipedia.org/wiki/Hyperparameter_optimization) - an exhaustive search over parameter space.

## Basic usage

### Run different parameters combinations

~~~~~~~~~~~~~~~javascript
let options = {
    params: {
        a: [1, 2],
        b: ["none", "tf"],
        c: [0, 100]
    },
    run_callback: (comb) => {
        // comb parameter contains one of the parameter combinations

        // here one would run his algorithm (using comb values)
        // and collect the result

        // return the result - shape and content don't matter
        return { some_metric: Math.random() };
    }
};
let grid_search = new gs.GridSearch(options);
grid_search.run();
~~~~~~~~~~~~~~~

### Display the result

Call methods `displayTableOfResults` or `getTableOfResults` to 
display heat-map of collected data.

User needs to provide callback that evaluates each result - e.g. from
the same set of results one can display heat-map for accuracy, recall, precision or F1 measure.

~~~~~~~~~~~~~~~~~~~javascript
grid_search.displayTableOfResults(
    ["a"], // columns
    ["b", "c"], // rows
    x => +(x.results.some_metric.toFixed(3)) // evaluation function
);
~~~~~~~~~~~~~~~~~~~

Result would look something like this:

~~~~~~~~~~~~~~~~~~~~
|                 | a=1     | a=2
|-----------------|---------|---------
| b=none,c=0      | 0.009   | 0.501
| b=none,c=100    | 0.872   | 0.088
| b=tf,c=0        | 0.3     | 0.733
| b=tf,c=100      | 0.672   | 0.663
~~~~~~~~~~~~~~~~~~~~

This ie easily copy-paste-able into `markdown`:

|                 | a=1     | a=2
|-----------------|---------|---------
| b=none,c=0      | 0.009   | 0.501
| b=none,c=100    | 0.872   | 0.088
| b=tf,c=0        | 0.3     | 0.733
| b=tf,c=100      | 0.672   | 0.663

