"use strict";

const assert = require("assert");
const gs = require("../src/grid_search");

function equalJson(actual, expected) {
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
}

describe('GridSearch', function () {
    describe('generated combinations', function () {
        it('simple test - 1 parameter', function () {

            let options = {
                params: {
                    a: [1, 2, 3]
                },
                run_callback: (comb) => { return null; }
            };
            let grid_search = new gs.GridSearch(options);

            equalJson(grid_search._combinations, [{ a: 1 }, { a: 2 }, { a: 3 }]);
            equalJson(grid_search._results, []);
        });
        it('simple test - 2 parameters', function () {

            let options = {
                params: {
                    a: [1, 2],
                    b: ["none", "tf"]
                },
                run_callback: (comb) => { return null; }
            };
            let grid_search = new gs.GridSearch(options);

            equalJson(grid_search._combinations, [
                { a: 1, b: "none" },
                { a: 1, b: "tf" },
                { a: 2, b: "none" },
                { a: 2, b: "tf" }
            ]);
            equalJson(grid_search._results, []);
        });
    });
    describe('run callback', function () {
        it('simple test - 1 parameter', function () {

            let calls = [];
            let options = {
                params: {
                    a: [1, 2, 3]
                },
                run_callback: (comb) => {
                    calls.push(comb);
                    return { cnt: calls.length + 7 }
                }
            };
            let grid_search = new gs.GridSearch(options);
            grid_search.run();

            equalJson(grid_search._combinations, [{ a: 1 }, { a: 2 }, { a: 3 }]);
            equalJson(grid_search._results, [
                { params: { a: 1 }, results: { cnt: 8 } },
                { params: { a: 2 }, results: { cnt: 9 } },
                { params: { a: 3 }, results: { cnt: 10 } }
            ]);

            let tab = grid_search.getTableOfResults(["a"], [], x => x.results.cnt);
            equalJson(tab.rows, [{}]);
            equalJson(tab.cols, [{ a: 1 }, { a: 2 }, { a: 3 }]);
            equalJson(tab.results, [[8, 9, 10]]);
        });
        it('simple test - 2 parameters', function () {

            let calls = [];
            let options = {
                params: {
                    a: [1, 2],
                    b: ["none", "tf"]
                },
                run_callback: (comb) => {
                    calls.push(comb);
                    return { cnt: calls.length + 7 }
                }
            };
            let grid_search = new gs.GridSearch(options);
            grid_search.run();

            equalJson(grid_search._combinations, [
                { a: 1, b: "none" },
                { a: 1, b: "tf" },
                { a: 2, b: "none" },
                { a: 2, b: "tf" }
            ]);
            equalJson(grid_search._results, [
                { params: { a: 1, b: "none" }, results: { cnt: 8 } },
                { params: { a: 1, b: "tf" }, results: { cnt: 9 } },
                { params: { a: 2, b: "none" }, results: { cnt: 10 } },
                { params: { a: 2, b: "tf" }, results: { cnt: 11 } }
            ]);

            let tab = grid_search.getTableOfResults(["a"], ["b"], x => x.results.cnt);
            equalJson(tab.rows, [{ b: "none" }, { b: "tf" }]);
            equalJson(tab.cols, [{ a: 1 }, { a: 2 }]);
            equalJson(tab.results, [[8, 10], [9, 11]]);

            tab = grid_search.getTableOfResults(["a", "b"], [], x => x.results.cnt);
            equalJson(tab.rows, [{}]);
            equalJson(tab.cols, [
                { a: 1, b: "none" },
                { a: 1, b: "tf" },
                { a: 2, b: "none" },
                { a: 2, b: "tf" }]
            );
            equalJson(tab.results, [[8, 9, 10, 11]]);
        });
        it('simple test - 3 parameters', function () {

            let calls = [];
            let options = {
                params: {
                    a: [1, 2],
                    b: ["none", "tf"],
                    c: [0, 100]
                },
                run_callback: (comb) => {
                    calls.push(comb);
                    return { cnt: calls.length + 7 }
                }
            };
            let grid_search = new gs.GridSearch(options);
            grid_search.run();

            equalJson(grid_search._combinations, [
                { a: 1, b: "none", c: 0 },
                { a: 1, b: "none", c: 100 },
                { a: 1, b: "tf", c: 0 },
                { a: 1, b: "tf", c: 100 },
                { a: 2, b: "none", c: 0 },
                { a: 2, b: "none", c: 100 },
                { a: 2, b: "tf", c: 0 },
                { a: 2, b: "tf", c: 100 }
            ]);
            equalJson(grid_search._results, [
                { params: { a: 1, b: "none", c: 0 }, results: { cnt: 8 } },
                { params: { a: 1, b: "none", c: 100 }, results: { cnt: 9 } },
                { params: { a: 1, b: "tf", c: 0 }, results: { cnt: 10 } },
                { params: { a: 1, b: "tf", c: 100 }, results: { cnt: 11 } },
                { params: { a: 2, b: "none", c: 0 }, results: { cnt: 12 } },
                { params: { a: 2, b: "none", c: 100 }, results: { cnt: 13 } },
                { params: { a: 2, b: "tf", c: 0 }, results: { cnt: 14 } },
                { params: { a: 2, b: "tf", c: 100 }, results: { cnt: 15 } }
            ]);

            // now try different outputs for table

            let tab = grid_search.getTableOfResults(["a"], ["b"], x => x.results.cnt);
            equalJson(tab.rows, [{ b: "none" }, { b: "tf" }]);
            equalJson(tab.cols, [{ a: 1 }, { a: 2 }]);
            equalJson(tab.results, [[9, 13], [11, 15]]);

            tab = grid_search.getTableOfResults(["a", "b"], [], x => x.results.cnt);
            equalJson(tab.rows, [{}]);
            equalJson(tab.cols, [
                { a: 1, b: "none" },
                { a: 1, b: "tf" },
                { a: 2, b: "none" },
                { a: 2, b: "tf" }]
            );
            equalJson(tab.results, [[9, 11, 13, 15]]);

            tab = grid_search.getTableOfResults(["a"], ["c"], x => x.results.cnt);
            equalJson(tab.rows, [{ c: 0 }, { c: 100 }]);
            equalJson(tab.cols, [{ a: 1 }, { a: 2 }]);
            equalJson(tab.results, [[10, 14], [11, 15]]);

            // the most complex output, all three parameters
            tab = grid_search.getTableOfResults(["a", "b"], ["c"], x => x.results.cnt);
            equalJson(tab.rows, [{ c: 0 }, { c: 100 }]);
            equalJson(tab.cols, [{ a: 1, b: "none" }, { a: 1, b: "tf" }, { a: 2, b: "none" }, { a: 2, b: "tf" }]);
            equalJson(tab.results, [[8, 10, 12, 14], [9, 11, 13, 15]]);

            //grid_search.displayTableOfResults(["a", "b"], ["c"], x => x.results.cnt);
        });
    });
    
    describe('Loading and saving', function () {
        it('simple test - 3 parameters', function () {

            let calls = [];
            let options = {
                params: {
                    a: [1, 2],
                    b: ["none", "tf"],
                    c: [0, 100]
                },
                run_callback: (comb) => {
                    calls.push(comb);
                    return { cnt: calls.length + 7 }
                }
            };
            let grid_search = new gs.GridSearch(options);
            grid_search.run();

            equalJson(grid_search._combinations, [
                { a: 1, b: "none", c: 0 },
                { a: 1, b: "none", c: 100 },
                { a: 1, b: "tf", c: 0 },
                { a: 1, b: "tf", c: 100 },
                { a: 2, b: "none", c: 0 },
                { a: 2, b: "none", c: 100 },
                { a: 2, b: "tf", c: 0 },
                { a: 2, b: "tf", c: 100 }
            ]);
            equalJson(grid_search._results, [
                { params: { a: 1, b: "none", c: 0 }, results: { cnt: 8 } },
                { params: { a: 1, b: "none", c: 100 }, results: { cnt: 9 } },
                { params: { a: 1, b: "tf", c: 0 }, results: { cnt: 10 } },
                { params: { a: 1, b: "tf", c: 100 }, results: { cnt: 11 } },
                { params: { a: 2, b: "none", c: 0 }, results: { cnt: 12 } },
                { params: { a: 2, b: "none", c: 100 }, results: { cnt: 13 } },
                { params: { a: 2, b: "tf", c: 0 }, results: { cnt: 14 } },
                { params: { a: 2, b: "tf", c: 100 }, results: { cnt: 15 } }
            ]);

            // now try different outputs for table

            let tab1 = grid_search.getTableOfResults(["a"], ["b"], x => x.results.cnt);
            grid_search.save("xx.tmp");
            
             let grid_search2 = new gs.GridSearch(options);
             grid_search2.load("xx.tmp");
             let tab2 = grid_search2.getTableOfResults(["a"], ["b"], x => x.results.cnt);
             equalJson(tab1, tab2);
        });
    });
});
