import axios from 'axios';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Head from 'next/head';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';

import wrapper, { SagaStore } from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { loadMyInfoRequestAction, SIGN_UP_REQUEST } from '../reducers/user';
import { RootState } from '../reducers';

const ErrorMessage = styled.p`
  color: red;
`;

const SubmitButton = styled(Button)`
  margin-top: 10px;
`;

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector(
    (state: RootState) => state.user,
  );
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e: CheckboxChangeEvent) => {
    setTerm(e.target.checked);
    setTermError(!e.target.checked);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) setPasswordError(true);
    if (!term) setTermError(true);
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);

  useEffect(() => {
    if (me && me.id) {
      router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      router.replace('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      message.error(signUpError);
    }
  }, [signUpError]);

  return (
    <>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-email">이메일</label>
            <br />
            <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
          </div>
          <div>
            <label htmlFor="user-nick">닉네임</label>
            <br />
            <Input
              name="user-nick"
              value={nickname}
              required
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호 체크</label>
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              약관에 동의합니다.
            </Checkbox>
            {termError && (
              <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>
            )}
          </div>
          <SubmitButton
            type="primary"
            htmlType="submit"
            loading={signUpLoading}
          >
            가입하기
          </SubmitButton>
        </Form>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch(loadMyInfoRequestAction());
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask?.toPromise();
});

export default Signup;
