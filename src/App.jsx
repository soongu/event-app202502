import './App.css';
import router from './routes/route-config';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
