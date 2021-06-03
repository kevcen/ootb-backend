import express from "express";
var router = express.Router();

enum Gender {
  Male, 
  Female,
  Other
}

/* Submit a profile of giftee so that gift recommendations can be generated and sent */
router.post('/submit', function(req, res, next) {
  var interest : string[] = req.body.interest;
  var gender : Gender = req.body.gender;
  var minPrice : Number = req.body.minPrice;
  var maxPrice : Number = req.body.maxPrice;


  // get list of gifts from database
  //var itemList = getGifts(interest, gender, minPrice, maxPrice)
  
  var itemList : [string[], string[]] = [[], []]; // [list of image links, list of product page links]
  res.end(JSON.stringify(itemList));
});

export default router
