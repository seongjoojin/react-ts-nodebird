import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import { RootState } from '../reducers';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

interface IProps {
  children: ReactNode;
}

const AppLayout = ({ children }:IProps) => {
  const { me } = useSelector((state: RootState) => state.user);
  return (
    <div>
      <Global
        styles={css`
          .ant-row {
            margin-right: 0 !important;
            margin-left: 0 !important;
          }
          .ant-col:first-child {
            padding-left: 0 !important;
          }
          .ant-col:last-child {
            padding-right: 0 !important;
          }
        `}
      />
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
          {me ? (
            <UserProfile />
          ) : (
            <LoginForm />
          )}
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

export default AppLayout;
