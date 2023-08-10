import React from 'react'
import "./Footer.css"

function Footer() {
  return (
    <footer>
        <h2 className="logo">
          <span>Tunis</span>
          <span>Best</span>
        </h2>
        <p>
          7abit na3mil nafs fikrit EgyBest ama tunisia version besim TunisBest
          <br/>w inchallah when i develop my programming abilities na3mil version o5rin lil website hedha
          <br/>ama matista3malch il website hedha bech titfarij fi 7ajet mo5alfa li din al islem
          <br/><b>" وَلَا تَقْرَبُوا الزِّنَا إِنَّهُ كَانَ فَاحِشَةً وَسَاءَ سَبِيلًا "</b>
        </p>
        <h4>created by khalil andolsi | V 0.1.0</h4>
        <div className="box">
          <span><a href="https://www.facebook.com/khalil.andolsi.161" target='_blanck'><span><i className="fa-brands fa-facebook-f fa-1x"></i></span></a></span>
          <span><a href="https://www.instagram.com/khalil.161/" target='_blanck'><span><i className="fa-brands fa-instagram fa-1x"></i></span></a></span>
          <span><a href="https://github.com/KhalilAndolsi" target='_blanck'><span><i className="fa-brands fa-github fa-1x"></i></span></a></span>
          <span><a href="mailto:khalilandolsi0110@gmail.com"><span><i className="fa-solid fa-envelope fa-1x"></i></span></a></span>
        </div>
    </footer>
  )
}

export default Footer
