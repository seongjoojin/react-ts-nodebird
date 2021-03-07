import { Table, Model, Column, DataType, AllowNull, BelongsToMany } from 'sequelize-typescript';
import Post from './post';
import PostHashtag from './postHashtag';

@Table({
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
})
class Hashtag extends Model {
  @Column(DataType.STRING(20))
  @AllowNull(false)
  name: string;

  @BelongsToMany(() => Hashtag, () => PostHashtag)
  posts: Post[];
}

export default Hashtag;