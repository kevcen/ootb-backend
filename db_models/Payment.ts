import {Model, Column, Table, ForeignKey, DataType} from "sequelize-typescript";
import User from "./User";
import Item from "./Item";

@Table
class Payment extends Model {

  @ForeignKey(() => Item)
  @Column
  itemId!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @Column({ type: DataType.FLOAT })
  payment?: number; //how much the user is willing to chip in
} 

export default Payment