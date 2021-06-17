import {
  Model,
  Column,
  Table,
  ForeignKey,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { BelongsTo } from "sequelize/types";
import Payment from "./Payment";
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

  @Column
  chippedInTotal!: number;
}

export default Wishlist;
