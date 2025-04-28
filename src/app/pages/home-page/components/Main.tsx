import { useState } from 'react';
import Sidebar from '../../../shared/components/Sidebar';
import { SidebarTabs } from '../../../utils/constants/sidebar-tabs';

const Main = () => {
  const [currentTab, setCurrentTab] = useState(SidebarTabs.DASHBOARD);

  const onChangeTab = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    newTab: SidebarTabs
  ) => {
    e.preventDefault();
    setCurrentTab(newTab);
  };

  return (
    <main className="home-page">
      <section className="section section-app">
        <div className="container">
          <div className="section-content">
            <Sidebar currentTab={currentTab} onChangeTab={onChangeTab} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
