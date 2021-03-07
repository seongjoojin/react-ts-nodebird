import { Table, Model, Column, DataType, AllowNull, BelongsTo } from 'sequelize-typescript';
import Post from './post';
import User from './user';

@Table({
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
})
class Comment extends Model {
  @Column(DataType.TEXT)
  @AllowNull(false)
  content: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Post)
  post: Post;
}

export default Comment;