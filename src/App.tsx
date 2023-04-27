import React from 'react';
import './styles/main.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import FilesPage from "./pages/FilesPage/FilesPage";
import Header from "./components/header/Header";
import EditFilePage from "./pages/EditFilePage/EditFilePage";
import {Provider} from "react-redux";
import store from "./redux/store";

const App: React.FC<{}> = () => {
  return (
      <BrowserRouter>
        <Provider store={store}>
          <Header/>
          <Routes>
            <Route index element={<FilesPage/>}/>
            <Route path='/edit/:filename?' element={<EditFilePage/>}/>
          </Routes>
        </Provider>
      </BrowserRouter>
  )
};

export default App