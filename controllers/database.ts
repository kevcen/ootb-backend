import {Sequelize} from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  database: 'movies',
  storage: ':memory:',
  models: [__dirname + '/models']
});

export default sequelize