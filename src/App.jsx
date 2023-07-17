import { NavBar, PageContent } from "./components";
import { CityContextProvider } from "./context/cityContext";

function App() {
  return (
    <CityContextProvider>
      <NavBar />
      <PageContent />
    </CityContextProvider>
  );
}

export default App;
