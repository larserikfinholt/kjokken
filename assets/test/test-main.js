var tests = [];
for (var file in window.__karma__.files) {
    if (/spec\.js$/.test(file)) {
        tests.push(file);
        console.log(file);
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/app',

    paths: {
        'jquery': '../Scripts/jquery-1.9.1',
        'knockout': '../Scripts/knockout-2.2.1',
        'underscore': '../Scripts/underscore'
    },

    shim: {
        'underscore': {
            exports: '_'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});