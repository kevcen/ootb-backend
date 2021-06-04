import express from "express";
import Category from "../db_models/Category";
import Product from "../db_models/Product";
var router = express.Router();

/* POST simple get products by categories */
router.post("/", async (req, res, next) => {
  try {
    var categories: string[] = req.body.categories || [];
    var products: Product[] = await Product.findAll({
      include: [
        {
          model: Category,
          where: { name: categories },
        },
      ],
    });
    res.send(products);
  } catch (error) {
    res.send({ error: error.message });
  }
});

export default router;
