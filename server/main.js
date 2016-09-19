import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

var database = new Mongo.Collection("database");

Meteor.publish('shopping',
	function(){
		var currentUserId = this.userId;
		return astroids.find({ userid : currentUserId });
	}
);