import { FC, ReactNode, useState } from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';

import UserProfile from 'components/UserProfile';
import LoginForm from 'components/LoginForm';
import styled from '@emotion/styled';

type Props = {
  children: ReactNode;
};

const AppLayout: FC<Props> = ({ children }) => {
  const [isLoggenIn, setIsLoggenIn] = useState(false);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggenIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://evanjin.dev/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by Evanjin
          </a>
        </Col>
      </Row>
    </div>
  );
};

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

export default AppLayout;