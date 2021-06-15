import {
  Table,
  Column,
  Model,
  HasMany,
  CreatedAt,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import Product from "./Product";
import Wishlist from "./Wishlist";

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

  @BelongsToMany(() => Product, () => Wishlist)
  wishlist!: Product[];

  @CreatedAt
  @Column
  createdAt!: Date;
}

export default User;
