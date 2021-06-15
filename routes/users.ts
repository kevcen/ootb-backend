import express from "express";
import Product from "../db_models/Product";
import User from "../db_models/User";
import multer from "multer";
import { Op } from "sequelize";
const { CloudinaryStorage } = require("multer-storage-cloudinary");
import Cloudinary from "cloudinary";
import { serialize } from "v8";
import Wishlist from "../db_models/Wishlist";
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
  }: {
    firstname: string;
    lastname: string;
    wishlist: string;
    countryCode: string;
    isPublic: boolean;
  } = req.body;
  
  const wishlist: Product[] = JSON.parse(wishlistString);

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
  });

  user = await user.save()
  await user.$set("wishlist", wishlist.map(prod => prod.id))

  res.send(user);
});

/* POST search for users based on filters. */
router.post("/search", async (req, res) => {
  var searchValue = req.body.searchValue;

  var users: User[] = await User.findAll({
    where: {
      [Op.or]: [
        {
          firstname: {
            [Op.like]: "%" + searchValue + "%",
          },
        },
        {
          lastname: {
            [Op.like]: "%" + searchValue + "%",
          },
        },
      ],
    },
  });
  res.send(users);
});

export default router;
