import React from 'react'
import Herosection from './Herosection';
import Materials from './Materials';
import Carousel from './Carousel';
import Footer from './Footer';
import Title from './Title';


function Home() {
  return (
    <div>

        <Herosection/>
        <Title/>
                <Carousel/>

        <Materials/>
<Footer/>
    </div>
  )
}

export default Home;