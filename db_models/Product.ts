import {
  Table,
  Column,
  Model,
  BelongsToMany,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Category from "./Category";
import Item from "./Item";
import ProductCategory from "./ProductCategory";

@Table
class Product extends Model {
  @Column
  name!: string;

  @Column
  image?: string;

  @HasMany(()=>Item)
  items!: Item[];

  @BelongsToMany(() => Category, () => ProductCategory)
  categories?: Category[];
}

export default Product;
