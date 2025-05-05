import BasicLayout from '@src/app/shared/components/layout/BasicLayout';

import { Outlet } from 'react-router-dom';

const Page = () => {
  return (
    <BasicLayout className="common-page">
      <Outlet />
    </BasicLayout>
  );
};

export default Page;
