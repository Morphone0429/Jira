import { useAuth } from 'context/auth-context';
import { Form, Input, Button } from 'antd';
import { LongButton } from 'unauthenticated-app';
import { useAsync } from 'utils/use-async';
import { useDispatch } from 'react-redux';
export const apiUrl = process.env.REACT_APP_API_URL;
export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true }); // 不使用这里的error原因是  setError 是异步操作 不能实时获取最新值  不要和同步代码混一起
  // const dispatch = useDispatch();
  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      await run(login(values));
      // await login(values);
    } catch (e: any) {
      onError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名" type="text" id={'username'} />
      </Form.Item>
      <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder="密码" type="password" id={'username'} />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType={'submit'} loading={isLoading}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
