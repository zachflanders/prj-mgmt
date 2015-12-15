Template.projectUpdate.helpers({
  project: function(){
    var id = Router.current().params.projectId;
    var project = Projects.findOne({_id: id});
    return project.projectNumber + " - " + project.projectName;
  },
  projectId: function(){
    return Router.current().params.projectId;
  }
});
