import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  BelongsToMany,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import Product from "./Product";

@Table
class Item extends Model {
  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @Column
  website!: string;

  @Column({ type: DataType.FLOAT })
  cost?: number;
}

export default Item;
