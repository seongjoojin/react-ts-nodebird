import { Table, Model, Column, Length, DataType, AllowNull, BelongsTo } from 'sequelize-typescript';
import Post from './post';

@Table({
  charset: 'utf8',
  collate: 'utf8_general_ci',
})
class Image extends Model {
  @Column(DataType.STRING(200))
  @AllowNull(false)
  src: string;

  @BelongsTo(() => Post)
  post: Post;
}

export default Image;
