import './App.css';
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Landing from "./pages/Landing";
import { API, setAuthToken } from "./config/api";
import Home from './pages/Home';
import Profile from './pages/Profile';
import DetailPost from './pages/DetailPost';
import EditProfile from './pages/EditProfile';
import Upload from './pages/Upload';
import Hired from './pages/Hired';
import MyOrder from './pages/MyOrder';
import MyOffer from './pages/MyOffer';
import DetailUser from './pages/DetailUser';
import SendProject from './pages/SendProject';
import ViewProject from './pages/ViewProject';

// Init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  let navigate = useNavigate();

  // Init user context 
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      navigate('/home');
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/edit-profile' element={<EditProfile />} />
      <Route path='/upload-post' element={<Upload />} />
      <Route path='/hired/:id' element={<Hired />} />
      <Route path='/home' element={<Home />} />
      <Route path='/detail/:id' element={<DetailPost />} />
      <Route path='/detail-user/:id' element={<DetailUser />} />
      <Route path='/myorder' element={<MyOrder />} />
      <Route path='/myoffer' element={<MyOffer />} />
      <Route path='/sendproject/:id' element={<SendProject />} />
      <Route path='/viewproject/:id' element={<ViewProject />} />

    </Routes>
  );
}

export default App;
