import { Route, Routes, Router, BrowserRouter, Outlet } from 'react-router-dom';
import Face from './page/Face/Face';
import Chat from './page/Chat/Chat';
import PageAut from './page/PageAut/PageAut';
import PageReg from './page/PageReg/PageReg';
import { Link } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route>
          <Route path='/' element={<Face />} />
          <Route path='/PageAut' element={<PageAut />} />
          <Route path='/PageReg' element={<PageReg />} />
          <Route path='/Chat' element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
