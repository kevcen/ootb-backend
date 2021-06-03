import express from "express";
var router = express.Router();

/* GET home endpoint */
router.get('/', function(req, res, next) {
  res.send("This is the home endpoint");
});

export default router
