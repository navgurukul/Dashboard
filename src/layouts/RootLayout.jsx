// rrd imports
import { Outlet } from 'react-router-dom';
// import CreateSpaceModal from '../components/PartnersList/PartnerSpace/CreateSpaceModal';

function RootLayout() {
  return (
    <main>
    {/* <CreateSpaceModal/> */}
      <Outlet />
    </main>
  );
}

export default RootLayout;
