import 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/header';
import UserRoutes from './routes';

import './style.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <main>
        <UserRoutes />
      </main>
    </BrowserRouter>
  )
}

export default App;
