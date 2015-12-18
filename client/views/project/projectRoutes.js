Router.route('/projects', function () {
  this.render('projects');
});

Router.route('/project/add', function () {
  this.render('projectAdd');
});

Router.route('/project/:_id', {
    waitOn: function() {
        return Meteor.subscribe('projects');
        return Meteor.subscribe('updates');
    },
    action: function() {
        if (this.ready()) {
            var params = this.params;
            var id = params._id;
            this.render('project', {
                data: function () {
                    return Projects.findOne({_id: id});
                }
            });
        }
    }
});

Router.route('/project/:_id/edit', {
    waitOn: function() {
        return Meteor.subscribe('projects');
    },
    action: function() {
        if (this.ready()) {
            var params = this.params;
            var id = params._id;
            this.render('projectEdit', {
                data: function () {
                    return Projects.findOne({_id: id});
                }
            });
        }
    }
});

Router.route('/project/:projectId/update/add', {
    waitOn: function() {
        return Meteor.subscribe('projects');
        return Meteor.subscribe('updates');
    },
    action: function() {
        if (this.ready()) {
            var params = this.params;
            var id = params.projectId;
            this.render('projectUpdateAdd');
        }
    }
});

Router.route('/project/:projectId/update/:_id', {
    waitOn: function() {
        return Meteor.subscribe('projects');
        return Meteor.subscribe('updates');
    },
    action: function() {
        if (this.ready()) {
            var params = this.params;
            var id = params._id;
            this.render('projectUpdate', {
                data: function () {
                    return Updates.findOne({_id: id});
                }
            });
        }
    }
});

Router.route('/project/:projectId/update/:_id/edit', {
    waitOn: function() {
        return Meteor.subscribe('projects');
        return Meteor.subscribe('updates');
    },
    action: function() {
        if (this.ready()) {
            var params = this.params;
            var id = params._id;
            this.render('projectUpdateEdit', {
                data: function () {
                    return Updates.findOne({_id: id});
                }
            });
        }
    }
});
