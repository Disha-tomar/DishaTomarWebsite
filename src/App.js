import Layout from "./components/Layout/Layout";
import MainHeader from "./components/Layout/MainHeader";
import NavBar from "./components/Layout/NavBar";
import AboutMe from "./components/Layout/AboutMe";
import ProjectList from "./components/Layout/ProjectList";
import ContactMe from "./components/Layout/ContactMe";
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div>
      <Layout>
       <Helmet>
        <script src='https://www.noupe.com/embed/0197bc100b207fae830d19be52bd04e1ae22.js'></script>
      </Helmet>
        <NavBar />
        <MainHeader />

        <AboutMe />

        <ProjectList />
        <ContactMe />
      </Layout>
    </div>
  );
}

export default App;
