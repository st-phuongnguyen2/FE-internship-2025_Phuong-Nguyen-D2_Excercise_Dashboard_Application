import { useState } from 'react';
import Sidebar from '../../../shared/components/Sidebar';
import { SidebarTabs } from '../../../utils/constants/sidebar-tabs';
import Dashboard from './Dashboard';
import MyTask from './MyTasks';
import CreateUpdateTaskModal from '../../../shared/components/CreateUpdateTaskModal';

const Main = () => {
  const [currentTab, setCurrentTab] = useState(SidebarTabs.DASHBOARD);

  function renderCurrentTab() {
    if (currentTab === SidebarTabs.DASHBOARD) {
      return <Dashboard />;
    } else if (currentTab === SidebarTabs.MY_TASKS) {
      return <MyTask />;
    }
  }

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
            <CreateUpdateTaskModal />
            <Sidebar currentTab={currentTab} onChangeTab={onChangeTab} />
            <div className="main-content">{renderCurrentTab()}</div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
