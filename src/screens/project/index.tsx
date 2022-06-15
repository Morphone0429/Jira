import React from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import KanbanScreen from 'screens/Kanban';
import EpicScreen from 'screens/Epic';
import styled from '@emotion/styled';
import { Menu } from 'antd';

const useRouteType = () => {
  const units = useLocation().pathname.split('/');
  return units[units.length - 1];
};

interface IProps {}
const ProjectScreen: React.FC<IProps> = (props) => {
  const routeType = useRouteType();
  //const {  } = props;
  const items = [
    { label: '看板', key: 'kanban' }, // 菜单项务必填写 key
    { label: '任务组', key: 'epic' },
  ];
  return (
    <Container>
      <Aside>
        <Menu items={items} style={{ width: '16rem' }} selectedKeys={[routeType]}></Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={'/kanban'} element={<KanbanScreen></KanbanScreen>}></Route>
          <Route path={'/epic'} element={<EpicScreen></EpicScreen>}></Route>
          <Route path="*" element={<Navigate to={window.location.pathname + '/kanban'} replace={true} />} />
        </Routes>
      </Main>
    </Container>
  );
};
export default ProjectScreen;

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 -5px rgba(0, 0, 0, 0.1);
  display: flex;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;
