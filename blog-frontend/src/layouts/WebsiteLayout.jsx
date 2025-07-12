import React from 'react';
import Header from '../components/website/Header';
import Newsletter from '../components/website/NewsLetter';
import Footer from '../components/website/Footer';

const WebsiteLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Newsletter />
            <Footer />
        </>
    );
};

export default WebsiteLayout;
