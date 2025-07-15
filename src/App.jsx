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
// import ContactUs from './components/ContactUs';

function App() {

  return (
    <div>
      <Home />
      <Feature />
      <About />
      <HowWork />
      <Testimonial />
      {/* <ContactUs /> */}
      {/* <ScanQr /> */}
      <DownloadSection />
    </div>
  )
}

export default App;
