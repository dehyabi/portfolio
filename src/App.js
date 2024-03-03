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
    <div className="container-fluid">
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

	  <a href='#portfolio'><button className='pf-button mt-3'><h2 className='p-2 px-3 pb-0'>PORTFOLIO</h2></button></a>
	</div>
      </div>
      <div className='col-md dehya-photo-wrapper p-0'>
       <img className='dehya-photo' src={profile_nobg} />

  
    <div className='right-sidebar p-1 py-3 me-3'>
     <div><a href='https://dehyabi.netlify.app' target='_blank' rel='noreferrer'><Home fillColor='white' /></a></div>
     <div className='text-center vertical-line'>|</div>
     <div><a href='https://linkedin.com/in/dehyabi' target='_blank' rel='noreferrer'><Linkedin fillColor='white' /></a></div>
     <div className='text-center vertical-line'>|</div>
     <div><a href='https://github.com/dehyabi' target='_blank' rel='noreferrer'><Github fillColor='white' /></a></div>
     <div className='text-center vertical-line'>|</div>
     <div><a href='https://instagram.com/dehyabi' target='_blank' rel='noreferrer'><Instagram fillColor='white' /></a></div>
     <div className='text-center vertical-line'>|</div>
     <div><a href='https://youtube.com/@dehyabi' target='_blank' rel='noreferrer'><Youtube fillColor='white' /></a></div>
    </div>

      </div>
     </div>
       <div id='portfolio' className='row'>
        <div className='col dehya-portfolio-wrapper pt-5'>
         <h1 className='text-center'>PORTFOLIO</h1>
	</div>
       </div>
    </div>


  </>
  );
}

export default App;
