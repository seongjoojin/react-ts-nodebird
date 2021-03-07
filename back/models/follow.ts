import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import User from './user';

@Table
class Follow extends Model {
  @ForeignKey(() => User)
  @Column
  followerId: number;

  @ForeignKey(() => User)
  @Column
  followingId: number;
}

export default Follow;
