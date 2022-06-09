import styled from '@emotion/styled';
import { Button, Dropdown, Menu } from 'antd';
import { ButtonNoPadding, Row } from 'components/lib';
import { useAuth } from 'context/auth-context';
import { ProjectListScreen } from 'screens/project-list';
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import ProjectScreen from 'screens/project';
import { resetRoute } from 'utils';
import { useState } from 'react';
import ProjectModal from 'screens/project-list/project-modal';
import ProjectPopover from 'components/project-popover';

// flex grid各自的应用场景
// 1.一维布局还是二维布局   一维->flex  二维->grid
// 2.从内容出发还是布局出发
// 内容：你先有一组内容(数组一般不固定)，然后希望他们均匀的分布在容器中  flex
// 布局  先规划网格  数量固定   grid

export const AuthenticatedApp = () => {
  // const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen />}></Route>
            <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
            <Route path="*" element={<Navigate to="/projects" replace={true} />} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal />
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  const menu = (
    <Menu
      items={[
        {
          key: 'logout',
          label: (
            <Button type="link" onClick={logout}>
              登出
            </Button>
          ),
        },
      ]}
    />
  );
  return (
    <Header between>
      <HeaderLeft>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
        </ButtonNoPadding>
        <ProjectPopover></ProjectPopover>
        <h3>Logo</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button type="link">hi {user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};
// const f = () => d   const d = 1   虽然f声明了d 但是并没有运行f 所以不会报错
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
