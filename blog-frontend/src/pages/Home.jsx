import React from 'react'
import WebsiteLayout from '../layouts/WebsiteLayout'
import HeroSection from '../components/website/Hero'
import FeaturedBlogs from '../components/website/FeaturedBlogs'
import LatestBlogs from '../components/website/LatestBlogs'
import ContactForm from '../components/website/ContactForm'

const Home = () => {
  return (
    <WebsiteLayout>
      <HeroSection />
      <FeaturedBlogs/>
      <LatestBlogs/>
      <ContactForm/>
    </WebsiteLayout>
  )
}

export default Home
