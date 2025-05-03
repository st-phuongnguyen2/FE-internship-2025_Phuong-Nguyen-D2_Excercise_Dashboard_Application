import CreateUpdateTaskModal from '@src/app/shared/components/CreateUpdateTaskModal';
import BasicLayout from '@src/app/shared/components/layout/BasicLayout';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <CreateUpdateTaskModal />
      <BasicLayout className="common-page home-page">
        <Outlet />
      </BasicLayout>
    </>
  );
};

export default HomePage;
