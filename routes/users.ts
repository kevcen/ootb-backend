import express from "express";
import User from "../db_models/User";
const { Op } = require("sequelize");

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("This is the user endpoint");
});

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
        {
          username: {
            [Op.like]: "%" + searchValue + "%",
          },
        },
      ],
    },
  });
  res.send(users);
});

export default router;
