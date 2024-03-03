import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import profile_nobg from './Components/Assets/profile-nobg.png';
import Home from './Components/homeIcon';
import Linkedin from './Components/linkedinIcon';
import Github from './Components/githubIcon';
import Instagram from './Components/instagramIcon';
import Youtube from './Components/youtubeIcon';

function App() {
  return (

    <>
    <div className="section-1 container-fluid">
     <div className='row'>
      <div className='col-md dehya-summary-wrapper d-flex justify-content-center align-items-center'>
	<div className='dehya-summary'>
         <h2>HI THERE!</h2>
         <h1>I'M <span className='dq'>DEHYA QALBI</span></h1>
	  <div className='d-flex'>
            <h5 className='dehya p-1'>FULL STACK DEVELOPER</h5>
	  </div>
	  <p className='mt-3'>
             A full-stack developer with two years of professional experience specializing in web development, project management, agile methodology, and quality assurance testing. Adept at coordinating effectively with development teams, clients, and non-technical stakeholders to execute complex web development projects.
	  </p>

	  <button className='pf-button mt-3'><h2 className='p-2 px-3 pb-0'>PORTFOLIO</h2></button>
	</div>
      </div>
      <div className='col-md dehya-photo-wrapper p-0'>
       <img className='dehya-photo' src={profile_nobg} />

  
    <div className='right-sidebar p-1 py-3 me-3'>
     <div><Home fillColor='white' /></div>
     <div className='text-center vertical-line'>|</div>
     <div><Linkedin fillColor='white' /></div>
     <div className='text-center vertical-line'>|</div>
     <div><Github fillColor='white' /></div>
     <div className='text-center vertical-line'>|</div>
     <div><Instagram fillColor='white' /></div>
     <div className='text-center vertical-line'>|</div>
     <div><Youtube fillColor='white' /></div>
    </div>

      </div>
     </div>
    </div>


    

  </>
  );
}

export default App;
