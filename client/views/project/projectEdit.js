

Template.projectEdit.events({
    "submit #projectEdit": function (event) {
        event.preventDefault();
        var projectId = this._id;
        var projectNumber = event.target.projectNumber.value;
        var projectName = event.target.projectName.value;
        var totalFee = event.target.totalFee.value;
        var bnimFee = event.target.bnimFee.value;
        var consultantFee = event.target.consultantFee.value;
        var formData = {
          projectId: projectId,
          projectNumber: projectNumber,
          projectName: projectName,
          totalFee: totalFee,
          bnimFee: bnimFee,
          consultantFee: consultantFee
        };

        Meteor.call('editProject', formData, function(error, result){
          if(!error){
            Bert.alert(projectName + " was updated.", "success", "growl-top-right");
          }
          else{
            Bert.alert("There was an error updating " + projectName, "danger", "growl-top-right");
          }

        });

    },
    "click .delete": function(){
      console.log('delete');
      Meteor.call('deleteProject', this._id, function(error, result){
        if(!error){
          Bert.alert("Project was deleted.", "danger", "growl-top-right");
          Router.go('/projects');
        }
        else{
          Bert.alert("There was an error deleteing this project", "danger", "growl-top-right");
        }
      });
    }

  });
