import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import '../stylesheets/sass/style.scss';
import LoadingLayer from './shared/components/LoadingLayer';
import { AuthProvider } from './shared/contexts/auth.context';

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <LoadingLayer />
        <ToastContainer
          position="bottom-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
        />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
