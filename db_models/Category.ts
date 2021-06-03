import { Table, Column, Model, HasMany, PrimaryKey, BelongsToMany } from "sequelize-typescript";
import Product from "./Product";
import ProductCategory from "./ProductCategory";

@Table
class Category extends Model {
  @Column
  name!: string;

  @BelongsToMany(() => Product, ()=>ProductCategory)
  products?: Product[];
}

export default Category;
