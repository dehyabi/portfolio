import DQLogo from './Assets/dehya-qalbi.png';

export default function Footer () {

 const d = new Date();
 const currentYear = d.getFullYear();

 return (
 <div className='row'>
  <div className='col'>
  <footer>
     <a href='https://dehyabi.netlify.app' target='_blank' rel='noreferrer'>
<img className='dq-logo' src={DQLogo} alt='dq-logo' />
 </a> &#169; {currentYear} <a href='https://dehyabi.netlify.app' target='_blank' rel='noreferrer'>Dehya Qalbi</a>
  </footer>
  </div>
 </div>
 );

}
