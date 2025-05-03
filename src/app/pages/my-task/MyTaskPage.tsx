import CreateUpdateTaskModal from '@src/app/shared/components/CreateUpdateTaskModal';
import BasicLayout from '@src/app/shared/components/layout/BasicLayout';
import { Outlet } from 'react-router-dom';

const MyTaskPage = () => {
  return (
    <>
      <CreateUpdateTaskModal />
      <BasicLayout className="common-page my-tasks-page">
        <Outlet />
      </BasicLayout>
    </>
  );
};

export default MyTaskPage;
