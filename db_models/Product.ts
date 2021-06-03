import {
  Table,
  Column,
  Model,
  BelongsToMany,
  DataType,
} from "sequelize-typescript";
import Category from "./Category";
import ProductCategory from "./ProductCategory";

@Table
class Product extends Model {
  @Column
  name!: string;

  @Column
  image?: string;

  @Column({ type: DataType.FLOAT })
  price!: number;

  @BelongsToMany(() => Category, () => ProductCategory)
  categories?: Category[];
}

export default Product;
