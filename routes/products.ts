import express from "express";
import Category from "../db_models/Category";
import Product from "../db_models/Product";
import ProductCategory from "../db_models/ProductCategory";
var router = express.Router();

/* POST simple get products from categories */
router.get("/", async (req, res, next) => {
  const product = new Product({ name: 'bob', image:"https://images.halloweencostumes.co.uk/products/43438/1-2/mens-crab-costume.jpg", price:12.40})
  await product.save()
  // CATEGORIES : FOOD AND FASHION !
  const category = new Category({ name: 'person'})
  await category.save()
  product.$add('categories', category);

  // const category_names: string[] = req.body.categories;
  var products : Product[] = await Product.findAll({
    include: [
      {
        model:Category,
        required: false,
      },
    ],
  });
  res.send(products);

});

export default router;
