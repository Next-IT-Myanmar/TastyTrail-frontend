import './App.css'
import Header from './components/LandingNavbar'
import Home from './components/Home';
import Feature from './components/Feature';
import Testimonial from './components/Testimonial';
import About from './components/About';
import HowWork from './components/HowWork';
import HomeLayout from './layouts/HomeLayout';
import DownloadSection from './components/DownloadSection';
import ScanQr from './components/ScanQr';

function App() {

  return (
    <div>
      <Home />
      {/* <Counter /> */}
      <Feature />
      <About />
      <HowWork />
      <Testimonial />
      {/* <ScanQr /> */}
      <DownloadSection />
      {/* <CounterTwo /> */}
    </div>
  )
}

export default App;
