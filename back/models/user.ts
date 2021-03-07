import { Table, Model, Column, DataType, AllowNull, Unique, HasMany, BelongsToMany } from 'sequelize-typescript';
import Comment from './comment';
import Follow from './follow';
import Like from './like';
import Post from './post';

@Table({
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
})
class User extends Model {
  @Column(DataType.STRING(30))
  @Unique(true)
  @AllowNull(false)
  email: string;

  @Column(DataType.STRING(30))
  @AllowNull(false)
  nickname: string;

  @Column(DataType.STRING(100))
  @AllowNull(false)
  password: string;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Comment)
  comments: Comment[];

  @BelongsToMany(() => User, () => Like)
  liked: Post[];

  @BelongsToMany(() => User, 'followingId')
  followers: User[];

  @BelongsToMany(() => User, 'followerId')
  followings: User[];
}

export default User;
