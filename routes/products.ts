import express from "express";
import Category from "../db_models/Category";
import Item from "../db_models/Item";
import Product from "../db_models/Product";
import Sequelize from "sequelize";
var router = express.Router();
const Op = Sequelize.Op;

function formatStr(str: any) {
  return (str || "any").toLowerCase();
}

function formatCol(col: any) : string[]{
  return Array.from(col || []);
}

function formatBool(bool: any) {
  return bool || false;
}

function printArray(arr: string[]) {
  console.log("[" + arr.join() + "]");
}

/* POST simple get products by categories */
router.post("/", async (req, res, next) => {
    console.log(req.body);
    var categories: string[] = formatCol(req.body.categories);
    var price: string[] = req.body.price || [0, Number.MAX_SAFE_INTEGER];
    var relationship: string[] = formatCol(req.body.relationship);
    var gender: string[] = formatCol(req.body.gender);
    printArray(gender);
    var occasion: string = formatStr(req.body.occasion);
    var clothesStoreTypes: string[] = formatCol(req.body.clothesStoreTypes);
    printArray(clothesStoreTypes);

    var clothingSeasons: string[] = formatCol(req.body.clothingSeasons);
    printArray(clothingSeasons);

    var fashionWear: string[] = formatCol(req.body.fashionWear);
    printArray(fashionWear);

    //Food
    var doesCook: boolean = formatBool(req.body.doesCook);
    var doesDrink: boolean = formatBool(req.body.doesDrink);
    console.log(req.body.doesDrink);
    var cuisines: string[] = formatCol(req.body.cuisines);
    var dietaryRequirements: string[] = formatCol(req.body.dietaryRequirements);

    //Fragrance
    var perfumeTypes: string[] = formatCol(req.body.perfumeTypes);
    var fragranceFamilies: string[] = formatCol(req.body.fragranceFamilies);

    //Gardening
    var hasGreenhouse: boolean = formatBool(req.body.hasGreenhouse);
    var plantSizes: string[] = formatCol(req.body.plantSizes);
    var plantTypes: string[] = formatCol(req.body.plantTypes);

    //Health & Beauty
    var likesMakeup: boolean = formatBool(req.body.likesMakeup);
    var beautyProductTypes: string[] = formatCol(req.body.beautyProductTypes);

    // Home Decor
    var homeRooms: string[] = formatCol(req.body.homeRooms);
    var homeStyles: string[] = formatCol(req.body.homeStyles);

    //Music
    var genres: string[] = formatCol(req.body.genres);
    var instruments: string[] = formatCol(req.body.instruments);

    //Photography
    var cameraTypes: string[] = formatCol(req.body.cameraTypes);
    var photographyExperience: string[] = formatCol(req.body.experience);

    //Sport
    var playSports: string[] = formatCol(req.body.playSports);
    var watchSports: string[] = formatCol(req.body.watchSports);


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
            [Op.in]: gender,
            [Op.eq]: "any"
          }
        },
        relationship: {
          [Op.or]: {
            [Op.in]: relationship,
            [Op.eq]: "any"
          }
        },
        clothesstoretype: {
          [Op.or]: {
            [Op.in]: clothesStoreTypes,
            [Op.is]: null
          }
        },
        clothingseason: {
          [Op.or]: {
            [Op.in]: clothingSeasons,
            [Op.is]: null
          }
        },
        fashionwear: {
          [Op.or]: {
            [Op.in]: fashionWear,
            [Op.is]: null
          }
        },
        doescook: {
          [Op.or]: {
            [Op.eq]: doesCook,
            [Op.is]: null
          }
        },
        doesdrink: {
          [Op.or]: {
            [Op.eq]: doesDrink,
            [Op.is]: null
          }
        },
        cuisines: {
          [Op.or]: {
            [Op.in]: cuisines,
            [Op.is]: null
          }
        },
        fragrancefamily: {
          [Op.or]: {
            [Op.in]: fragranceFamilies,
            [Op.is]: null
          }
        },
        perfumetype: {
          [Op.or]: {
            [Op.in]: perfumeTypes,
            [Op.is]: null
          }
        },
        hasgreenhouse: {
          [Op.or]: {
            [Op.eq]: hasGreenhouse,
            [Op.is]: null
          }
        },
        plantsize: {
          [Op.or]: {
            [Op.in]: plantSizes,
            [Op.is]: null
          }
        },
        planttype: {
          [Op.or]: {
            [Op.in]: plantTypes,
            [Op.is]: null
          }
        },
        likesmakeup: {
          [Op.or]: {
            [Op.eq]: likesMakeup,
            [Op.is]: null
          }
        },
        beautyproducttype: {
          [Op.or]: {
            [Op.in]: beautyProductTypes,
            [Op.is]: null
          }
        },
        homeroom: {
          [Op.or]: {
            [Op.in]: homeRooms,
            [Op.is]: null
          }
        },
        homestyle: {
          [Op.or]: {
            [Op.in]: homeStyles,
            [Op.is]: null
          }
        },
        genre: {
          [Op.or]: {
            [Op.in]: genres,
            [Op.is]: null
          }
        },
        instrument: {
          [Op.or]: {
            [Op.in]: instruments,
            [Op.is]: null
          }
        },
        cameratype: {
          [Op.or]: {
            [Op.in]: cameraTypes,
            [Op.is]: null
          }
        },
        photographyexperience: {
          [Op.or]: {
            [Op.in]: photographyExperience,
            [Op.is]: null
          }
        },
        playsport: {
          [Op.or]: {
            [Op.in]: playSports,
            [Op.is]: null
          }
        },
        watchsport: {
          [Op.or]: {
            [Op.in]: watchSports,
            [Op.is]: null
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
  // } catch (error) {
    // res.status(400).send({ error: error.message });
  // }
});

export default router;
