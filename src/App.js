import Layout from "./components/Layout/Layout";
import MainHeader from "./components/Layout/MainHeader";
import NavBar from "./components/Layout/NavBar";
import AboutMe from "./components/Layout/AboutMe";
import ProjectList from "./components/Layout/ProjectList";
import ContactMe from "./components/Layout/ContactMe";

function App() {
  return (
    <div>
      <Layout>
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
