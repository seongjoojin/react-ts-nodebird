import React, { useCallback } from 'react';
import { Button, Form } from 'antd';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';
import { RootState } from '../reducers';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const LoginWrapper = styled(Form)`
  padding: 10px;
`;
interface IProps {
}

const LoginForm = ({ }: IProps) => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state: RootState) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <LoginWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
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
        <Button type="primary" htmlType="submit" loading={logInLoading}>
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

export default LoginForm;
