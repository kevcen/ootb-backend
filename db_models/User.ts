import {
  Table,
  Column,
  Model,
  HasMany,
  CreatedAt,
  BelongsTo,
} from "sequelize-typescript";
import Product from "./Product";

@Table
class User extends Model {
  @Column
  firstname!: string;

  @Column
  lastname!: string;

  @Column
  username!: string;

  @Column
  password!: string;

  @Column
  age!: number;

  @Column
  image?: string;

  @CreatedAt
  @Column
  createdAt!: Date;
}

export default User;
