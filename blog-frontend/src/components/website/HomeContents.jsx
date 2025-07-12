import React from 'react'
import HeroSection from './Hero'
import FeaturedBlogs from './FeaturedBlogs'
import LatestBlogs from './LatestBlogs'
import ContactForm from './ContactForm'

const HomeContents = () => {
    return (
        <>
            <HeroSection />
            <FeaturedBlogs />
            <LatestBlogs />
            <ContactForm />
        </>

    )
}

export default HomeContents
