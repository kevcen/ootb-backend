import express from "express";
import Category from "../db_models/Category";
import Item from "../db_models/Item";
import Product from "../db_models/Product";
import Sequelize from "sequelize";
var router = express.Router();
const Op = Sequelize.Op;

/* POST simple get products by categories */
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body)
    var categories: string[] = req.body.categories|| [] ;
    console.log(categories)
    var price: string[] = req.body.price || [0, Number.MAX_SAFE_INTEGER];
    console.log(price);
    var relationship: string = (req.body.relationship|| "any").toLowerCase() ;
    console.log(relationship);
    var gender: string = (req.body.gender || "any").toLowerCase() ; 
    gender = ["prefer not to say", "other"].includes(gender) ? "any" : gender; 
    console.log(gender);
    var occasion: string = (req.body.occasion  || "any").toLowerCase();
    console.log(occasion);

    var products: Product[] = await Product.findAll({
      include: [
        {
          model: Category,
          where: { 
            name: categories
          },
          // TODO: use, occasion
        },{
          model : Item,
          where: {
            cost: {
              [Op.lte]: price[1],
              [Op.gte]: price[0]
            }
          }
        }
      ],
      where: {
        gender: {
          [Op.or]: {
            [Op.eq]: gender,
            [Op.eq]: "any"
          }
        },
        relationship: {
          [Op.or]: {
            [Op.eq]: relationship,
            [Op.eq]: "any"
          }
        }
      }
    });

    var filteredNames = new Set<string>();
    var filteredProducts = new Set();
    
    products.forEach(product => {
      if(!filteredNames.has(product.name)){
        filteredProducts.add(product);
        filteredNames.add(product.name)
      }
    });

    res.send(Array.from(filteredProducts));
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
