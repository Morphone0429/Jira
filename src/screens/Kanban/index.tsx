import styled from '@emotion/styled';
import { Spin } from 'antd';
import { ScreenContainer } from 'components/lib';
import React from 'react';
import { useDocumentTitle } from 'utils';
import { useKanbans } from 'utils/kanban';
import { useTasks } from 'utils/task';
import CreateKanban from './create-kanban';
import KanbanColumn from './kanban-column';
import SearchPanel from './search-panel';
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from './util';
interface IProps {}
const KanbanScreen: React.FC<IProps> = (props) => {
  //const {  } = props;
  useDocumentTitle('看板列表');
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams());
  const { isLoading: taskisLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskisLoading || kanbanIsLoading;

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size="large"></Spin>
      ) : (
        <ColumnContainer>
          {(kanbans || []).map((kanban) => (
            <KanbanColumn key={kanban.id} kanban={kanban}>
              {kanban.name}
            </KanbanColumn>
          ))}
          <CreateKanban />
        </ColumnContainer>
      )}
    </ScreenContainer>
  );
};
export default KanbanScreen;

const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
  /* margin-right: 2rem; */
`;
