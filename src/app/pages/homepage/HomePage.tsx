import CreateUpdateTaskModal from '@src/app/shared/components/CreateUpdateTaskModal';

import { Outlet } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <CreateUpdateTaskModal />
      <div className="home-page">
        <Outlet />
      </div>
    </>
  );
};

export default HomePage;
