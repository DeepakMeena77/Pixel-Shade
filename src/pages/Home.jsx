import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Share2, MessageSquare, Rocket, ArrowRight, Zap, TrendingUp, Cpu, Maximize, Instagram, Search, Lightbulb, Palette, Send } from 'lucide-react'
import ReviewSection from '../components/ReviewSection'
import { supabase } from '../config/supabase'

// Fallback logos (used only if DB is empty / loading)
const FALLBACK_CLIENTS = [
    { name: 'OSO Real Estates',         logo_url: '/logos/logo-oso-real-estates.png' },
    { name: 'Vivah Utshav',             logo_url: '/logos/logo-vivah-utshav.png' },
    { name: 'VL Boutique',              logo_url: '/logos/logo-vl-boutique.png' },
    { name: 'AmlaCubes',                logo_url: '/logos/logo-amla-cubes.png' },
    { name: 'MR Realty Talks',          logo_url: '/logos/logo-mr-realty-talks.png' },
    { name: 'D Boutique',               logo_url: '/logos/logo-d-boutique.png' },
    { name: 'MS Cell Point',            logo_url: '/logos/logo-ms-cell-point.png' },
    { name: 'House of Maha',            logo_url: '/logos/logo-house-of-maha.png' },
    { name: '1Z Realty',                logo_url: '/logos/logo-1z-realty.png' },
    { name: 'Astrologer Ramaraju',      logo_url: '/logos/logo-astrologer-ramaraju.png' },
    { name: 'Sri Mahalakshmi Traders',  logo_url: '/logos/logo-sri-mahalakshmi-traders.png' },
    { name: 'Moofreshmilk',             logo_url: '/logos/logo-moofreshmilk.png' },
    { name: 'Divya Jewelers',           logo_url: '/logos/logo-divya-jewelers.png' },
    { name: 'Avigna',                   logo_url: '/logos/logo-avigna.png' },
]

const processSteps = [
    {
        num: '01',
        icon: Search,
        title: 'Discovery',
        subtitle: 'Understanding Your Brand',
        desc: 'We start by diving deep into your business goals, target audience, and competitive landscape to build a solid creative foundation.',
    },
    {
        num: '02',
        icon: Lightbulb,
        title: 'Strategy',
        subtitle: 'Ideas That Convert',
        desc: 'From mood boards to messaging — we map out a visual strategy aligned with your brand identity and market positioning.',
    },
    {
        num: '03',
        icon: Palette,
        title: 'Design',
        subtitle: 'Crafted with Precision',
        desc: 'Every pixel is intentional. We produce high-fidelity assets that are visually striking and ready for every platform.',
    },
    {
        num: '04',
        icon: Send,
        title: 'Deliver',
        subtitle: 'Launch & Grow',
        desc: 'Final files handed over in all formats. We stay connected post-delivery to ensure everything performs as expected.',
    },
]

const Home = () => {
    const [clients, setClients] = useState(FALLBACK_CLIENTS)

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const { data, error } = await supabase
                    .from('portfolio_clients')
                    .select('id, name, logo_url')
                    .order('sort_order', { ascending: true })
                if (!error && data && data.length > 0) {
                    setClients(data)
                }
            } catch (err) {
                // silently fall back to FALLBACK_CLIENTS
                console.warn('Home: could not fetch clients from DB', err)
            }
        }
        fetchClients()
    }, [])

    return (
        <div className="flex flex-col min-h-screen">

            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-32 lg:py-40 bg-bg-light overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Active Online Indicator */}
                        <div className="flex items-center justify-center gap-4 mb-5">
                            <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                </span>
                                <span className="text-xs font-bold text-green-700 tracking-wide">We're Online — Available Now</span>
                            </div>
                        </div>

                        <span className="inline-block py-1 px-4 mb-6 text-xs md:text-sm font-bold tracking-widest text-brand-green border border-brand-green uppercase rounded-full">
                            Future-Proof Design
                        </span>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-dark leading-tight mb-6">
                            Elevate Your <br />
                            <span className="text-brand-orange">Digital Presence</span>
                        </h1>
                        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                            We blend futuristic aesthetics with high-energy marketing strategies to make your brand impossible to ignore.
                        </p>

                        {/* Primary action buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                            <a href="/services" className="px-7 py-3.5 bg-brand-orange text-white font-bold rounded-full hover:bg-orange-600 transition-colors text-sm md:text-base">
                                Explore Services
                            </a>
                            <a href="#process" className="px-7 py-3.5 bg-transparent text-text-dark border-2 border-text-dark font-bold rounded-full hover:bg-gray-100 transition-colors text-sm md:text-base">
                                Our Process
                            </a>
                            <a
                                href="https://www.instagram.com/pixelshade.co?igsh=MW44dGd3YTUxZTV3dQ=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-7 py-3.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 text-sm md:text-base"
                            >
                                <Instagram size={18} />
                                Instagram
                            </a>
                        </div>

                        {/* Social icon buttons */}
                        <div className="flex items-center justify-center gap-3 mt-2">
                            {/* Gmail Icon Button */}
                            <a
                                href="mailto:pixelshade.co@gmail.com"
                                title="Email us at pixelshade.co@gmail.com"
                                className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 hover:border-red-400 hover:shadow-lg hover:scale-110 transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
                                    <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"/>
                                    <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"/>
                                    <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/>
                                    <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"/>
                                    <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"/>
                                </svg>
                            </a>

                            {/* Facebook Icon Button */}
                            <a
                                href="https://www.facebook.com/share/1BprmjqVpd/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Follow us on Facebook"
                                className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-[#1877F2] hover:bg-[#0d6edc] hover:shadow-lg hover:scale-110 transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white">
                                    <path d="M24 12.073C24 5.406 18.627 0 12 0S0 5.406 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.885v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Trusted By Strip ── */}
            <section className="bg-white border-y border-gray-100 py-8 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 mb-5 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        Trusted by <span className="text-brand-orange">20+ businesses</span> across multiple industries
                    </p>
                </div>

                {/* Infinite marquee */}
                <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                    <motion.div
                        className="flex gap-8 shrink-0"
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
                    >
                        {[...clients, ...clients].map((c, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0 flex items-center justify-center w-24 h-16 bg-gray-50 rounded-xl border border-gray-100 p-2 hover:border-orange-200 hover:shadow-sm transition-all"
                                title={c.name}
                            >
                                <img
                                    src={c.logo_url}
                                    alt={c.name}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                        e.target.parentElement.innerHTML = `<span style="font-size:10px;font-weight:700;color:#9ca3af;text-align:center;line-height:1.2">${c.name}</span>`
                                    }}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Services Summary Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Card 1 */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-6 md:p-8 border-2 border-gray-100 rounded-2xl bg-bg-light transition-all"
                        >
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-6 text-brand-orange">
                                <Share2 size={24} />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-4">Futuristic Branding</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                                Identity systems built for the next generation of digital platforms and metaverses.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center flex-shrink-0"><Zap size={12} /></div> Detailed Logo Reviews</li>
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center flex-shrink-0"><Zap size={12} /></div> Cyberpunk/Print Style</li>
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center flex-shrink-0"><Zap size={12} /></div> Brand Guidelines</li>
                            </ul>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-6 md:p-8 border-2 border-gray-100 rounded-2xl bg-bg-light transition-all"
                        >
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-6 text-brand-orange">
                                <MessageSquare size={24} />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-4">SMM Mastery</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                                Aggressive growth strategies focusing on high-engagement visual storytelling.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center flex-shrink-0"><Zap size={12} /></div> Viral Content Creation</li>
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center flex-shrink-0"><Zap size={12} /></div> Multi-platform Strategy</li>
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center flex-shrink-0"><Zap size={12} /></div> Community Building</li>
                            </ul>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-6 md:p-8 border-2 border-gray-100 rounded-2xl bg-bg-light transition-all sm:col-span-2 lg:col-span-1"
                        >
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-6 text-brand-orange">
                                <Rocket size={24} />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-4">Ad Campaigns</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                                Conversion-optimized creative sets designed to slice through the digital noise.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center flex-shrink-0"><Zap size={12} /></div> Motion Ad Creative</li>
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center flex-shrink-0"><Zap size={12} /></div> A/B Variation Testing</li>
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center flex-shrink-0"><Zap size={12} /></div> Data-Driven Iteration</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Our Process Section ── */}
            <section id="process" className="px-4 sm:px-6 lg:px-8 py-20 md:py-32 bg-[#fff9f4]">
                <div className="max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16 md:mb-20">
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-orange border border-brand-orange/40 bg-orange-50 px-4 py-1.5 rounded-full mb-4">
                            How We Work
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-text-dark mb-4">Our Process</h2>
                        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                            A structured creative workflow built for clarity, speed, and results — every single time.
                        </p>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((step, i) => {
                            const Icon = step.icon
                            return (
                                <motion.div
                                    key={step.num}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="relative bg-white rounded-2xl border-2 border-gray-100 p-7 flex flex-col hover:border-orange-200 hover:shadow-lg transition-all duration-300 group"
                                >
                                    {/* Step number badge */}
                                    <div className="absolute -top-3.5 left-6 bg-brand-orange text-white text-xs font-black px-3 py-1 rounded-full tracking-widest">
                                        {step.num}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-brand-orange mb-5 mt-2 group-hover:bg-orange-100 transition-colors">
                                        <Icon size={22} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-extrabold text-text-dark mb-1">{step.title}</h3>
                                    <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-3">{step.subtitle}</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>

                                    {/* Connector arrow (hidden on last) */}
                                    {i < processSteps.length - 1 && (
                                        <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                                            <div className="w-7 h-7 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center">
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                    <path d="M2 5h6M5 2l3 3-3 3" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center mt-12">
                        <a href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:underline underline-offset-4">
                            Ready to get started? Book a free call <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Review Section */}
            <ReviewSection />

            {/* CTA Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-gray-50 p-8 md:p-16 rounded-[2rem] border-2 border-gray-100">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
                                Ready to enter the <span className="text-brand-green">Next Dimension?</span>
                            </h2>
                            <p className="text-gray-600 mb-8 max-w-md text-base md:text-lg leading-relaxed">
                                Stop settling for average visuals. Let's build a brand that defines the future of your industry.
                            </p>
                            <a href="/contact" className="inline-flex justify-center items-center gap-3 w-full sm:w-auto px-8 py-4 bg-brand-orange text-white font-bold rounded-full hover:bg-orange-600 transition-colors">
                                Start Project <ArrowRight size={20} />
                            </a>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square bg-orange-100 rounded-3xl flex items-center justify-center text-brand-orange">
                                <Zap size={40} />
                            </div>
                            <div className="aspect-square bg-green-100 rounded-3xl flex items-center justify-center text-brand-green">
                                <TrendingUp size={40} />
                            </div>
                            <div className="aspect-square bg-green-50 rounded-3xl flex items-center justify-center text-brand-green">
                                <Cpu size={40} />
                            </div>
                            <div className="aspect-square bg-orange-50 rounded-3xl flex items-center justify-center text-brand-orange">
                                <Maximize size={40} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Home
