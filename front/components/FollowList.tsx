import React, { useMemo } from 'react';
import { Button, Card, List } from 'antd';
import styled from '@emotion/styled';
import { StopOutlined } from '@ant-design/icons';

const LoadMoreBox = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const ListItem = styled(List.Item)`
  margin-top: 20px;
`;
interface IData {
  nickname: string;
}

interface IProps {
  header: string;
  data: IData[] | undefined;
}

const FollowList = ({ header, data }: IProps) => {
  const listStyle = useMemo(() => ({ marginBottom: 20 }), []);
  const listGrid = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }), []);

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
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </ListItem>
      )}
    />
  );
};

export default FollowList;
