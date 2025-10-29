import './App.css'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Flash from './components/Flash/Flash';
import Detail from './components/Flash/Detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/' index element={<Flash />} />
        <Route path='/:id' index element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
