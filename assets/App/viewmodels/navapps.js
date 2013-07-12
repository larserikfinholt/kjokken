define(['durandal/app','services/logger'], function (app,logger) {



    var vm = {
        activate: activate,
        title: 'Nav apps View',
        apps: ko.observableArray([]),
        activeApp: ko.observable('All')
    };


    app.on("apps:loaded").then(function (apps) {

        logger.log('Apps loaded', apps, 'apps', true);
        vm.apps(apps);
    });

    return vm;

    //#region Internal Methods
    function activate() {
        logger.log('Nav apps Activated', null, 'apps', false);
        return true;
    }
    //#endregion
});