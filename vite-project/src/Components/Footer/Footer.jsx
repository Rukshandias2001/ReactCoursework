import React from 'react'
import facebook from '../Footer/Icons/facebook.svg'
import google from '../Footer/Icons/google.svg'
import instagram from '../Footer/Icons/instagram.svg'
import telephone from '../Footer/Icons/telephone-fill.svg'
import twitter from '../Footer/Icons/twitter.svg'
import '../CSS/footer.css'



function Footer() {
  return (
   <footer className='footercontain'>
    <section className='listImage'>
      <div className='image'>
        <div className="iconimage">
          <img src={facebook}  alt="facebook" />
        </div>
        <div className="iconimage">
          <img src={google} alt="facebook" />
        </div>
        <div className="iconimage">
        <img src={instagram} alt="facebook" />
        </div>
        <div className="iconimage">
          <img src={telephone} alt="" />
        </div>
        <div className="iconimage">
        <img src={twitter} alt="facebook" />
        </div>
      </div>
      
      <section className='list-of-element'>
        <ul className='lists'>
          <li>Home</li>
          <li>News</li>
          <li>About</li>
          <li>Contact Us</li>
          <li>Our Team</li>
        </ul>
      </section>
    </section>
   </footer>
  )
}

export default Footer
