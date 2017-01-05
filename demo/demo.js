"use strict";

const gs = require("../src/grid_search");

let options = {
    params: {
        a: [1, 2],
        b: ["none", "tf"],
        c: [0, 100]
    },
    run_callback: (comb) => {
        // here one would run his algorithm and collect the result

        // return the result - shape and content don't matter
        return { some_metric: Math.random() };
    }
};
let grid_search = new gs.GridSearch(options);
grid_search.run();
grid_search.displayTableOfResults(
    ["a"],
    ["b", "c"],
    x => +(x.results.some_metric.toFixed(3))   // this callback needs to return single number for each result
);

