import { Table, Model, Column, DataType, AllowNull } from 'sequelize-typescript';

@Table({
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
})
class Hashtag extends Model {
  @Column(DataType.STRING(20))
  @AllowNull(false)
  name: string;
}

export default Hashtag;