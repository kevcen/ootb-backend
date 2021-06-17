import {
  Table,
  Column,
  Model,
  HasMany,
  CreatedAt,
  BelongsTo,
  BelongsToMany,
  DataType,
  AllowNull,
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
  public!: boolean;

  @Column
  countryCode!: string;

  @BelongsToMany(() => Product, () => Wishlist)
  wishlist!: Product[];
  
  @AllowNull(false)
  @Column({type: DataType.ARRAY(DataType.STRING)})
  interests!: Array<string>;

  @CreatedAt
  @Column
  createdAt!: Date;
}

export default User;
