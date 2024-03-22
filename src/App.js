
import './App.css';
import React from 'react'; 
//this will mean that we can create styles simply, without having css files for each component :)
import { ThemeProvider, createTheme} from '@mui/material/styles'; 
//reset the CSS so it looks the same in all browsers
import {CssBaseline} from '@mui/material'; 
// This will help us naviagte different pages of our webpage
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {withAuthenticator} from '@aws-amplify/ui-react';
//import Camera from './camera/camera';
import SuccesPage from './SucessPage/SuccessPage';
import MainPage from './MainPage/MainPage';
import Camera from './camera/camera';
//create a context to hold the refs
//export const CameraContext = createContext();
// establishing all the webpages to display

//defining the theme (dark, light or custom)
const theme = createTheme({
  palette: {
    mode: 'light'
  }
})

//all the components that are within ThemeProvider will inherit the component from the theme provider (if we don't have css for each one)

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/> 
      <Router>
        <Routes>
          <Route path="/" element={<MainPage/>}></Route>
          <Route path="/success" element={<SuccesPage/>}></Route>
          <Route path="/camera" element={<Camera/>}></Route>
        </Routes>
      </Router>
    </ThemeProvider>


  );
}

export default withAuthenticator(App);

//is not compiling correctly when I add the camera, consider add useRef n here as a context> did that, but is still complaining about the rendering (might be a dependency with the original file)

