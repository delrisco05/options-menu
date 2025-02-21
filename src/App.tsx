import './App.css'
import Router from "./routes/router";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { Spinner, Toast } from "remoteUtilities/components-mf-utilities";
import { setSystemStore } from './redux/slices';

function App() {
  const dispatch = useAppDispatch();
  const dataSystem = useAppSelector((state) => state.dataSystem);

  const handleCloseToast = () => {
    dispatch(setSystemStore({ toast: false, toastMessage: '' }));
  };

  return (
    <>
      <div className="bg-[#F4F4F4] text-[#3D3D3D] min-h-screen flex flex-col">
        <div className='flex flex-col w-full mx-auto'>
          <Router />
        </div>
      </div>
      {dataSystem.loading && <Spinner />}
      {dataSystem.toast && <Toast text={dataSystem.toastMessage} onClose={handleCloseToast} />}
    </>
  )
}

export default App