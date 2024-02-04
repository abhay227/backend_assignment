import Main from './components/Main';
import { Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Main2 from './components/Main2';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}
         />
        <Route path="/Mains" element={<Main/>}
        />
        <Route path="/Mains2" element={<Main2/>}
        />
      </Routes>
    </div>
  );
}

export default App;
