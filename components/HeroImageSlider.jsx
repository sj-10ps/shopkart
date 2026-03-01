"use client"
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Image from 'next/image';
import React from 'react'
import '@splidejs/react-splide/css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const HeroImageSlider = () => {
    const users = [
    { id: 1, image: "/slide2.png" },
    { id: 2, image: "/slide3.png" },
    { id: 3,  image: "/slide1.png" },
  ];
  return (
    <Link className="mx-2 mt-2" href='#products'>
  
       
      <Splide
        options={{
          type: 'loop',
          perPage: 1,
          gap: '1rem',
          autoplay: true,
          interval: 2000,
          pauseOnHover: true,
          arrows: true,   
          pagination: true, 
        
        }}
      >
        {users.map((user) => (
          <SplideSlide key={user.id}>
           <div className='md:min-h-[calc(100vh-300px)] min-h-[calc(100vh-400px)] relative overflow-hidden' >
            <Image src={user.image} alt='' fill className='object-fit'/>
           </div>
          </SplideSlide>
        ))}
      </Splide>
    </Link>
  )
}

export default HeroImageSlider
