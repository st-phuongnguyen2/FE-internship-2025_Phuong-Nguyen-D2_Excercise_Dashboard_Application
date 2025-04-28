import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../stylesheets/sass/style.scss';
import { router } from './router';
import LoadingLayer from './shared/components/LoadingLayer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
        <RouterProvider router={router} />
      </LocalizationProvider>
    </>
  );
}

export default App;
