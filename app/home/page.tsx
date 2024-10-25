"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


export default function Home() {


  return (
    <div>
      <Header />
      
      <main>
        <h1 className='text-center text-3xl font-bold'>
          Home
        </h1>
      </main>
      <Footer />
    </div>
  );
}
