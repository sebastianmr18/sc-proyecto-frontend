"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(token);
  }, []);
  return (
    <div>
      <main>
        <h1 className='text-center text-3xl font-bold'>
          Home
        </h1>
      </main>
    </div>
  );
}