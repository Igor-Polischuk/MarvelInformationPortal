import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppHeader from '../AppHeader/AppHeader'

import { MainPage, ComicsPage, Page404, SingleDetailPage, SingleComicPage, SingleCharPage } from "../pages";



import './app.scss'

function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main className="main">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path='/comics' element={<ComicsPage />} />
            <Route path='/comics/:id' element={<SingleDetailPage type="comic" Component={SingleComicPage}/>} />
            <Route path='/character/:id' element={<SingleDetailPage type="character" Component={SingleCharPage}/>} />
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}


export default App;
