import React from 'react'
import { Menu, X } from 'lucide-react'
import { useStore } from '../store/useStore'

const Navbar = () => {
    const { isMenuOpen, toggleMenu, closeMenu } = useStore()

    return (
        <nav className="fixed w-full z-50 bg-bg-light border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <img src="/logo.jpg.png" alt="Pixel Shade Logo" className="h-12 w-auto object-contain rounded-full border-2 border-transparent" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                        <span className="ml-3 text-2xl font-bold tracking-tighter text-text-dark">
                            PIXEL<span className="text-brand-orange">SHADE</span>
                        </span>
                    </div>
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <a href="/" className="text-text-dark hover:text-brand-orange font-medium transition-colors">Home</a>
                        <a href="/services" className="text-text-dark hover:text-brand-orange font-medium transition-colors">Services</a>
                        <a href="/portfolio" className="text-text-dark hover:text-brand-orange font-medium transition-colors">Work</a>
                        <a href="/about" className="text-text-dark hover:text-brand-orange font-medium transition-colors">About</a>
                    </div>
                    <div className="hidden md:flex">
                        <a href="/contact" className="bg-brand-orange text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition-colors">
                            PLACE ORDER
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-text-dark hover:text-brand-orange transition-colors">
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-bg-light border-b border-gray-200">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <a href="/" onClick={closeMenu} className="block px-3 py-3 text-lg font-bold text-text-dark hover:text-brand-orange hover:bg-gray-50 rounded-lg">Home</a>
                        <a href="/services" onClick={closeMenu} className="block px-3 py-3 text-lg font-bold text-text-dark hover:text-brand-orange hover:bg-gray-50 rounded-lg">Services</a>
                        <a href="/portfolio" onClick={closeMenu} className="block px-3 py-3 text-lg font-bold text-text-dark hover:text-brand-orange hover:bg-gray-50 rounded-lg">Work</a>
                        <a href="/about" onClick={closeMenu} className="block px-3 py-3 text-lg font-bold text-text-dark hover:text-brand-orange hover:bg-gray-50 rounded-lg">About</a>
                        <a href="/contact" onClick={closeMenu} className="block px-3 py-3 mt-4 text-center bg-brand-orange text-white font-bold rounded-full">
                            PLACE ORDER
                        </a>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
