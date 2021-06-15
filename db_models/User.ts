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
  birthdate?: Date;

  @Column
  image?: string;

  @Column
  public?: boolean;

  @Column
  countryCode!: string;

  @HasMany(()=>Product)
  wishlist!: Product[]

  @CreatedAt
  @Column
  createdAt!: Date;
}

export default User;
