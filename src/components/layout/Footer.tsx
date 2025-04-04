import Link from 'next/link'
import React from 'react'
import Logo from '../shared/Logo'

function Footer() {
  return (
    <footer className='border-t border-color mt-16'>
      <div className='container pt-10 pb-16'>
        <div className='flex flex-col md:flex-row items-center md:items-start justify-between'>
          <div className='flex flex-col items-center md:items-start'>
            <Link href="/">
              <Logo />
            </Link>
            <p className='mt-4 text-light400_light500 text-sm text-center md:text-left italic'>
              Horizons is a leading job portal that connects <br className='hidden md:block'/> job seekers with top employers. <br className='hidden md:block'/> We help you find your dream job faster and easier. <br className='hidden md:block'/> our mission is to empower job seekers and employers to <br className='hidden md:block'/> connect and thrive in the ever-evolving job market. <br className='hidden md:block'/> we strive to provide the best job search experience <br className='hidden md:block'/> through innovative technology and personalized support.
            </p>
          </div>
          {/* Popular search */}
          <div className='flex flex-col items-center md:items-start mt-8 md:mt-0'>
            <h3 className='text-lg font-semibold'>Popular Search</h3>
            <ul className='mt-4 space-y-2'>
              <li className='text-center'><Link href="/">Software Developer</Link></li>
              <li className='text-center'><Link href="/">UI/UX Designer</Link></li>
              <li className='text-center'><Link href="/">Product Manager</Link></li>
              <li className='text-center'><Link href="/">Data Scientist</Link></li>
              <li className='text-center'><Link href="/">Marketing Specialist</Link></li>
              <li className='text-center'><Link href="/">System Administrator</Link></li>
              <li className='text-center'><Link href="/">Cloud Engineer</Link></li>
              <li className='text-center'><Link href="/">Sales Executive</Link></li>
            </ul>
          </div>
          <div className='flex flex-col items-center md:items-start mt-8 md:mt-0'>
            <ul className='space-y-2'>
              {/* More Popular search */}
              <li className='text-center'><Link href="/">HR Manager</Link></li>
              <li className='text-center'><Link href="/">Graphic Designer</Link></li>
              <li className='text-center'><Link href="/">Web Developer</Link></li>
              <li className='text-center'><Link href="/">Content Writer</Link></li>
              <li className='text-center'><Link href="/">Business Analyst</Link></li>
              <li className='text-center'><Link href="/">Project Manager</Link></li>
              <li className='text-center'><Link href="/">Network Engineer</Link></li>
              <li className='text-center'><Link href="/">System Administrator</Link></li>
              <li className='text-center'><Link href="/">Cloud Engineer</Link></li>
              <li className='text-center'><Link href="/">Cybersecurity Analyst</Link></li>
              <li className='text-center'><Link href="/">Network Engineer</Link></li>
            </ul>
          </div>
          <div className='flex flex-col items-center md:items-start mt-8 md:mt-0'>
            <ul className='space-y-2'>
              {/* More Popular search */}
              <li className='text-center'><Link href="/">Sales Executive</Link></li>
              <li className='text-center'><Link href="/">HR Manager</Link></li>
              <li className='text-center'><Link href="/">Graphic Designer</Link></li>
              <li className='text-center'><Link href="/">Web Developer</Link></li>
              <li className='text-center'><Link href="/">Content Writer</Link></li>
              <li className='text-center'><Link href="/">Business Analyst</Link></li>
              <li className='text-center'><Link href="/">Project Manager</Link></li>
              <li className='text-center'><Link href="/">System Administrator</Link></li>
              <li className='text-center'><Link href="/">Cloud Engineer</Link></li>
              <li className='text-center'><Link href="/">Cybersecurity Analyst</Link></li>
            </ul>
          </div>
          {/* Quick Links */}
          <div className='flex flex-col items-center md:items-start mt-8 md:mt-0'>
            <h3 className='text-lg font-semibold'>Quick Links</h3>
            <ul className='mt-4 space-y-2'>
              <li className='text-center'><Link href="/">Home</Link></li>
              <li className='text-center'><Link href="/about">About Us</Link></li>
              <li className='text-center'><Link href="/services">Services</Link></li>
              <li className='text-center'><Link href="/contact">Contact Us</Link></li>
            </ul>
            {/* Social Links */}
            <h3 className='text-lg font-semibold mt-8'>Follow Us</h3>
            <ul className='mt-2 space-y-2'>
              <li className='text-center'><Link href="/">Facebook</Link></li>
              <li className='text-center'><Link href="/">Twitter</Link></li>
              <li className='text-center'><Link href="/">LinkedIn</Link></li>
              <li className='text-center'><Link href="/">Instagram</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-16 bg-dark-300 text-light400_light500">
        <p>&copy; 2025 Horizons. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer