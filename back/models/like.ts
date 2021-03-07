import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Post from './post';
import User from './user';

@Table
class Like extends Model {
  @ForeignKey(() => Post)
  @Column
  postId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}

export default Like;
