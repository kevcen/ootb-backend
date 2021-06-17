import express from "express";
import Product from "../db_models/Product";
import User from "../db_models/User";
import multer from "multer";
import { Op } from "sequelize";
const { CloudinaryStorage } = require("multer-storage-cloudinary");
import Cloudinary from "cloudinary";
import Item from "../db_models/Item";
import Category from "../db_models/Category";
import Wishlist from "../db_models/Wishlist";
import * as dotenv from "dotenv";

dotenv.config();
Cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: Cloudinary.v2,
  params: {
    folder: (req: any, file: any) => "out-of-the-box",
    format: async (req: any, file: any) => "jpg", // supports promises as well
    public_id: (req: any, file: any) => `${Date.now()}`,
  },
});

var upload = multer({
  storage: storage,
}).single("image");

var router = express.Router();

/* GET get a user. */
router.get("/", function (_req, res, _next) {
  res.send("This is the user endpoint");
});

/* POST create user. */
router.post("/", async (req, res) => {
  // No need to await  this middleware
  upload(req, res, async (err) => {
    // Refactor to using recommended multer error handling
    // https://github.com/expressjs/multer#error-handling
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log("multer error when uploading file:", err);
      return res.sendStatus(500);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log("unknown error when uploading file:", err);
      return res.sendStatus(500);
    }

    // extract necessary params from body
    const {
      firstname,
      lastname,
      wishlist: wishlistString,
      countryCode,
      isPublic,
      interests: interestsString,
    }: {
      firstname: string;
      lastname: string;
      wishlist: string;
      countryCode: string;
      isPublic: boolean;
      interests: string;
    } = req.body;
    const wishlist: Product[] = JSON.parse(wishlistString);
    const interests: Array<string> = JSON.parse(interestsString);
    console.log(wishlist);
    console.log(interests);
    let image;
    if (req.file) {
      image = req.file.path;
    }

    let user = new User({
      image,
      firstname,
      lastname,
      countryCode,
      isPublic,
      interests,
    });

    user = await user.save();
    await user.$set(
      "wishlist",
      wishlist.map((prod) => prod.id)
    );

    res.send(user);
  });
});

/* POST search for users based on filters. */
router.post("/search", async (req, res) => {
  var searchValue = req.body.searchValue;
  var split = searchValue.split(" ");
  var firstname = split[0];
  var lastname = split[1];
  const where: any = {
    firstname: {
      [Op.iLike]: firstname + "%",
    },
  };
  if (lastname) {
    where.lastname = { [Op.iLike]: lastname + "%" };
  }
  var users: User[] = await User.findAll({
    where: where,
  });

  console.log(users);

  res.send(users);
});

/* POST search for users based on filters. */
router.post("/wishlist", async (req, res) => {
  var userId = req.body.userId;
  console.log(userId);

  var user: User | null = await User.findOne({
    where: {
      id: userId,
    },
    include: [{ model: Product, include: [Item] }],
  });

  console.log(user);

  if (!user) {
    res.status(400).send({ error: "User does not exist" });
  } else if (user?.public && user.wishlist.length > 0) {
    // only send wishlist if the user has said it to be public
    res.send(user.wishlist);
  } else if (user?.interests) {
    // send category interests if not public profile
    var categories: Category[] = await Category.findAll({
      where: {
        name: {
          [Op.in]: user.interests,
        },
      },
    });
    res.send(categories);
  } else {
    res.status(404).send({ error: "Couldn't find the user" });
  }
});

router.post("/interested", async (req, res) => {
  var productId = req.body.productId;
  var userId = req.body.userId;

  var updateResult = Wishlist.update(
    { alreadyBought: true },
    {
      where: {
        productId: productId,
        userId: userId,
      },
      returning: true, // tell Sequelize to return the object
    }
  ).then((result) => {
    if (result[1].length > 0) {
      res.send(result[1]);
    } else {
      res.send([]);
    }
  });
});

router.post("/chip", async (req, res) => {
  var money = req.body.chipAmount;
  var productId = req.body.productId;
  var userId = req.body.userId;

  var updateResult = await Wishlist.increment("chippedInTotal", {
    by: money,
    where: {
      productId: productId,
      userId: userId,
    },
  });

  if (updateResult) {
    res.send(updateResult);
  } else {
    res.send(null);
  }
});

export default router;
