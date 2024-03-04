import Home from './homeIcon';
import Linkedin from './linkedinIcon';             
import Github from './githubIcon';                 
import Instagram from './instagramIcon';
import Youtube from './youtubeIcon';

export default function RightSidebar () {
 return (
<div className='right-sidebar p-1 py-3 me-3'>
     <div><a href='#home'><Home fillColor='white' /></a></div>
     <div className='text-center vertical-line'>|</div>            <div><a href='https://linkedin.com/in/dehyabi' target='_b
lank' rel='noreferrer'><Linkedin fillColor='white' /></a></div>                                                                  <div className='text-center vertical-line'>|</div>            <div><a href='https://github.com/dehyabi' target='_blank' rel='noreferrer'><Github fillColor='white' /></a></div>           <div className='text-center vertical-line'>|</div>            <div><a href='https://instagram.com/dehyabi' target='_blank' rel='noreferrer'><Instagram fillColor='white' /></a></div>     <div className='text-center vertical-line'>|</div>
     <div><a href='https://youtube.com/@dehyabi' target='_blan
k' rel='noreferrer'><Youtube fillColor='white' /></a></div>       </div>
 );

}
