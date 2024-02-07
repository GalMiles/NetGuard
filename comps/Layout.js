import Footer from "./Footer";
import Navbar from "./Navbar";
import SecAnalysis from "./SecAnalysis";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <div className="content">
        <center>
          <div className="logo">
            <Image src="/logo5.png" alt="site logo" width={500} height={500} />
          </div>
          {children}
          <Footer />
        </center>
      </div>
    </>
  );
};

export default Layout;
