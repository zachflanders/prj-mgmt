


Template.projects.helpers({
  projects: function(){
    return Projects.find({}, {sort: {projectNumber: 1}});
  }
})
