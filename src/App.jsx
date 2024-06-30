import { Route, Routes } from 'react-router-dom';
import Homepage from './component/Homepage/Homepage';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Footer />
    </>

  )
}

export default App;
