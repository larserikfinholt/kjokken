define(['durandal/system', 'services/logger', 'durandal/app', 'services/data', 'durandal/plugins/router'],
    function (system, logger, app, data, router) {
    var vm = {
        settings: ko.observable(),
        title: 'Settings',
        loadComplete: false,
        wizard: ko.observable(''),

        editUser: function (user) {
            app.showModal('viewmodels/users', user).then(function (result) {
                if (result) {
                    log("User edited: ", result.user);
                }
            });

        },
        newUser: function () {
            var self = this;
            var emptyUser = { id: "", calendar:ko.observable(""), name:ko.observable("") };
            app.showModal('viewmodels/users',emptyUser).then(function (result) {
                self.settings.users.push(result.user);

            });
        },
        saveSettings: function() {
            var toSave = ko.mapping.toJS(this.settings);
            data.saveSettings(toSave).done(function () {
                log("settings saved", toSave);
                app.trigger("settings:loaded", toSave);
                router.navigateTo("#/calendar");
            });
        },

        isValid: function () {
            if (!(this.settings && this.settings.familyName)) {
                log("Setting validation failed - missing familyName");
                return false;
            }
            if (!(this.settings && this.settings.familyCalendar)) {
                log("Setting validation failed - missing family calendar");
                return false;
            }
            if (!(this.settings && this.settings.users && this.settings.users().length > 0)) {
                log("Setting validation failed - not enough users", this.settings );
                return false;
            }
            return true;


        },
        canActivate: function() {
            return this.loadComplete;
        },
        activate: function (context) {
            var self = this;
            log("activate settings", context);
            if (!self.loadComplete) {
                log("Not ready to do databiding");
                return false;
            }
            return true;
        },


        
    };


    app.on("authentication:success", function (authResult) {

        data.loadSettings(function (s) {
            log("Settings loaded", s);
            vm.settings = ko.mapping.fromJS(s);
            vm.loadComplete = true;
            if (vm.isValid()) {
                app.trigger("settings:loaded", s);
                router.navigateTo("#/calendar");

            } else {
                router.navigateTo("#/settings");
            }
        });

        
    });


    return vm;


    function log(msg, data, showToast) {
        logger.log(msg, data, system.getModuleId(vm), showToast);
    }

});