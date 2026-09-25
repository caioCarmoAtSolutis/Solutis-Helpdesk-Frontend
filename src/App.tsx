import NavBar from "./components/NavBar";
import ContentBox from "./components/ContentBox";
import Dashboard from "./components/Dashboard";
import "./pages/Page.css";

function App() {
  return (
    <div className="page">
      <NavBar />
      <ContentBox>
        <Dashboard />
      </ContentBox>
    </div>
  );
}

export default App;
