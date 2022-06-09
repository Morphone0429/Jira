import styled from '@emotion/styled';
import { Button, Spin, Typography } from 'antd';
import { DevTools } from 'jira-dev-tool';

// 布局组件
export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? 'space-between' : undefined)};
  margin-bottom: ${(props) => props.marginBottom + 'rem'};
  > * {
    //直接子元素
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
  }
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 全局loading
export const FullPageLoading = () => {
  return (
    <FullPage>
      <Spin size="large"></Spin>
    </FullPage>
  );
};
// 全局报错信息
export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <ErrorBox error={error} />
    {/* <Typography.Text type="danger">{error?.message}</Typography.Text> */}
  </FullPage>
);

// 类型守卫
const isError = (value: any): value is Error => value?.message; //  isError 这里返回ture  传入的value 就是Error类型

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type="danger">{error?.message}</Typography.Text>;
  }
  return null;
};

// no padding button
export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;
