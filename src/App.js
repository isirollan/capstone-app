
import './App.css';
import React, {createContext, useState} from 'react'; 
//this will mean that we can create styles simply, without having css files for each component :)
import { ThemeProvider, createTheme} from '@mui/material/styles'; 
//reset the CSS so it looks the same in all browsers
import {CssBaseline} from '@mui/material'; 
// This will help us naviagte different pages of our webpage
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {withAuthenticator} from '@aws-amplify/ui-react';
import SuccesPage from './SucessPage/SuccessPage';
import MainPage from './MainPage/MainPage';
import Camera from './camera/camera';
import Form from './Form/Form';
import IntermediatePage from './loading-page/loading-page';

//defining the theme (dark, light or custom)
export const apiContext = createContext();

const theme = createTheme({
  palette: {
    mode: 'light'
  }
})

//all the components that are within ThemeProvider will inherit the component from the theme provider (if we don't have css for each one)

function App() {

  const [savefabricResponse, setsavefabricResponse] = useState([])
  const [modelResponse, setmodelResponse] = useState([]);

  return (
    <>
    <apiContext.Provider value = {{savefabricResponse, setsavefabricResponse, modelResponse, setmodelResponse}}>
      <ThemeProvider theme={theme}>
        <CssBaseline/> 
        <Router>
          <Routes>
            <Route path="/" element={<MainPage/>}></Route>
            <Route path="/success" element={<SuccesPage/>}></Route>
            <Route path="/camera" element={<Camera/>}></Route>
            <Route path="/form" element={<Form/>}></Route>
            <Route path="/loading" element={<IntermediatePage/>}></Route>
          </Routes>
        </Router>
      </ThemeProvider>

    </apiContext.Provider>

    </>



  );
}

export default withAuthenticator(App);

//is not compiling correctly when I add the camera, consider add useRef n here as a context> did that, but is still complaining about the rendering (might be a dependency with the original file)

