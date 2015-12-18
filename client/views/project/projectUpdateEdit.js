Template.projectUpdateEdit.helpers({
  project: function(){
    var id = Router.current().params.projectId;
    var project = Projects.findOne({_id: id});
    return project.projectNumber + " - " + project.projectName;
  },
  projectId: function(){
    return Router.current().params.projectId;
  }
});

Template.projectUpdateEdit.events({
  "submit #projectUpdateEdit": function (event) {
    event.preventDefault();
    var id = Router.current().params._id;
    console.log(Router.current().params._id);
    var projectId = Router.current().params.projectId;
    var date = event.target.date.value;
    var directLabor = event.target.directLabor.value;
    var directExpense = event.target.directExpense.value;
    var directConsultant = event.target.directConsultant.value;
    var reimbursableExpense = event.target.reimbursableExpense.value;
    var reimbursableConsultant = event.target.reimbursableConsultant.value;

    var formData = {
      id: id,
      projectId: projectId,
      date: date,
      directLabor: directLabor,
      directExpense: directExpense,
      directConsultant: directConsultant,
      reimbursableExpense: reimbursableExpense,
      reimbursableConsultant: reimbursableConsultant
    };
      console.log(formData);
      Meteor.call('editUpdate', formData, function(error, result){
        if(!error){
          Bert.alert("Your update was edited.", "success", "growl-top-right");
        }
        else{
          Bert.alert("There was an error editing your update.", "danger", "growl-top-right");
        }
      });

    }
});
