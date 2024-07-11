import Header from '@/src/components/Header/Header';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import { IBasicLayout } from '@/src/types/types';

const MainLayout = ({ children }: IBasicLayout) => {
  return (
    <>
      <Header />

      <div className="layout">
        <Sidebar />

        <main className="layout-content">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
