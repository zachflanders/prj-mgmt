

Template.projectUpdateAdd.helpers({
  project: function(){
    var id = Router.current().params.projectId;
    var project = Projects.findOne({_id: id});
    return project.projectNumber + " - " + project.projectName;
  }
});

Template.projectUpdateAdd.events({
  "submit #projectUpdate": function (event) {
    event.preventDefault();
    var projectId = Router.current().params.projectId;
    var date = event.target.date.value;
    var directLabor = event.target.directLabor.value;
    var directExpense = event.target.directExpense.value;
    var directConsultant = event.target.directConsultant.value;
    var reimbursableExpense = event.target.reimbursableExpense.value;
    var reimbursableConsultant = event.target.reimbursableConsultant.value;

    var formData = {
      projectId: projectId,
      date: date,
      directLabor: directLabor,
      directExpense: directExpense,
      directConsultant: directConsultant,
      reimbursableExpense: reimbursableExpense,
      reimbursableConsultant: reimbursableConsultant
    };
      console.log(formData);
      Meteor.call('addUpdate', formData, function(error, result){
        if(!error){
          Bert.alert("Your update was added.", "success", "growl-top-right");
        }
        else{
          Bert.alert("There was an error adding your update.", "danger", "growl-top-right");
        }
      });

      event.target.date.value ="";
      event.target.directLabor.value="";
      event.target.directExpense.value="";
      event.target.directConsultant.value="";
      event.target.reimbursableExpense.value="";
      event.target.reimbursableConsultant.value="";



  }

})
