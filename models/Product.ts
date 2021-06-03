import { Table, Column, Model, HasMany, BelongsToMany } from "sequelize-typescript";
import Category from "./Category";
import ProductCategory from "./ProductCategory";

@Table
class Product extends Model<Product> {
  @Column
  name!: string;

  @Column
  price!: number;

  @BelongsToMany(() => Category, ()  => ProductCategory)
  categories?: Category[];
}

export default Product;
