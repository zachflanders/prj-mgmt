

Template.projectAdd.events({
    "submit #projectAdd": function (event) {
      event.preventDefault();
      var projectNumber = event.target.projectNumber.value;
      var totalFee = event.target.totalFee.value;
      var bnimFee = event.target.bnimFee.value;
      var consultantFee = event.target.consultantFee.value;
      var formData = {
        projectNumber: projectNumber,
        projectName: projectName,
        totalFee: totalFee,
        bnimFee: bnimFee,
        consultantFee: consultantFee
      };
        console.log(formData);
        Meteor.call('addProject', formData, function(error, result){
          if(!error){
            Bert.alert(projectName + " was added.", "success", "growl-top-right");
          }
          else{
            Bert.alert("There was an error adding " + projectName, "danger", "growl-top-right");
          }
        });

        event.target.projectNumber.value = "";
        event.target.projectName.value="";

    }
  });
