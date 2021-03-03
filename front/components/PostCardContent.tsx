import React from 'react';
import Link from 'next/link';

interface IProps {
  postData: string;
}

const PostCardContent = ({ postData }: IProps) => (
  <div>{postData.split(/(#[^\s#]+)/g).map((v) => {
    if (v.match(/(#[^\s#]+)/)) {
      return <Link href={`/hashtag/${v.slice(1)}`} key={`${v}${Date.now()}`}><a>{v}</a></Link>;
    }
    return v;
  })}
  </div>
);

export default PostCardContent;
