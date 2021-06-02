import express from "express";
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('This is the user endpoint');
});

export default router
