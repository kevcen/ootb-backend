import { Table, Column, Model, HasMany, PrimaryKey, BelongsToMany } from "sequelize-typescript";
import Product from "./Product";
import ProductCategory from "./ProductCategory";

@Table
class Category extends Model<Category> {
  @Column
  name!: string;

  @HasMany(() => Category)
  subcategories!: Category[];

  @BelongsToMany(() => Product, ()=>ProductCategory)
  products?: Product[];
}

export default Category;
