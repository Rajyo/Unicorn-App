import React from 'react'
import './home.scss'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trendings'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'

const Home = () => {
  return (
    <div className='homePage' style={{overflowY:"scroll"}}>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home