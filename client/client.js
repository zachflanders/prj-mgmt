Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function() {
  if (! Meteor.userId()) {
    this.layout('layout');
    this.render('home');
  }
  else {
    this.layout(Router.lookupLayoutTemplate());
    this.next();
  }
});



UI.registerHelper('formatCurrency', function(item) {
  return accounting.formatMoney(item);
});
