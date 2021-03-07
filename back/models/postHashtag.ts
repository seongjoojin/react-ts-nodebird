import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import Hashtag from "./hashtag";
import Post from "./post";

@Table
class PostHashtag extends Model {
  @ForeignKey(() => Post)
  @Column
  postId: number;

  @ForeignKey(() => Hashtag)
  @Column
  hashtagId: number;
}

export default PostHashtag;