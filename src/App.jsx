import styles from "./style";
import {
  Business,
  CTA,
  Footer,
  Navbar,
  Testimonials,
  Hero,
  Project,
  Error,
  ProjectCard,
} from "./components";
import { Outlet } from "react-router-dom";
const App = () => (
  <div className='bg-primary w-full overflow-hidden flex flex-col min-h-screen'>
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary flex-grow ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Outlet />
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Footer />
      </div>
    </div>
  </div>
);

export default App;
