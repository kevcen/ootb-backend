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
    var categories: string[] = req.body.categories || [];
    var price: string[] = req.body.price || [];
    var relationship: string = req.body.relationship || "any";
    var gender: string = req.body.gender || "any"; 
    gender = ["Prefer not to say", "Other"].includes(gender) ? "any" : gender; 
    var occasion: string = req.body.occasion || "any";

    var products: Product[] = await Product.findAll({
      include: [
        {
          model: Category,
          where: { 
            name: categories,
          },
          // TODO: use, relationship, occasion
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
    res.send(products);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
