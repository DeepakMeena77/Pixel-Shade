import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-text-dark text-white border-t border-gray-800 py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Main Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center">
                            <img
                                src="/logo.jpg.webp"
                                alt="Pixel Shade Logo"
                                className="h-10 w-10 object-contain rounded-full border-2 border-gray-700"
                                onError={(e) => { e.target.style.display = 'none' }}
                            />
                            <span className="ml-3 text-2xl font-bold tracking-tighter text-white">
                                PIXEL<span className="text-brand-orange">SHADE</span>
                            </span>
                        </div>
                        <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-sm">
                            Creative Digital Services. No elevation. No gradients. Just bold design that drives real results.
                        </p>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-5">
                            Services
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Logo Designing',   href: '/services' },
                                { label: 'Graphic Design',   href: '/services' },
                                { label: 'Social Media',     href: '/services' },
                                { label: 'Invitation Cards', href: '/services' },
                                { label: 'Brand Strategy',   href: '/services' },
                            ].map(({ label, href }) => (
                                <li key={label}>
                                    <a href={href} className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>


                </div>

                {/* ── Bottom bar ── */}
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-sm">
                    <span>&copy; {new Date().getFullYear()} Pixel Shade. All rights reserved.</span>
                    <span className="text-xs text-gray-600 italic">Ideas that move brands forward.</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
