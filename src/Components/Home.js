import profile_nobg from './Assets/profile-nobg.webp'

export default function Home () {
 return (
 <div id='home' className='row'>                                <div className='col-md dehya-summary-wrapper d-flex justify-content-center align-items-center p-0'>                           <div className='dehya-summary'>                                <h2>HI THERE!</h2>                                            <h1>I'M <span className='dq'>DEHYA QALBI</span></h1>           <div className='d-flex'>                                        <h5 className='dehya p-1'>FULL STACK DEVELOPER</h5>                                                                       </div>
          <p className='mt-3'>
             A full-stack developer with two years of professional experience specializing in web development, project management, agile methodology, and quality assurance testing. Adept
 at coordinating effectively with development teams, clients,
and non-technical stakeholders to execute complex web developm
ent projects.
          </p>                                                
          <a href='#portfolio'><button className='pf-button mt
-3'><h2 className='p-2 px-3 pb-0'>PORTFOLIO</h2></button></a>
        </div>                                                      </div>                                                        <div className='col-md dehya-photo-wrapper p-0'>
       <img className='dehya-photo' src={profile_nobg} alt='Dehya Qalbi' />                                                                                                                                                                                   </div>                                                       </div>
);

}
