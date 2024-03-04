import DehyaNotes from './Assets/dehya-notes-fe.png';
import Blackwood from './Assets/blackwood.png';

import Laravel from './Assets/laravel.png';
import Mysql from './Assets/mysql.png';
import Bootstrap from './Assets/bootstrap.png';
import React from './Assets/react.png';
import Nodejs from './Assets/nodejs.png';


export default function Portfolio () {
 return (
<div id='portfolio' className='row dehya-portfolio-wrapper'>   <div className='col pt-5'>
 <h1 className='portfolio text-center p-3 mb-5'>PORTFOLIO</h1>
 
  <div className='row'>
   <div className='col-md portfolio-left p-0 pt-2'>
   <div>
    <a href='https://blackwood.id' target='_blank' rel='noreferrer'>
    <img className='pf-left' src={Blackwood} alt='Blackwood' />

   </a></div>

   <div className='text-center mt-2'><a href='https://blackwood.id' target='_blank' rel='noreferrer'>Blackwood</a> | 
	
<span> <img className='tech-stack me-2 laravel-icon' src={Laravel} alt='Laravel Icon' /></span> 
<span><img className='tech-stack me-2 mysql-icon' src={Mysql} alt='MySQL Icon' /></span> 
<span><img className='tech-stack bootstrap-icon' src={Bootstrap} alt='Bootstrap Icon'/></span> 
</div>
   </div>

   <div className='col-md portfolio-right p-0 pt-2'>
   <div>
    <a href='https://dehya-notes-fe.netlify.app' target='_blank' rel='noreferrer'>
    <img className='pf-right' src={DehyaNotes} alt='Notes App' />

   </a></div>
   <div className='text-center mt-2'><a href='https://dehya-notes-fe.netlify.app' target='_blank' rel='noreferrer'>Notes App</a> |

<span> <img className='tech-stack me-2 react-icon' src={React} alt='React Icon' /></span> 
<span><img className='tech-stack me-2 nodejs-icon' src={Nodejs} alt='NodeJS Icon' /></span> 
<span><img className='tech-stack bootstrap-icon' src={Bootstrap} alt='Bootstrap Icon'/></span> 
</div>
   </div>
  </div>
 </div>
</div> 
 );

}
