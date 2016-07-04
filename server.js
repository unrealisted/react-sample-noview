var express = require('express'),
	app = express(),
	port = process.env.PORT || 8080;

var Base = require("./dbconnect");



var router = express.Router(); 

app.use(express.static(__dirname + '/src'));


router.route('/smartphones').get(function(req, res){
	res.sendFile(__dirname + '/src/listItems.html');
});

router.route('/smartphones/:_id').get(function(req, res){
	res.sendFile(__dirname + '/src/item.html');
});


router.route('/mobilephones').get(function(req, res){
	res.sendFile(__dirname + '/src/listItems.html');
});

router.route('/mobilephones/:_id').get(function(req, res){
	res.sendFile(__dirname + '/src/item.html');
});


router.route('/radiophones').get(function(req, res){
	res.sendFile(__dirname + '/src/listItems.html');
});

router.route('/radiophones/:_id').get(function(req, res){
	res.sendFile(__dirname + '/src/item.html');
});


router.route('/smartwatches').get(function(req, res){
	res.sendFile(__dirname + '/src/listItems.html');
});

router.route('/smartwatches/:_id').get(function(req, res){
	res.sendFile(__dirname + '/src/item.html');
});







router.route('/api/categories').get(function(req, res) {
	Base.aggregate([
	    { $unwind : "$yml_catalog.shop.categories.category"},
	    { $project : { _id : 0, "yml_catalog.shop.categories.category" : 1}}
	], function(err, result){
		if (err)
            res.send(err);
        res.json({categories : result});
	});
});

// 1168060  - smartphones category  1133677 - mobilephones 1133679 - radiophones  1171797 - smartwatches
router.route('/api/smartphones').get(function(req, res){
	var vendor = req.query.vendor !== undefined ? req.query.vendor : {$ne : ""};
	var color = req.query.color !== undefined ? req.query.color : {$ne : ""};
	var country = req.query.country !== undefined ? req.query.country : {$ne : ""};
	var page = req.query.page !== undefined ? req.query.page : 1;
	Base.aggregate([
	    { $unwind : "$yml_catalog.shop.offers.offer"},
	    { $match : {
	    			$and:[
	    					{"yml_catalog.shop.offers.offer.categoryId" : "1168060"},
	    					{"yml_catalog.shop.offers.offer.vendor" : vendor},
	    					{"yml_catalog.shop.offers.offer.param.__text" : color},
	    					{"yml_catalog.shop.offers.offer.param.__text" : country}
	    				]}},
	    { $project : { _id : 0, "yml_catalog.shop.offers.offer" : 1}}
	], function(err, result){
		if (err)
            res.send(err);
        res.json({data : result, page: page});
	});
});


//Get smartphone by id
router.route('/api/smartphones/:_id').get(function(req, res){
	Base.aggregate([
	    { $unwind : "$yml_catalog.shop.offers.offer"},
	    { $match : {
	    			$and:[
	    					{"yml_catalog.shop.offers.offer.categoryId" : "1168060"},
	    					{"yml_catalog.shop.offers.offer._id" : req.params._id}
	    				]}},
	    { $project : { _id : 0, "yml_catalog.shop.offers.offer" : 1}}
	], function(err, result){
		if (err)
            res.send(err);
        res.json({data : result});
	});
});


router.route('/api/mobilephones').get(function(req, res){
	var vendor = req.query.vendor !== undefined ? req.query.vendor : {$ne : ""};
	var color = req.query.color !== undefined ? req.query.color : {$ne : ""};
	var country = req.query.country !== undefined ? req.query.country : {$ne : ""};
	var page = req.query.page !== undefined ? req.query.page : 1;
	Base.aggregate([
	    { $unwind : "$yml_catalog.shop.offers.offer"},
	    { $match : {
	    			$and:[
	    					{"yml_catalog.shop.offers.offer.categoryId" : "1133677"},
	    					{"yml_catalog.shop.offers.offer.vendor" : vendor},
	    					{"yml_catalog.shop.offers.offer.param.__text" : color},
	    					{"yml_catalog.shop.offers.offer.param.__text" : country}
	    				]}},
	    { $project : { _id : 0, "yml_catalog.shop.offers.offer" : 1}}
	], function(err, result){
		if (err)
            res.send(err);
        res.json({data : result, page: page});
	});
});

router.route('/api/mobilephones/:_id').get(function(req, res){
	Base.aggregate([
	    { $unwind : "$yml_catalog.shop.offers.offer"},
	    { $match : {
	    			$and:[
	    					{"yml_catalog.shop.offers.offer.categoryId" : "1133677"},
	    					{"yml_catalog.shop.offers.offer._id" : req.params._id}
	    				]}},
	    { $project : { _id : 0, "yml_catalog.shop.offers.offer" : 1}}
	], function(err, result){
		if (err)
            res.send(err);
        res.json({data : result});
	});
});


router.route('/api/radiophones').get(function(req, res){
	var vendor = req.query.vendor !== undefined ? req.query.vendor : {$ne : ""};
	var color = req.query.color !== undefined ? req.query.color : {$ne : ""};
	var country = req.query.country !== undefined ? req.query.country : {$ne : ""};
	var page = req.query.page !== undefined ? req.query.page : 1;
	Base.aggregate([
	    { $unwind : "$yml_catalog.shop.offers.offer"},
	    { $match : {
	    			$and:[
	    					{"yml_catalog.shop.offers.offer.categoryId" : "1133679"},
	    					{"yml_catalog.shop.offers.offer.vendor" : vendor},
	    					{"yml_catalog.shop.offers.offer.param.__text" : color},
	    					{"yml_catalog.shop.offers.offer.param.__text" : country}
	    				]}},
	    { $project : { _id : 0, "yml_catalog.shop.offers.offer" : 1}}
	], function(err, result){
		if (err)
            res.send(err);
        res.json({data : result, page: page});
	});
});


router.route('/api/radiophones/:_id').get(function(req, res){
	Base.aggregate([
	    { $unwind : "$yml_catalog.shop.offers.offer"},
	    { $match : {
	    			$and:[
	    					{"yml_catalog.shop.offers.offer.categoryId" : "1133679"},
	    					{"yml_catalog.shop.offers.offer._id" : req.params._id}
	    				]}},
	    { $project : { _id : 0, "yml_catalog.shop.offers.offer" : 1}}
	], function(err, result){
		if (err)
            res.send(err);
        res.json({data : result});
	});
});

router.route('/api/smartwatches').get(function(req, res){
	var vendor = req.query.vendor !== undefined ? req.query.vendor : {$ne : ""};
	var color = req.query.color !== undefined ? req.query.color : {$ne : ""};
	var country = req.query.country !== undefined ? req.query.country : {$ne : ""};
	var page = req.query.page !== undefined ? req.query.page : 1;
	Base.aggregate([
	    { $unwind : "$yml_catalog.shop.offers.offer"},
	    { $match : {
	    			$and:[
	    					{"yml_catalog.shop.offers.offer.categoryId" : "1171797"},
	    					{"yml_catalog.shop.offers.offer.vendor" : vendor},
	    					{"yml_catalog.shop.offers.offer.param.__text" : color},
	    					{"yml_catalog.shop.offers.offer.param.__text" : country}
	    				]}},
	    { $project : { _id : 0, "yml_catalog.shop.offers.offer" : 1}}
	], function(err, result){
		if (err)
            res.send(err);
        res.json({data : result, page: page});
	});
});

router.route('/api/smartwatches/:_id').get(function(req, res){
	Base.aggregate([
	    { $unwind : "$yml_catalog.shop.offers.offer"},
	    { $match : {
	    			$and:[
	    					{"yml_catalog.shop.offers.offer.categoryId" : "1171797"},
	    					{"yml_catalog.shop.offers.offer._id" : req.params._id}
	    				]}},
	    { $project : { _id : 0, "yml_catalog.shop.offers.offer" : 1}}
	], function(err, result){
		if (err)
            res.send(err);
        res.json({data : result});
	});
});




app.use('/', router);



app.listen(port, function () {
    console.log('Example app listening on port 8080!');
});

/*% mongoimport -h ds023550.mlab.com:23550 -d dbfromozon -c ozon -u dbfromozon -p qazWSXedc123 --file src/data/mobile.json
/ Mongo Shall mongo ds023550.mlab.com:23550/dbfromozon -u dbfromozon -p qazWSXedc123
db.ozon.find({},{"yml_catalog.shop.categories.category":1})
*/