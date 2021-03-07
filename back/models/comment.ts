import { Table, Model, Column, DataType, AllowNull } from 'sequelize-typescript';

@Table({
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
})
class Comment extends Model {
  @Column(DataType.TEXT)
  @AllowNull(false)
  content: string;
}

export default Comment;