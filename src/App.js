import { useLayoutEffect, useState } from "react";
import {Route, Routes} from 'react-router-dom'
import GoogleAuthSignIn from "./components/GoogleAuthSignIn";
import { getAuth } from "firebase/auth";
import Home from "./components/Home";
import TaskAnalytics from "./components/TaskAnalytics";
import PageNotFound from "./components/PageNotFound";
import './styles/App.css'
import {ReactComponent as Logo} from './assets/logo.svg'

function App() {
  const [isAuth, setAuthStatus] = useState(false)

  const updateAuthStatus = (authValue) =>{
    setAuthStatus(authValue)
  }

  useLayoutEffect(()=>{
    getAuth().onAuthStateChanged((userCred) => {
      if(userCred){
        updateAuthStatus(true)
        userCred.getIdToken().then((token) => {
          
        })
      }
    })
  }, [isAuth])


  const screenToShow = () => {
    if(isAuth){
      return <Home />
    }else{
      return(
        <div className="AppSignInContainerWrapper">
          <div className="AppSignInLogoContainerWrapper">
            <Logo className="ApplicationLogo"/>
          </div>
          <div className="AppSignInButtonContainerWrapper">
            <GoogleAuthSignIn authCheck={{'authStatus': isAuth, 'authStatusChanger': updateAuthStatus}} />
          </div>
        </div>
      )
    }
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={screenToShow()} />
        <Route path='tasks/:taskId' element={<TaskAnalytics/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
