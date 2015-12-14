Template.project.helpers({
  updates: function(){
    var id = Router.current().params._id;
    console.log(id);
    return Updates.find({projectId: id}, {sort: {date: -1}});
  }
});
