import { Table, Model, Column, DataType, AllowNull, Unique } from 'sequelize-typescript';

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
}

export default User;
