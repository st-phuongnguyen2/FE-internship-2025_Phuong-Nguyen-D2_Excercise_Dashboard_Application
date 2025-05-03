import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import dashboardIcon from '../../../../assets/icons/dashboard-icon.svg';
import logoutIcon from '../../../../assets/icons/logout-icon.svg';
import { SidebarTabs } from '../../../utils/constants/sidebar-tabs';
import { AuthContext } from '../../contexts/auth.context';
import MyTaskIcon from '../MyTaskIcon';
import { AppRoutes } from '@src/app/core/constants/app-routes';

const Sidebar = () => {
  const location = useLocation();
  const { user, clearUserSession } = useContext(AuthContext);

  const sidebarTab = location.state?.sidebarTab || SidebarTabs.DASHBOARD;

  function checkCurrentTab(checkedTab: SidebarTabs) {
    return sidebarTab === checkedTab ? 'active-card' : '';
  }

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    clearUserSession();
  }

  return (
    <div className="sidebar">
      <div className="section-user-info">
        <span className="username">{user?.fullName}</span>
        <span className="email">{user?.email}</span>
      </div>
      <ul className="list">
        <li className="list-item">
          <Link
            to="/"
            className={`card ${checkCurrentTab(SidebarTabs.DASHBOARD)}`}
            state={{
              sidebarTab: SidebarTabs.DASHBOARD
            }}
          >
            <img src={dashboardIcon} alt="dashboard-icon" className="icon" />
            <span className="title">Dashboard</span>
          </Link>
        </li>
        <li className="list-item">
          <Link
            to={AppRoutes.MY_TASKS}
            className={`card ${checkCurrentTab(SidebarTabs.MY_TASKS)}`}
            state={{
              sidebarTab: SidebarTabs.MY_TASKS
            }}
          >
            <MyTaskIcon />
            <span className="title">My Tasks</span>
          </Link>
        </li>
        <li className="list-item">
          <Link to="/" className="card" onClick={handleLogout}>
            <img src={logoutIcon} alt="dashboard-icon" className="icon" />
            <span className="title">Log out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
