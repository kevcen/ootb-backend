import { Table, Column, Model, HasMany, PrimaryKey, BelongsToMany, AllowNull } from "sequelize-typescript";
import Product from "./Product";
import ProductCategory from "./ProductCategory";

@Table
class Category extends Model {
  
  @AllowNull(false)
  @Column
  name!: string;

  @BelongsToMany(() => Product, ()=>ProductCategory)
  products?: Product[];

  @Column
  image!: string;
}

export default Category;
