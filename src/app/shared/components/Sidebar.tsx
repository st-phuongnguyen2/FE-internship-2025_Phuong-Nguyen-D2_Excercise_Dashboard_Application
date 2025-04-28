import { Link } from 'react-router-dom';
import dashboardIcon from '../../../assets/icons/dashboard-icon.svg';
import logoutIcon from '../../../assets/icons/logout-icon.svg';
import MyTaskIcon from './MyTaskIcon';
import { SidebarTabs } from '../../utils/constants/sidebar-tabs';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hook';
import { logout } from '../../redux-store/auth/users-slice';

interface ISidebarProps {
  currentTab: SidebarTabs;
  onChangeTab: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    newTab: SidebarTabs
  ) => void;
}

const Sidebar = ({ onChangeTab, currentTab }: ISidebarProps) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const dispatch = useAppDispatch();

  function checkCurrentTab(currentTab: SidebarTabs, checkedTab: SidebarTabs) {
    return currentTab === checkedTab ? 'active-card' : '';
  }

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <div className="sidebar">
      <div className="section-user-info">
        <span className="username">{currentUser?.fullName}</span>
        <span className="email">{currentUser?.email}</span>
      </div>
      <ul className="list">
        <li className="list-item">
          <Link
            to="/"
            className={`card ${checkCurrentTab(
              currentTab,
              SidebarTabs.DASHBOARD
            )}`}
            onClick={(e) => onChangeTab(e, SidebarTabs.DASHBOARD)}
          >
            <img src={dashboardIcon} alt="dashboard-icon" className="icon" />
            <span className="title">Dashboard</span>
          </Link>
        </li>
        <li className="list-item">
          <Link
            to="/"
            className={`card ${checkCurrentTab(
              currentTab,
              SidebarTabs.MY_TASKS
            )}`}
            onClick={(e) => onChangeTab(e, SidebarTabs.MY_TASKS)}
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
