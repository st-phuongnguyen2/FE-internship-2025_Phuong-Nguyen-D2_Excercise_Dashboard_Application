import CircularProgress from '@mui/material/CircularProgress';

import { useAppSelector } from '@src/app/shared/hooks/redux-hook';

const LoadingLayer = () => {
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  function renderLoadingLayer() {
    return isLoading ? (
      <div className="loading-container">
        <CircularProgress className="icon" />
      </div>
    ) : null;
  }

  return <>{renderLoadingLayer()}</>;
};

export default LoadingLayer;
