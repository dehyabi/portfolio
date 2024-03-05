import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
import RightSidebar from './Components/rightSidebar';
import Portfolio from './Components/Portfolio';
import Footer from './Components/Footer';

function App() {
  return (

    <>
    <div className="container-fluid">

      <Home />
      
      <RightSidebar />
    
      <Portfolio />
      
      <Footer />
	
     </div>


  </>
  );
}

export default App;
