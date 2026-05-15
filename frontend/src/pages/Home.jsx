import React from 'react'
import HeroBanner from '../components/HeroBanner';
import { productsData } from '../data/products';
import NewArrivals from '../components/NewArrivals';

const Home = () => {
  return (
    <div className="w-full">
      <HeroBanner />
      <NewArrivals />
    </div>
  )
}

export default Home