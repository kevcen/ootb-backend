import {Model, Column, Table, ForeignKey, DataType, PrimaryKey} from "sequelize-typescript";
import User from "./User";
import Product from "./Product";

@Table
class Payment extends Model {

  @PrimaryKey
  @Column
  id!: number;
  
  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @Column
  payerName!: string;

  @Column({ type: DataType.FLOAT })
  payment?: number; //how much the user is willing to chip in
} 

export default Payment