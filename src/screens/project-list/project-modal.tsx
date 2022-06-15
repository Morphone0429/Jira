import styled from '@emotion/styled';
import { Button, Drawer, Form, Input, Spin } from 'antd';
import useForm from 'antd/lib/form/hooks/useForm';
import { ErrorBox } from 'components/lib';
import UserSelect from 'components/user-select';
import React, { useEffect } from 'react';
import { useAddProject, useEditProject } from 'utils/project';
import { useProjectModal, useProjectsQueryKey } from './util';
interface IProps {}
const ProjectModal: React.FC<IProps> = (props) => {
  // const {  } = props;
  const { projectModalOpen, close, editingProject, isLoading } = useProjectModal();

  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectsQueryKey()); // 异步async
  const [form] = useForm();

  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingProject); // 重置表单
  }, [editingProject, form]);

  const title = editingProject ? '编辑项目' : '创建项目';
  return (
    <Drawer visible={projectModalOpen} width={'100%'} onClose={close} forceRender={true}>
      <Container>
        {isLoading ? (
          <Spin size="large"></Spin>
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form form={form} layout={'vertical'} style={{ width: '40rem' }} onFinish={onFinish}>
              <Form.Item label="名称" name={'name'} rules={[{ required: true, message: '请输入项目名' }]}>
                <Input placeholder="请输入项目名称"></Input>
              </Form.Item>
              <Form.Item label="部门" name={'organization'} rules={[{ required: true, message: '请输入部门名' }]}>
                <Input placeholder="请输入部门名称"></Input>
              </Form.Item>

              <Form.Item label="负责人" name={'personId'}>
                <UserSelect defaultOptionName="负责人" />
              </Form.Item>

              <Form.Item style={{ textAlign: 'right' }}>
                <Button loading={mutateLoading} type="primary" htmlType={'submit'}>
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};
export default ProjectModal;

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
