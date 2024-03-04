export default function Footer () {

 const d = new Date();
 const currentYear = d.getFullYear();

 return (
 <div className='row'>
  <div className='col'>
  <footer>
      &#169; {currentYear} Dehya Qalbi's Portfolio
  </footer>
  </div>
 </div>
 );

}
