import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import {Button, Form} from 'antd';
import Link from 'next/link';
import styled from '@emotion/styled';

interface IProps {
  setIsLoggenIn: Dispatch<SetStateAction<boolean>>;
}

const LoginForm = ({ setIsLoggenIn }: IProps) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggenIn(true);
  }, [id, password]);

  return (
    <LoginWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </LoginWrapper>
  );
};

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const LoginWrapper = styled(Form)`
  padding: 10px;
`;


export default LoginForm;