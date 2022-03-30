import Layout from "./components/Layout/Layout";
import MainHeader from "./components/Layout/MainHeader";
import NavBar from "./components/Layout/NavBar";
import AboutMe from "./components/Layout/AboutMe";
import ProjectList from "./components/Layout/ProjectList";

function App() {
  return (
    <div>
      <Layout>
        <NavBar />
        <MainHeader />
        <AboutMe />
        <ProjectList />
      </Layout>
    </div>
  );
}

export default App;
