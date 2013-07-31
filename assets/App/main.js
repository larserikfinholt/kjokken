require.config({
    paths: {
        'text': 'durandal/amd/text',
        'jquery': '../Scripts/jquery-1.9.1',
        'knockout': '../Scripts/knockout-2.2.1',
        'underscore': '../Scripts/underscore'
    },
});

define(function(require) {
    var app = require('durandal/app'),
        viewLocator = require('durandal/viewLocator'),
        system = require('durandal/system'),
        router = require('durandal/plugins/router'),
        auth = require('services/auth');

    //This second set of requires is temporary, until we werite a custom mimosa module to handle it.
    require('durandal/messageBox')
    require('durandal/transitions/entrance')
    require('viewmodels/shell')
    require('viewmodels/home')
    require('viewmodels/calendar')
    require('viewmodels/settings')
    require('viewmodels/navapps')
    require('viewmodels/navusers')
    require('viewmodels/users')
    require('services/logger')
    require('services/auth')


    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    // Global auth for use with google
    window.auth = auth;


    app.title = 'Durandal Starter Kit';
    app.start().then(function () {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //configure routing
        router.useConvention();
        //router.mapNav('welcome');
        //router.mapNav('flickr');

        app.adaptToDevice();
        
        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});

window.handleGoogleLoaded = function (result) {
    debugger;
    console.log(result, app);

    gapi.auth.authorize({ client_id: 'clientId', scope: 'scopes', immediate: true }, function (res) {
        console.log(res);
    });
};