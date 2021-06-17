import { Model, Column, Table, ForeignKey } from "sequelize-typescript";
import Category from "./Category";
import Product from "./Product";
import User from "./User";

@Table
class Wishlist extends Model {
  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @Column
  alreadyBought!: boolean;
}

export default Wishlist;
