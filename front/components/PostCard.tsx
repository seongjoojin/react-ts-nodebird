import React from 'react';
import {IMainPost} from 'reducers/post';

interface IProps {
  post: IMainPost
}

const PostCard = ({post}: IProps) => {
  return (
    <div>
      PostCard
    </div>
  )
}

export default PostCard;