import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import { firebase } from "./util/firebase";
import { readUserAction } from "./redux/userDuck";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import Surveys from "./components/Surveys";
import NewSurvey from "./components/NewSurvey";

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(null);

  // const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    firebase.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home");
        setFirebaseUser(user);
        dispatch(readUserAction(user));
      } else {
        setFirebaseUser(null);
        dispatch(readUserAction(null));
        navigate("/");
      }
    });
  }, []);

  return firebaseUser !== null ? (
    <div>
      <Navbar />

      <div className="main-section">
        <Routes>
          <Route path="/home" exact element={<Home />}></Route>
          <Route path="/surveys" exact element={<Surveys />}></Route>
          <Route path="/newSurvey" exact element={<NewSurvey />}></Route>
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />
    </div>
  );
}

export default App;
