Meteor.publish("projects", function() {
    return Projects.find();
});

Meteor.publish("updates", function() {
    return Updates.find();
});
