Meteor.methods({
    addProject: function(formData){
      Projects.insert({
        projectNumber: formData.projectNumber,
        projectName: formData.projectName,
        totalFee: formData.totalFee,
        bnimFee: formData.bnimFee,
        consultantFee: formData.consultantFee
      });
    },
    editProject: function(formData){
      Projects.update(formData.projectId, {
        projectNumber: formData.projectNumber,
        projectName: formData.projectName,
        totalFee: formData.totalFee,
        bnimFee: formData.bnimFee,
        consultantFee: formData.consultantFee
      });
    },
    deleteProject: function(id){
      Projects.remove({_id: id});
    },
    addUpdate: function(formData){
      Updates.insert({
        projectId: formData.projectId,
        date: formData.date,
        directLabor: formData.directLabor,
        directExpense: formData.directExpense,
        directConsultant: formData.directConsultant,
        reimbursableExpense: formData.reimbursableExpense,
        reimbursableConsultant: formData.reimbursableConsultant
      })
    }
});
