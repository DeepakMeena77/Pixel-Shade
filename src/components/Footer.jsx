import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-text-dark text-white border-t-0 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
                    <div className="flex-1">
                        <div className="flex items-center justify-center md:justify-start">
                            <img src="/logo.jpg.png" alt="Pixel Shade Logo" className="h-10 w-auto object-contain rounded-full border-2 border-transparent mb-2" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                            <span className="ml-3 text-2xl font-bold tracking-tighter text-white">
                                PIXEL<span className="text-brand-orange">SHADE</span>
                            </span>
                        </div>
                        <p className="mt-2 text-gray-400 text-sm max-w-sm">
                            Creative Digital Services. No elevation. No gradients. Just bold design that drives real results.
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <a href="/portfolio" className="text-gray-300 hover:text-brand-orange transition-colors uppercase tracking-widest text-sm font-semibold">Portfolio</a>
                        <a href="/services" className="text-gray-300 hover:text-brand-orange transition-colors uppercase tracking-widest text-sm font-semibold">Services</a>
                        <a href="/contact" className="text-gray-300 hover:text-brand-orange transition-colors uppercase tracking-widest text-sm font-semibold">Contact</a>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Pixel Shade. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
