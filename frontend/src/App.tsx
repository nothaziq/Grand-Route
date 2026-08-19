import { BrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { AppRoutes } from "./routes/AppRoutes";
import { useStructuredData } from "./hooks/useStructuredData";

function App() {
  useStructuredData();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
