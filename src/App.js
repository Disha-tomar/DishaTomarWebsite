import Layout from "./components/Layout/Layout";
import MainHeader from "./components/Layout/MainHeader";
import NavBar from "./components/Layout/NavBar";

function App() {
  return (
    <div>
      <Layout>
        <NavBar />
        <MainHeader />
      </Layout>
    </div>
  );
}

export default App;
