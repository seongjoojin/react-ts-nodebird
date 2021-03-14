import React, { useMemo } from 'react';
import { Button, Card, List } from 'antd';
import styled from '@emotion/styled';
import { StopOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { FollowType, removeFollowerRequestAction, unfollowRequestAction } from '../reducers/user';

const LoadMoreBox = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const ListItem = styled(List.Item)`
  margin-top: 20px;
`;
interface IData {
  id: number;
  nickname?: string;
  Follow?: FollowType[];
}

interface IProps {
  header: string;
  data: IData[] | undefined;
}

const FollowList = ({ header, data }: IProps) => {
  const dispatch = useDispatch();
  const listStyle = useMemo(() => ({ marginBottom: 20 }), []);
  const listGrid = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }), []);
  const onCancel = (id: number) => () => {
    if (header === '팔로잉') {
      dispatch(unfollowRequestAction(id));
    } else {
      dispatch(removeFollowerRequestAction(id));
    }
  };
  return (
    <List<IData>
      style={listStyle}
      grid={listGrid}
      size="small"
      header={<div>{header}</div>}
      loadMore={(
        <LoadMoreBox>
          <Button>더 보기</Button>
        </LoadMoreBox>
      )}
      bordered
      dataSource={data}
      renderItem={(item: IData) => (
        <ListItem>
          <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </ListItem>
      )}
    />
  );
};

export default FollowList;
