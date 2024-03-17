import DehyaNotes from './Assets/dehya-notes-fe.webp';
import Blackwood from './Assets/blackwood.webp';
import At2 from './Assets/at2.webp';
import Trieltree from './Assets/trieltree.webp';

import Laravel from './Assets/laravel.png';
import Mysql from './Assets/mysql.png';
import Bootstrap from './Assets/bootstrap.png';
import React from './Assets/react.png';
import Nodejs from './Assets/nodejs.png';
import Html from './Assets/html.png';
import Css from './Assets/css.png';
import Tailwindcss from './Assets/tailwindcss.png';


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

   <div className='text-center mt-2 tech-stack-link'><a href='https://blackwood.id' target='_blank' rel='noreferrer'>Blackwood</a> | 
	
<span> <img className='tech-stack me-2 laravel-icon' src={Laravel} alt='Laravel Icon' title='Laravel' /></span> 
<span><img className='tech-stack me-2 mysql-icon' src={Mysql} alt='MySQL Icon' title='MySQL' /></span> 
<span><img className='tech-stack bootstrap-icon' src={Bootstrap} alt='Bootstrap Icon' title='Bootstrap' /></span> 
</div>
   </div>

   <div className='col-md portfolio-right p-0 pt-2'>
   <div>
    <a href='https://dehya-notes-fe.netlify.app' target='_blank' rel='noreferrer'>
    <img className='pf-right' src={DehyaNotes} alt='Notes App' />

   </a></div>
   <div className='text-center mt-2 tech-stack-link'><a href='https://dehya-notes-fe.netlify.app' target='_blank' rel='noreferrer'>Notes App</a> |

<span> <img className='tech-stack me-2 react-icon' src={React} alt='React Icon' title='React'/></span> 
<span><img className='tech-stack me-2 nodejs-icon' src={Nodejs} alt='NodeJS Icon' title='NodeJS' /></span> 
<span><img className='tech-stack bootstrap-icon' src={Bootstrap} alt='Bootstrap Icon' title='Bootstrap'/></span> 
</div>
   </div>
  </div>


  <div className='row my-5'>
   <div className='col-md portfolio-left p-0 pt-2'>
   <div>
    <a href='https://trieltree.com' target='_blank' rel='noreferrer'>
    <img className='pf-left' src={Trieltree} alt='PT. Tri Eltree Elemen' />

   </a></div>

   <div className='text-center mt-2 tech-stack-link'><a href='https://trieltree.com' target='_blank' rel='noreferrer'>PT. Tri Eltree Elemen</a> | 
	
<span> <img className='tech-stack me-2 html-icon' src={Html} alt='HTML Icon' title='HTML' /></span> 
<span><img className='tech-stack me-2 css-icon' src={Css} alt='CSS Icon' title='CSS' /></span> 
<span><img className='tech-stack bootstrap-icon' src={Bootstrap} alt='Bootstrap Icon' title='Bootstrap' /></span> 
</div>
   </div>

   <div className='col-md portfolio-right p-0 pt-2'>
   <div>
    <a href='https://at2.co.id' target='_blank' rel='noreferrer'>
    <img className='pf-right' src={At2} alt='PT. Anomali Trans Teknologi' />

   </a></div>
   <div className='text-center mt-2 tech-stack-link'><a href='https://at2.co.id' target='_blank' rel='noreferrer'>PT. Anomali Trans Teknologi</a> |

<span> <img className='tech-stack me-2 html-icon' src={Html} alt='HTML Icon' title='HTML'/></span> 
<span><img className='tech-stack me-2 css-icon' src={Css} alt='CSS Icon' title='CSS' /></span> 
<span><img className='tech-stack tailwindcss-icon' src={Tailwindcss} alt='Tailwindcss Icon' title='Tailwindcss'/></span> 
</div>
   </div>
  </div>
 </div>
</div> 
 );

}
