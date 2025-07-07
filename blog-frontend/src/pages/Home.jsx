import React from 'react'
import WebsiteLayout from '../layouts/WebsiteLayout'
import HeroSection from '../components/website/Hero'
import FeaturedBlogs from '../components/website/FeaturedBlogs'
import LatestBlogs from '../components/website/LatestBlogs'

const Home = () => {
  return (
    <WebsiteLayout>
      <HeroSection />
      <FeaturedBlogs/>
      <LatestBlogs/>
    </WebsiteLayout>
  )
}

export default Home
