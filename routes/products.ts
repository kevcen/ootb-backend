import express from "express";
import Category from "../db_models/Category";
import Item from "../db_models/Item";
import Product from "../db_models/Product";
var router = express.Router();

let setup = async () => {
  // SETUP CATEGORIES !
  var categories = [
    "Food",
    "Fashion",
    "Music",
    "Photography",
    "Sport",
    "Fragrance",
    "Gardening",
    "Health & Beauty",
    "Home Decor",
    "Personalised",
  ];
  for (var cat_name of categories) {
    await new Category({ name: cat_name }).save();
  }

  // SETUP FAKE PRODUCTS
  // Food
  var category = await Category.findOne({ where: { name: "Food" } });
  if (category) {
    var product = new Product({
      name: "Knife Set",
      image:
        "https://cdn.shopify.com/s/files/1/0513/9709/9711/products/Ploopz-com-japanese-chef-knife-set-stainless-steel-blades-homeware-kitchen-santoku-8-Knives-set_grande.jpg?v=1607959108",
    });
    var item = new Item({
      cost: 89.99,
      website:
        "https://ploopz.com/products/japanese-kitchen-knives-stainless-steel-chef-knife-set?variant=37557489303743&currency=GBP&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&gclid=Cj0KCQjw--GFBhDeARIsACH_kdYAOFWbQJVrJs2-Gy42EDrtciRjDZbGRFEO-lj5cHEBgEDU9vvby_AaAohgEALw_wcB",
    });
    await product.$add("categories", category);
    await product.$add("items", item);
    await item.save();
    await product.save();
  }
};

/* POST simple get products from categories */
router.get("/", async (req, res, next) => {
  await setup();
  try {
    var categories: string[] = req.body.categories || [];
    var products: Product[] = await Product.findAll({
      include: [
        {
          model: Category,
          where: { name: categories },
          required: false,
        },
      ],
    });
    res.send(products);
  } catch (error) {
    res.send({ error: error.message });
  }
});

export default router;
