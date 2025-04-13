import './App.css'
import Header from './components/LandingNavbar'
import Home from './components/Home';
import Feature from './components/Feature';
import Counter from './pages/Counter';
import CounterTwo from './pages/CounterTwo';
import Testimonial from './components/Testimonial';
import About from './components/About';
import HowWork from './components/HowWork';
import HomeLayout from './layouts/HomeLayout';
import DownloadSection from './components/downloadsection';

function App() {

  return (
    <div className="pt-[72px]">
      <Home />
      {/* <Counter /> */}
      <Feature />
      <About />
      <HowWork />
      <Testimonial />
      <DownloadSection />
      {/* <CounterTwo /> */}
    </div>
  )
}

export default App;
