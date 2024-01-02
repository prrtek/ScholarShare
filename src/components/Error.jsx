import React from "react";
import { ArrowLeft } from "lucide-react";
import { errors } from "../assets";

export default function Error() {
  return (
    <div className='bg-primary flex flex-row-reverse'>
      <img src={errors} alt='billing' className='w-[90%] h-[40%]' />
      <div className='flex items-center justify-center px-4 md:px-0'>
        <div>
          <p className='text-sm font-semibold text-white'>404 error</p>
          <h1 className='mt-3 text-2xl font-semibold text-white md:text-3xl'>
            We can&apos;t find that page
          </h1>
          <p className='mt-4 text-gray-500'>
            Sorry, the page you are looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className='mt-6 flex items-center space-x-3'>
            <button
              type='button'
              className='inline-flex items-center rounded-md border border-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
            >
              <ArrowLeft size={16} className='mr-2' />
              Go back
            </button>
            <button
              type='button'
              className='rounded-md bg-blue-gradient px-3 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-secondary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
            >
              Contact us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
