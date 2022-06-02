import React from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router';
import KanbanScreen from 'screens/Kanban';
import EpicScreen from 'screens/Epic';

interface IProps {}
const ProjectScreen: React.FC<IProps> = (props) => {
  //const {  } = props;
  return (
    <div>
      <p>ProjectScreen</p>
      {/* <Link to={'/kanban'}>看板</Link>  /这里代表root路由*/}
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanbanScreen></KanbanScreen>}></Route>
        <Route path={'/epic'} element={<EpicScreen></EpicScreen>}></Route>
        <Route
          path="*"
          element={
            <Navigate
              to={window.location.pathname + '/kanban'}
              replace={true}
            />
          }
        />
      </Routes>
    </div>
  );
};
export default ProjectScreen;
