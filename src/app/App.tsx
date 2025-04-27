import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../stylesheets/sass/style.scss';
import { router } from './router';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
