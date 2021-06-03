import {Model, Column, Table, ForeignKey} from "sequelize-typescript";
import Category from "./Category";
import Product from "./Product";

@Table
class ProductCategory extends Model {

  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @ForeignKey(() => Category)
  @Column
  categoryId!: number;
}

export default ProductCategory