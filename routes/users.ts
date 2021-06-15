import express from "express";
import Product from "../db_models/Product";
import User from "../db_models/User";
import { v4 } from "uuid";
import path from "path";
import multer from "multer";
import mime from "mime";
const { Op } = require("sequelize");

var router = express.Router();

/* GET get a user. */
router.get("/", function (req, res, next) {
  res.send("This is the user endpoint");
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/profiles");
  },
  filename: function (req, file, cb) {
    cb(null, v4() + "-" + Date.now() + ".jpg");
  },
});

var upload = multer({
  storage,
}).single("image");
/* POST create user. */
router.post("/", upload, async (req, res, next) => {
  // extract necessary params from body
  const {
    firstname,
    lastname,
    wishlist,
    countryCode,
    isPublic,
  }: {
    firstname: string;
    lastname: string;
    wishlist: Product[];
    countryCode: string;
    isPublic: boolean;
  } = req.body;
  let image;
  if (req.file) {
    image = process.env.HOST + "/profiles/" + req.file.filename;
  }
  console.log(image);
  let user = new User({
    image,
    firstname,
    lastname,
    wishlist,
    countryCode,
    isPublic,
  });
  user = await user.save();
  res.send(user);
});

/* POST search for users based on filters. */
router.post("/search", async (req, res, next) => {
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
