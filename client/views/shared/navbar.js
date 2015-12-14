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
