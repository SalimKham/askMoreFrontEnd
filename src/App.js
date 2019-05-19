import React, { Component } from "react";

import Header from "./components/Layout/Header";
import Landing from "./components/Layout/Landing";
import Login from "./components/users/Login";
import Confirmation from "./components/users/Confirmation";
import Register from "./components/users/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from 'jwt-decode';
import setJWTToken from "./utils/setJWTToken"
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/userActions";
import Profile from "./components/users/Profile";
import UserList from "./components/Admin/UserList";
import GroupeList from "./components/Lists/GroupeList";
import FieldList from "./components/Admin/FieldList";
import SubjectList from "./components/Admin/SubjectList";
import GroupeStudentList from "./components/Lists/GroupeStudentList";
import AddTutorial from "./components/Tutorials/AddTutorial";
import ViewTuturial from "./components/Tutorials/ViewTuturial";
import addQuestionnary from "./components/Questionnary/addQuestionnary";
import Tutorials from "./components/Lists/Tutorials";
import PR from "./components/users/PR";

const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJWTToken(jwtToken);
  const decode_jwtToken = jwt_decode(jwtToken);

  const currentTime = Date.now() / 1000;
  if (decode_jwtToken.exp < currentTime) {
    logout();
    window.location.href = "/";
  } else {
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: decode_jwtToken
    })
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/register" component={Register} />
            <Route exact path="/users" component={UserList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/groupes" component={GroupeList} />
            <Route exact path="/groupes/students/" component={GroupeStudentList} />
            <Route exact path="/fields" component={FieldList} />
            <Route exact path="/subjects" component={SubjectList} />
            <Route exact path="/newTutorial" component={AddTutorial} />
            <Route exact path="/viewTutorial/:id" component={ViewTuturial} />
            <Route exact path="/confirmation/:id" component={Confirmation} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/newQuestionnary/:id" component={addQuestionnary} />
            <Route exact path="/" component={Landing} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
