import express from "express";
import Product from "../db_models/Product";
import User from "../db_models/User";
import multer from "multer";
import { Op } from "sequelize";
const { CloudinaryStorage } = require("multer-storage-cloudinary");
import Cloudinary from "cloudinary";
import { serialize } from "v8";
import Wishlist from "../db_models/Wishlist";
import Item from "../db_models/Item";
import Category from "../db_models/Category";
require("dotenv").config();

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
});

var router = express.Router();

/* GET get a user. */
router.get("/", function (_req, res, _next) {
  res.send("This is the user endpoint");
});

/* POST create user. */
router.post("/", upload.single("image"), async (req, res) => {
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
    attributes: ["id", "firstname", "lastname", "image"],
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
    include: [Product],
  });

  console.log(user);
  if (user) {
    // only send wishlist if the user has said it to be public
    if (user.public) {
      res.send(user.wishlist);
    } else {
      // send category interests if not public profile
      if (user.interests) {
        var categories: Category[] = await Category.findAll({
          where: {
            name: {
              [Op.in]: user.interests,
            },
          },
        });
        res.send(categories)
      }
    }
  }
  res.sendStatus(500).send({ error: "Couldn't find the user" });
});

export default router;
