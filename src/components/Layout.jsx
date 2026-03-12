import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const WhatsAppButton = () => (
    <a
        href="https://wa.me/9296604555"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 cursor-pointer"
        style={{
            backgroundColor: '#25D366',
            boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
        }}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="white"
            width="30"
            height="30"
        >
            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.052 9.38L1.056 31.2l6.04-1.94A15.904 15.904 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.316 22.594c-.39 1.1-1.932 2.012-3.18 2.278-.852.18-1.964.324-5.71-1.228-4.8-1.986-7.888-6.852-8.128-7.172-.23-.32-1.932-2.572-1.932-4.904 0-2.332 1.222-3.476 1.656-3.952.39-.43 1.032-.644 1.648-.644.2 0 .378.02.54.036.434.02.652.046 .938.726.358.852 1.228 2.994 1.334 3.214.108.22.216.518.068.818-.14.306-.264.442-.484.696-.22.254-.428.448-.648.722-.2.244-.424.504-.178.938.244.434 1.09 1.796 2.34 2.91 1.608 1.432 2.908 1.892 3.39 2.088.358.146.786.108 1.044-.17.326-.358.73-.952 1.14-1.54.292-.42.662-.474 1.058-.322.4.146 2.53 1.194 2.964 1.412.434.22.722.324.83.506.104.18.104 1.056-.286 2.156z" />
        </svg>
    </a>
)

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-bg-light text-text-dark font-sans selection:bg-brand-orange selection:text-white">
            <Navbar />
            <main className="flex-grow pt-20"> {/* Padding top to account for fixed navbar */}
                <Outlet />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    )
}

export default Layout
