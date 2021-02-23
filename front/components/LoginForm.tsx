import React, { Dispatch, SetStateAction, useCallback } from 'react';
import {Button, Form} from 'antd';
import Link from 'next/link';
import styled from '@emotion/styled';
import useInput from 'hooks/useInput';

interface IProps {
  setIsLoggenIn: Dispatch<SetStateAction<boolean>>;
}

const LoginForm = ({ setIsLoggenIn }: IProps) => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

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