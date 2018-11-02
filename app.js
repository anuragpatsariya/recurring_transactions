"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var MongoClient = require('mongodb').MongoClient;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
var url = "mongodb://localhost:27017/";
// 1. Upsert Transactions
app.post("/upsert_transactions", function(req,res){
	console.log("Listening to API call");
	var data = req.body;
	var name = data.name;
	var trans_id = data.trans_id;
	var user_id = data.user_id;
	var amount = data.amount;
	var date = data.date;

	var obj = {name:data.name, trans_id:data.trans_id, user_id:data.user_id, amount:data.amount, date:data.date};

	MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		var dbo = db.db("interview_challenge");
  		//var myobj = { name: "Company Inc", address: "Highway 37" };
  		dbo.collection("transaction_history").insertOne(obj, function(err, res) {
    		if (err) throw err;
    		console.log("1 document inserted");
    		db.close();
  		});
	});


	res.send("Done\n");
});

function checkRecurring(){
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";
	var trans_set = new Set();
	var results = [];
	MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		var dbo = db.db("interview_challenge");
  		var history = dbo.collection("transaction_history");

  		history.find({}).forEach(function(row) { 
  			console.log(row);
  			results.push(row);
  		}, 
  		function(err) {
  			console.log("error");
  		});
  		/*history.find({}).toArray(function(err, result) {
    		if (err) throw err;
    		console.log("Getting all transactions");
    		//console.log(result);
    		results = result;
    		//trans_set.add
    		db.close();
  		});*/
	});
	console.log(results);
	
};




// 2. Get Recurring Transactions
app.get("/get_recurring_transactions", function(req,res){
	//console.log("Listening to API call");
	//checkRecurring();
	res.send(checkRecurring(err, results));
});


//listen to port 1984
app.set('port', process.env.PORT || 1984);
//app.listen(app.get('port'));
app.listen(app.get('port'), function () {
    console.log("Listening for incoming request on port 1984");
});