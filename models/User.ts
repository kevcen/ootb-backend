import { Table, Column, Model, HasMany, CreatedAt } from "sequelize-typescript";
import Product from "./Product";

@Table
class User extends Model<User> {
  @Column
  firstname!: string;

  @Column
  lastname!: string;

  @Column
  username!: string;

  @Column
  password!: string;

  @HasMany(() => Product)
  wishlist?: Product[]

  @Column
  age!: number;

  @CreatedAt
  @Column
  createdAt!: Date;
}

export default User;
