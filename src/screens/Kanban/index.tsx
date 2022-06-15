import styled from '@emotion/styled';
import { ScreenContainer } from 'components/lib';
import React from 'react';
import { useDocumentTitle } from 'utils';
import { useKanbans } from 'utils/kanban';
import KanbanColumn from './kanban-column';
import SearchPanel from './search-panel';
import { useKanbanSearchParams, useProjectInUrl } from './util';
interface IProps {}
const KanbanScreen: React.FC<IProps> = (props) => {
  //const {  } = props;
  useDocumentTitle('看板列表');
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnContainer>
        {(kanbans || []).map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban}>
            {kanban.name}
          </KanbanColumn>
        ))}
      </ColumnContainer>
    </ScreenContainer>
  );
};
export default KanbanScreen;

const ColumnContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  flex: 1;
  /* margin-right: 2rem; */
`;
