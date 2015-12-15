Template.navbar.events({
  "click .logout": function(){
    Meteor.logout(function(error){
      if(!error){
        Bert.alert('You are logged out.', 'info', 'growl-top-right');
      }
    });

    Router.go('/');
  }
});

Template.navbar.helpers({
  email: function(){
    return Meteor.user().emails[0].address;
  }
})
