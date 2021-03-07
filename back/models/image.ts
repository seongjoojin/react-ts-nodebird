import { Table, Model, Column, Length, DataType, AllowNull } from 'sequelize-typescript';

@Table({
  charset: 'utf8',
  collate: 'utf8_general_ci',
})
class Image extends Model {
  @Column(DataType.STRING(200))
  @AllowNull(false)
  src: string;
}

export default Image;
