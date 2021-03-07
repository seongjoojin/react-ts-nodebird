import { Table, Model, Column, DataType, AllowNull, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import Comment from './comment';
import Hashtag from './hashtag';
import Image from './image';
import Like from './like';
import PostHashtag from './postHashtag';
import User from './user';

@Table({
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
})
class Post extends Model {
  @Column(DataType.TEXT)
  @AllowNull(false)
  content: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Image)
  images: Image[];

  @BelongsToMany(() => Post, () => PostHashtag)
  hastags: Hashtag[];

  @BelongsToMany(() => Post, () => Like)
  likers: User[];

  @BelongsTo(() => Post, 'retweetId')
  retweet: Post[];
}

export default Post;