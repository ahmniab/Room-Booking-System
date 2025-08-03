import Home from './Pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { globalTheme } from './theme';
import Checkout from './Pages/Checkout'; 
import Confirmation from './Pages/Confirmation';

function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/checkout/:roomId" element={<Checkout/>} />
          <Route path="/confirmation" element={<Confirmation/>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
