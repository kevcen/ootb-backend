import {
  Table,
  Column,
  Model,
  BelongsToMany,
  BelongsTo,
  HasMany,
  ForeignKey,
  AllowNull,
} from "sequelize-typescript";
import Category from "./Category";
import Item from "./Item";
import ProductCategory from "./ProductCategory";
import User from "./User";
import Wishlist from "./Wishlist";

@Table
class Product extends Model {
  @Column
  name!: string;

  @Column
  image?: string;

  @Column
  gender?: string;

  @Column
  relationship?: string;

  @Column
  clothesStoreType?: string;

  @Column
  clothingSeason?: string;

  @Column
  fashionWear?: string;

  @Column
  doesCook!: boolean;

  @Column
  doesDrink!: boolean;

  @Column
  cuisine?: string;

  @Column
  dietaryRequirements?: string;

  @Column
  fragranceFamily?: string;

  @Column
  perfumeType?: string;

  @Column
  hasGreenhouse!: boolean;

  @Column
  plantSize?: string;

  @Column
  plantType?: string;

  @Column
  likesMakeup!: boolean;

  @Column
  beautyProductType?: string;

  @Column
  homeRoom?: string;

  @Column
  homeStyle?: string;

  @Column
  genre?: string;

  @Column
  instrument?: string;

  @Column
  cameraType?: string;

  @Column
  photographyExperience?: string;

  @Column
  playSport?: string;

  @Column
  watchSport?: string;

  @HasMany(() => Item)
  items!: Item[];

  @BelongsToMany(() => Category, () => ProductCategory)
  categories?: Category[];

  @BelongsToMany(() => User, () => Wishlist)
  users?: User[];
}

export default Product;
