import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Home from './routes/Home';
import Account from './routes/Account';
import Admin from './routes/Admin';
import Ads from './routes/Ads';
import Logout from './routes/Logout';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/account" component={Account} />
          <Route path="/admin" component={Admin} />
          <Route path="/ads" component={Ads} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" element={Login} />
          <Route path="/signup" element={Signup} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
