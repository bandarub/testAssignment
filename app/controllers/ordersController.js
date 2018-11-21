var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var path = require("path");

var Order = require("../models/order");

/*****  GET ALL orders from database *****/
router.get("/orders", function(req, res) {
  Order.find({}, function(err, orders) {
    if (err) return res.status(500).send("There was a problem finding orders.");
    res.status(200).send(orders);
  });
});

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "../../index.html"));
});

/***** GET order by id *****/

router.get("/orders/:id", (req, res) => {
  Order.findById(req.params.id).then(doc => {
    res.json(doc);
  });
});

/***** POST order *****/
router.post("/order", (req, res) => {
  var newOrder = new Order({
    customer:req.body.customer,
  value:req.body.value});
  newOrder.save()
  .then(function(err,data){
    if(err){
      res.send(err)
    }
    res.json(data)
  })

});

/***** DELETE order by id *****/

router.delete("/:id", (req, res) => {
  Order.findByIdAndDelete(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Order deleted successfully!");
  });
});

module.exports = router;
