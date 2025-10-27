import './App.css'
import {motion, useAnimation} from 'framer-motion';
import Flash from './components/Flash/Flash';

function App() {
  const controls = useAnimation();

  return (
    <Flash />
  );
}

export default App
