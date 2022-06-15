import { Input } from 'antd';
import React, { useState } from 'react';
import { useAddKanban } from 'utils/kanban';
import { Container } from './kanban-column';
import { useKanbansQueryKey, useProjectIdInUrl } from './util';
interface IProps {}
const CreateKanban: React.FC<IProps> = (props) => {
  const [name, setName] = useState('');
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());
  const submit = async () => {
    await addKanban({ projectId, name: name });
    setName('');
  };

  return (
    <Container>
      <Input
        size="large"
        placeholder="新建看板名称"
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      ></Input>
    </Container>
  );
};
export default CreateKanban;
