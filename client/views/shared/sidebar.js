Template.sidebar.helpers({
  isActive: function(route){
    if(route == Router.current().route.getName()){
      return 'active';
    }
  }
})
