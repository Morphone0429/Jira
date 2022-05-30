import styled from '@emotion/styled';
import { Row } from 'components/lib';
import { useAuth } from 'context/auth-context';
import { ProjectListScreen } from 'screens/project-list';

// flex grid各自的应用场景
// 1.一维布局还是二维布局   一维->flex  二维->grid
// 2.从内容出发还是布局出发
// 内容：你先有一组内容(数组一般不固定)，然后希望他们均匀的分布在容器中  flex
// 布局  先规划网格  数量固定   grid

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>Logo</h3>
          <h3>Logo</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>logout</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

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
