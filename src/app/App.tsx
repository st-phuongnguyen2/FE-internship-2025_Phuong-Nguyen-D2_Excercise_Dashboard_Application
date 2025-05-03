import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from 'react-toastify';
import '../stylesheets/sass/style.scss';
import LoadingLayer from './shared/components/LoadingLayer';
import { Outlet } from 'react-router-dom';
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
          pauseOnHover /// cos ba o dayl dung co lam cai kieu do
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
