import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';

interface IProps {
  setIsLoggenIn: Dispatch<SetStateAction<boolean>>;
}

const UserProfile = ({ setIsLoggenIn }: IProps) => {
  const onLogout = useCallback(() => {
    setIsLoggenIn(false);
  }, [])
  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="followers">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>Evan</Avatar>} title="EvanJin" />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
