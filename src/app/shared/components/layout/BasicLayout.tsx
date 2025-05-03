import { JSX } from 'react';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
  children: JSX.Element;
  className: string;
};

const BasicLayout = ({ children, className }: Props) => {
  return (
    <>
      <Header />
      <main className={className}>
        <section className="section section-app">
          <div className="container">
            <div className="section-content">
              <Sidebar />
              <div className="main-content">{children}</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BasicLayout;
