import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Router from './components/layout/Router';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
};

export default App;