import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//Insert data into the database
var database = new Mongo.Collection("database"); // create new database with name `database`
//Meteor.subscribe('shopping'); // subscribe database
Tracker.autorun(function() {
  if (Meteor.user()) {
    Meteor.subscribe('shopping');
  }
});

var asteroids = [ { name: 'Moon', id: 1 }, { name: 'Venus', id: 2 }, { name: 'Saturn', id: 3 } ]

/*================main-route of site start=================*/
Router.configure({ // main template called
	layoutTemplate: 'ApplicationLayout'
});
Router.route('/', function(){ // home page template
	this.render('listshopping');
	}
);
Router.route('/allshoppinglist', function(){ // home page template
	this.render('allshoppinglist');
	}
);
Router.route('/layout', function(){ // layout page template
	this.render('layout');
	}
);
Router.route('/addnewshoppinglist', function(){ // add new shopping template
	this.render('addnewshoppinglist');
	}
);
Router.route('/shopping_list_details/:_id', function(){ // shopping list detail template
	var item = database.findOne({ _id: this.params._id });
	this.render('shopping_list_detail', {data:item});
	}
);
Router.route('/all_shopping_list_detail/:_id', function(){ // shopping list detail template
	var item = database.findOne({ _id: this.params._id });
	this.render('all_shopping_list_detail', {data:item});
	}
);
Router.route('/shopping_list_edit/:_id', function(){ // shopping list edit template
	var item = database.findOne({ _id: this.params._id });
	this.render('shopping_list_edit', {data:item});
	}
);
Router.route('/add_list_item/:_id', function(){ // add list item template
	this.render('add_list_item');
	}
);
Router.route('/add_stores/:_id', function(){ // add store template
	this.render('add_stores');
	}
);
Router.route('/edit_list_item/:_id', function(){ // edit list item template
	var item = database.findOne({ _id: this.params._id });
	this.render('edit_list_item', {data:item});
	}
);
Router.route('/shopping_mode/:_id', function(){ // edit list item template
	var item = database.findOne({ _id: this.params._id });
	this.render('shopping_mode', {data:item});
	}
);
Router.route('/old_shopping_mode/:_id', function(){ // edit list item template
	var item = database.findOne({ _id: this.params._id });
	this.render('old_shopping_mode', {data:item});
	}
);
/*================main-route of site end=================*/
	var date = new Date(); var day = date.getDate(); var month = date.getMonth(); // current date
    var year = date.getFullYear(); // current date
	if (month < 10) month = "0" + month; // current date
    if (day < 10) day = "0" + day; // current date
	var todays_date = day+"/"+month+"/"+year;
	
//set date picker in add shoppinglist
Template.addnewshoppinglist.rendered=function() { // SET DATE PICKER WITH FORMAT
	$('#current_date').val(todays_date);
	//$('#datepicker').datepicker({format: "dd/mm/yyyy"});
	var date = new Date();
	date.setDate(date.getDate());
	$('#datepicker').datepicker({ startDate: date, format: "dd/mm/yyyy" });
}
//set date picker in edit shoppinglist
Template.shopping_list_edit.rendered=function() { // SET DATE PICKER WITH FORMAT
	$('#current_date').val(todays_date);
	//$('#datepicker').datepicker({format: "dd/mm/yyyy"});
	var date = new Date();
	date.setDate(date.getDate());
	$('#datepicker').datepicker({ startDate: date, format: "dd/mm/yyyy" });
}

// shopping listing
Template.listshopping.helpers({
	items(){
		var currentUserId = Meteor.userId();
		var listshopping;
		var todays_date = new Date()
		database.find({ userid: currentUserId }).forEach(function(obj){
			var format = obj.shopping_date.split("/");
			var new_date = format[1]+"/"+format[0]+"/"+format[2];
			var shopping_date = new Date(new_date);
			shopping_date.setHours(0, 0, 0, 0); todays_date.setHours(0, 0, 0, 0);
			if(shopping_date >= todays_date){
			listshopping += '<tr>' +
								'<td><a href="./shopping_mode/' + obj._id + '" class="shopping_mode">'+obj.name+'</a></td><td>'+obj.current_date+'</td><td>'+obj.shopping_date+'</td><td>' +
								'<a href="./shopping_list_details/' + obj._id + '" class="btn btn-lg btn-danger">View</a>' +
								'&nbsp; <a href="./shopping_list_edit/' + obj._id + '" class="btn btn-lg btn-danger">Edit</a>'  +
								'&nbsp; <button type="button" value="' + obj._id + '" class="remove btn btn-lg btn-danger">Delete</button>' +
								'</td><td style="display:none;"><input type="hidden" value="'+obj._id+'" placeholder="ID" class="trueitemid"></td>' +
							'</tr>';
			}
		})
		return listshopping;
	},
	url(){
		return '<a href="./shopping_list_details/' + this._id + '" class="btn btn-lg btn-danger">View</a>' +
		'&nbsp; <a href="./shopping_list_edit/' + this._id + '" class="btn btn-lg btn-danger">Edit</a>'  +
		'&nbsp; <button type="button" value="' + this._id + '" class="remove btn btn-lg btn-danger">Delete</button>';
	},
	shopping(){
		return '<a href="./shopping_mode/' + this._id + '" class="shopping_mode">'+this.name+'</a>';
	},
});

// shopping listing
Template.allshoppinglist.helpers({
	items(){
		var currentUserId = Meteor.userId();
		var listshopping;
		var todays_date = new Date()
		database.find({ userid: currentUserId }).forEach(function(obj){
			var format = obj.shopping_date.split("/");
			var new_date = format[1]+"/"+format[0]+"/"+format[2];
			var shopping_date = new Date(new_date);
			shopping_date.setHours(0, 0, 0, 0); todays_date.setHours(0, 0, 0, 0);
			//if(shopping_date >= todays_date){
			listshopping += '<tr>';
								if(shopping_date >= todays_date){
			listshopping += 	'<td><a href="./shopping_mode/' + obj._id + '" class="shopping_mode">'+obj.name+'</a></td><td>'+obj.current_date+'</td><td>'+obj.shopping_date+'</td><td>';
								}else{
			listshopping += 	'<td><a href="./old_shopping_mode/' + obj._id + '" class="shopping_mode">'+obj.name+'</a></td><td>'+obj.current_date+'</td><td>'+obj.shopping_date+'</td><td>';					
								}
								if(shopping_date >= todays_date){
			listshopping += 	'<a href="./shopping_list_details/' + obj._id + '" class="btn btn-lg btn-danger">View</a>';
								}else{ //hitesh
			listshopping += 	'<a href="./all_shopping_list_detail/' + obj._id + '" class="btn btn-lg btn-danger">View</a>';
								}
								if(shopping_date >= todays_date){
			listshopping += 	'&nbsp; <a href="./shopping_list_edit/' + obj._id + '" class="btn btn-lg btn-danger">Edit</a>';
								}else{
			listshopping += 	'&nbsp; <a href="#" class="btn btn-lg btn-danger" disabled>Edit</a>';
								}
			listshopping += 	'&nbsp; <button type="button" value="' + obj._id + '" class="remove btn btn-lg btn-danger">Delete</button>' +
								'</td><td style="display:none;"><input type="hidden" value="'+obj._id+'" placeholder="ID" class="trueitemid"></td>' +
							'</tr>';
			//}
		})
		return listshopping;
	},
});

// shopping list details template
Template.shopping_list_detail.helpers({
	url(){
		return '<a href="/" alt="Go Back" class="btn btn-lg btn-danger">Go Back</a><span style="float:right"><a href="/add_stores/' + this._id + '" class="btn btn-lg btn-danger">Add Store</a>&nbsp<a href="/add_list_item/' + this._id + '" class="btn btn-lg btn-danger">Add List Item</a></span>';
	},
	action(){
		var path = window.location.pathname; var str = path.split("/"); var id = str[2];
		return '<a href="/edit_list_item/' + this._id + '" class="btn btn-lg btn-danger">Edit</a>&nbsp<button type="button" value="' + this._id + '" class="remove btn btn-lg btn-danger">Remove</button>';
	},
	list_items(){
		/*database.find({ category: this._id }).forEach(function(obj){
			if(obj.purchased == 'true'){ var checked = 'checked disabled'; }
		});*/
		return database.find({ category: this._id }).fetch();
	},
	total_amount(){
		var amount = this.amount; var expected_price = this.expected_price; var total_amount = amount * expected_price;
		return total_amount.toFixed(2);
	},
});

// all shopping list details template
Template.all_shopping_list_detail.helpers({
	url(){
		return '<a href="/allshoppinglist" alt="Go Back" class="btn btn-lg btn-danger">Go Back</a>';
	},
	list_items(){
		return database.find({ category: this._id }).fetch();
	},
});

// shopping mode template
Template.shopping_mode.helpers({
	url(){
		return '<a href="/" alt="Go Back" class="btn btn-lg btn-danger">Go Back</a>';
	},
	list_items(){
		/*database.find({ category: this._id }).forEach(function(obj){ $("#"+obj._id+"-1").removeClass('none'); })*/
		return database.find({ category: this._id }).fetch();
	},
	total_amount(){
		var amount = this.amount; var expected_price = this.expected_price; var total_amount = amount * expected_price;
		return total_amount.toFixed(2);
	},
});

// shopping mode checkbox
Template.shopping_mode.events({
	'click .selectID': function(event) {
		var checkbox = event.target.checked 
		if(checkbox == true){
			$("#"+this._id).parents("tr").addClass('true');
			$("#"+this._id).attr("disabled", true);
			$("#"+this._id+"-1").css("display", "block");
			database.update({  _id: this._id },
						 {  category: this.category, item_name: this.item_name, amount: this.amount, store_name: this.store_name, expected_price: this.expected_price,
							checked: '', chk: '', classes: 'block', purchased: checkbox });
		}else{
			$("#"+this._id).parents("tr").removeClass('true');
			database.update({  _id: this._id },
						 {  category: this.category,  item_name: this.item_name, amount: this.amount, store_name: this.store_name, expected_price: this.expected_price, 
						 checked: '', chk: '', classes: 'none', purchased: checkbox });
		}
	},
	'click .undo': function(event) {
		$("#"+this._id).removeAttr("disabled");
		$("#"+this._id).parents("tr").removeClass('true');
		$("#"+this._id).attr('checked', false);
		$("#"+this._id+"-1").css("display", "none");
		database.update({  _id: this._id },
						 {  category: this.category, item_name: this.item_name, amount: this.amount, store_name: this.store_name, expected_price: this.expected_price, //expected name
							checked: '', chk: '', classes: 'none', purchased: 'false' });
	},
})

// old shopping mode template
Template.old_shopping_mode.helpers({
	url(){
		return '<a href="/allshoppinglist" alt="Go Back" class="btn btn-lg btn-danger">Go Back</a>';
	},
	list_items(){
		return database.find({ category: this._id }).fetch();
	},
});

// edit list items template
Template.edit_list_item.helpers({
	stores(){
		var stores = '<select id="store_name" class="form-control">';
		var selected_store_name = this.store_name;
		database.find({ label: 'store_name' }).forEach(function(obj){
			if(selected_store_name == obj.store_name){ var selected = 'selected'; }
			stores += '<option value="'+obj.store_name+'" '+selected+'>'+obj.store_name+'</option>';
		})
		stores += '</select>';
		return stores;
	},
	back(){
		return '<a href="/shopping_list_details/' + this.category + '" style="float:right;" alt="Go Back" class="btn btn-lg btn-danger">Go Back</a>';
	},
	total_amount(){
		var amount = this.amount; var expected_price = this.expected_price; var total_amount = amount * expected_price;
		return total_amount;
	},
});

// edit item list Details
Template.edit_list_item.events({
	'submit form'(event, instance){
		event.preventDefault(); //this is to avoid submiting the form to a server
		var currentUserId = Meteor.userId(); // get current userid
		var category = event.target.category.value;
		database.update({  _id: event.target.trueitemid.value },
						 {  category: event.target.category.value, //shopping list id as category name
							item_name: event.target.item_name.value, //list name Eg. Banana
							amount: event.target.amount.value, //amount of shopping item
							store_name: event.target.store_name.value, //desier store name
							expected_price: event.target.expected_price.value //expected name 
						 });
		Router.go('/shopping_list_details/'+category); //redirect on particular category(shopping list) page
	},
	'keyup #expected_price': function(event) { 
		var expected_price = event.target.value;
		var quantity = $("#amount").val();
		if($.isNumeric($("#expected_price").val())){
			var total_amount = expected_price * quantity; $("#total_amount").val(total_amount);
		}else{
			$("#expected_price").val("");
			$("#expected_price").val(); $("#expected_price").attr("placeholder", "Please enter number only");
		}
	},
	'keyup #amount': function(event) { 
		var quantity = event.target.value;
		var expected_price = $("#expected_price").val();
		if($.isNumeric($("#amount").val())){
			var total_amount = expected_price * quantity; $("#total_amount").val(total_amount);
		}else{
			$("#amount").val("");
			$("#amount").attr("placeholder", "Please enter number only");
		}
	},
});

// add store name template
Template.add_stores.helpers({
	back(){
		var path = window.location.pathname; var str = path.split("/"); var id = str[2];
		return '<a href="/shopping_list_details/' + id + '" style="float:right;" alt="Go Back" class="btn btn-lg btn-danger">Go Back</a>';
	},
	remove(){
		return '<button type="button" value="' + this._id + '" class="remove btn btn-lg btn-danger">Remove</button>';
	},
	stores(){
		return database.find({ label: 'store_name' }).fetch();
	},
});

// add store detail
Template.add_stores.events({
	'submit form'(event, instance){
		event.preventDefault(); // this is to avoid submiting the form to a server
		var currentUserId = Meteor.userId(); // get current userid
		if(event.target.store_name.value == ""){ alert("Please fill Store Name"); return false; }
		database.insert({  
			label: "store_name",
			store_name: event.target.store_name.value
			//userid: currentUserId 
		});
	},
	'click .remove': function(event){
        var id = event.target.value;
		var remove_confirm = confirm("Are you sure you want to delete this Store?");
		if (remove_confirm) {
			database.remove( { _id: id } );
			var path = window.location.pathname; var str = path.split("/"); var id = str[2];
			Router.go('/add_stores/'+id); //only works in the presence of iron:router
		}
    }
});

// add list item template
Template.add_list_item.helpers({
	back(){
		var path = window.location.pathname; var str = path.split("/"); var id = str[2];
		return '<a href="/shopping_list_details/' + id + '" alt="Go Back" class="right btn btn-lg btn-danger">Go Back</a>';
	},
	stores(){
		return database.find({ label: 'store_name' }).fetch();
	},
});

// add list items
Template.add_list_item.events({
	'submit form'(event, instance){
		event.preventDefault(); // this is to avoid submiting the form to a server
		var currentUserId = Meteor.userId(); // get current userid
		if(event.target.item_name.value == ""){ alert("Please fill Item Name"); return false; }                //
		else if(event.target.amount.value == ""){ alert("Please fill Amount"); return false; }                 // validation blank fields
		else if(event.target.store_name.value == ""){ alert("Please fill Store Name"); return false; }         //
		else if(event.target.expected_price.value == ""){ alert("Please fill Expected Price"); return false; } //
		var path = window.location.pathname; var str = path.split("/"); var id = str[2];
		database.insert({  
			category: id, //shopping list id as category name
			item_name: event.target.item_name.value, //list name Eg. Banana
			amount: event.target.amount.value, //amount of shopping item
			store_name: event.target.store_name.value, //desier store name
			expected_price: event.target.expected_price.value //expected name
		});		
		Router.go('/shopping_list_details/'+id); //Redirected to the shopping list detail page using category id
	},
	'keyup #expected_price': function(event) { 
		var expected_price = event.target.value;
		var quantity = $("#amount").val();
		if($.isNumeric($("#expected_price").val())){
			var total_amount = expected_price * quantity; $("#total_amount").val(total_amount);
		}else{
			$("#expected_price").val("");
			$("#expected_price").val(); $("#expected_price").attr("placeholder", "Please enter number only");
		}
	},
	'keyup #amount': function(event) { 
		var quantity = event.target.value;
		var expected_price = $("#expected_price").val();
		if($.isNumeric($("#amount").val())){
			var total_amount = expected_price * quantity; $("#total_amount").val(total_amount);
		}else{
			$("#amount").val("");
			$("#amount").attr("placeholder", "Please enter number only");
		}
	},
});

// add list items
Template.shopping_list_detail.events({
	'click .remove': function(event){
        var list_id = event.target.value;
		var remove_confirm = confirm("Are you sure you want to delete this record?");
		var path = window.location.pathname; var str = path.split("/"); var id = str[2];
		if (remove_confirm) {
			database.remove( { _id: list_id } );
			var path = window.location.pathname; var str = path.split("/"); var id = str[2];
			Router.go('/shopping_list_details/'+id); //redirect on shopping list detail page
		}
    }
});

// remove shopping list 
Template.listshopping.events({
    'click .remove': function(event){
        var id = event.target.value;
		var remove_confirm = confirm("Are you sure you want to delete this record?");
		if (remove_confirm) {
			database.remove( { _id: id } );
			database.remove( { category: id } );
			Router.go('/'); //only works in the presence of iron:router
		}
    }
});

// remove all shopping list
Template.allshoppinglist.events({
    'click .remove': function(event){
        var id = event.target.value;
		var remove_confirm = confirm("Are you sure you want to delete this record?");
		if (remove_confirm) {
			database.remove( { _id: id } );
			database.remove( { category: id } );
			Router.go('/'); //only works in the presence of iron:router
		}
    }
});

// add shopping list details
Template.addnewshoppinglist.events({
	'submit form'(event, instance){
		event.preventDefault(); // this is to avoid submiting the form to a server
		var currentUserId = Meteor.userId(); // get current userid
		if(event.target.shopping_list_name.value == ""){ alert("Please fill Shopping List Name"); return false; } //validation for blank field
		else if(event.target.datepicker.value == ""){ alert("Please fill Shopping Date"); return false; } //validation for blank field		
		var date = new Date(); var day = date.getDate(); var month = date.getMonth()+1; var year = date.getFullYear(); 
		if (month < 10) month = "0" + month; if (day < 10) day = "0" + day; 
		var todays_date = day+"/"+month+"/"+year;
		database.insert({  
			name: event.target.shopping_list_name.value,
			current_date: todays_date,
			shopping_date: event.target.datepicker.value,
			userid: currentUserId 
		});
		Router.go('/'); //Redirected to the home url
	},
});

// edit shopping list Details
Template.shopping_list_edit.events({
	'submit form'(event, instance){
		event.preventDefault(); //this is to avoid submiting the form to a server
		var currentUserId = Meteor.userId(); // get current userid
		database.update({  _id: event.target.trueitemid.value },
						 { name: event.target.shopping_list_name.value,
						   current_date: event.target.old_create_date.value,
						   shopping_date: event.target.datepicker.value,
						   userid: currentUserId });
		Router.go('/'); //Redirected to the home url
	},
});