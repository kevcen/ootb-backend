import Product from "../db_models/Product";

export interface Quiz {
  predict(): Promise<Product[]>;
}

export default Quiz;
