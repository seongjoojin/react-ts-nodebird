import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../reducers';
import { logoutRequestAction } from '../reducers/user';

interface IProps {
}

const UserProfile = ({ }: IProps) => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state: RootState) => state.user);
  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />{me?.Posts.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />{me?.Followings.length}
        </div>,
        <div key="followers">
          팔로워
          <br />{me?.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{me?.nickname[0]}</Avatar>} title={me?.nickname} />
      <Button onClick={onLogout} loading={logOutLoading}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
