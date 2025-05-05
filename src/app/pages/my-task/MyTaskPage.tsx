import CreateUpdateTaskModal from '@src/app/shared/components/CreateUpdateTaskModal';

import { Outlet } from 'react-router-dom';

const MyTaskPage = () => {
  return (
    <>
      <CreateUpdateTaskModal />
      <div className="my-tasks-page">
        <Outlet />
      </div>
    </>
  );
};

export default MyTaskPage;
