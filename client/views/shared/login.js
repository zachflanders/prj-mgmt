Template.login.events({
  'click .btn-create-account': function() {
    return Session.set('createOrSignIn', 'create');
  },
  'click .btn-sign-in': function() {
    return Session.set('createOrSignIn', 'signin');
  },
  'submit form': function(e) {
    return e.preventDefault();
  }
});

Template.login.rendered = function() {
  return $('#login-form').validate({
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    messages: {
      emailAddress: {
        required: "Please fill our the email field.",
        email: "Invalid email. Please provide a different email."
      },
      password: {
        required: "Please provide a password."
      }
    },
    submitHandler: function() {
      var createOrSignIn, user;
      createOrSignIn = Session.get('createOrSignIn');
      user = {
        email: $('[name="emailAddress"]').val(),
        password: $('[name="password"]').val()
      };
      if (createOrSignIn === "create") {
              return Accounts.createUser(user, function(error) {
                if (error) {
                  return Bert.alert(error.reason, 'danger','growl-top-right');
                } else {
                  return $('#login').modal('hide');
                }
              });
      } else {
        return Meteor.loginWithPassword(user.email, user.password, function(error) {
          if (error) {
            return Bert.alert(error.reason, 'danger','growl-top-right');
          } else {
            return $('#login').modal('hide') && Router.go('/dashboard');
          }
        });
      }
    }
  });
};
