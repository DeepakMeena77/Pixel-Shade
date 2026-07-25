import React from 'react'
import { motion } from 'framer-motion'
import {
    Star, CheckCircle, TrendingUp, Quote, Award, Users, Clock,
    Target, Layers, Zap, ArrowRight, Palette, BarChart2, MessageCircle
} from 'lucide-react'

const stats = [
    { value: '20+', label: 'Clients Served', icon: Users },
    { value: '3+', label: 'Years Experience', icon: Clock },
    { value: '100%', label: 'Custom Work', icon: Layers },
    { value: '5★', label: 'Average Rating', icon: Star },
]

const values = [
    {
        icon: Target,
        title: 'Results-Driven Design',
        desc: 'Every design decision is rooted in strategy. We create visuals that do more than look good — they convert.',
    },
    {
        icon: Palette,
        title: 'No Templates. Ever.',
        desc: 'From the first sketch to the final file, everything is built from scratch, uniquely tailored to your brand.',
    },
    {
        icon: BarChart2,
        title: 'Data-Backed Creativity',
        desc: 'We combine creative instinct with market insights to ensure your brand stands out and stays relevant.',
    },
    {
        icon: MessageCircle,
        title: 'Clear Communication',
        desc: 'You are never left guessing. Regular updates, transparent timelines, and open feedback loops throughout.',
    },
]

const About = () => {
    return (
        <div className="bg-bg-light min-h-screen">

            {/* ── Hero ── */}
            <section className="relative px-4 sm:px-6 lg:px-8 pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-100/30 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left — Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.65 }}
                        >
                            <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-orange border border-brand-orange/40 bg-orange-50 px-4 py-1.5 rounded-full mb-6">
                                About Pixel Shade
                            </span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-dark leading-tight mb-6">
                                The Digital Marketing Agency <br />Behind{' '}
                                <span className="text-brand-orange">Your Brand.</span>
                            </h1>
                            <div className="space-y-5 text-base md:text-lg text-gray-600 leading-relaxed mb-10">
                                <p>
                                    Pixel Shade is a performance-driven digital marketing agency built on one uncompromising belief:{' '}
                                    <span className="font-bold text-text-dark">your brand must grow as powerfully online as it looks.</span>
                                </p>
                                <p>
                                    We specialise in SEO & organic growth, paid advertising, social media management, content marketing, and conversion-focused strategies — serving businesses that refuse to blend in.
                                </p>
                                <p>
                                    Every campaign we run is built from deep research, data-backed decisions, and a relentless focus on measurable results for your business.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-orange text-white font-bold rounded-full hover:bg-orange-600 transition-colors text-sm"
                                >
                                    Book a Free Consultation <ArrowRight size={16} />
                                </a>
                                <a
                                    href="/portfolio"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-text-dark text-text-dark font-bold rounded-full hover:bg-gray-100 transition-colors text-sm"
                                >
                                    View Our Work
                                </a>
                            </div>
                        </motion.div>

                        {/* Right — Photo card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.65 }}
                            className="relative"
                        >
                            <div className="relative w-full aspect-[4/5] bg-brand-green rounded-[3rem] border-2 border-text-dark overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 group shadow-2xl shadow-green-200/40">
                                <img
                                    src="/selfie.jpg.webp"
                                    alt="Founder of Pixel Shade"
                                    className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                    }}
                                />
                                {/* Subtle overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-text-dark/60 via-transparent to-transparent z-10" />
                                {/* Name tag */}
                                <div className="absolute bottom-6 left-6 right-6 z-20">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/60">
                                        <p className="font-extrabold text-text-dark text-lg leading-tight">Pixel Shade Agency</p>
                                        <p className="text-gray-500 text-sm font-medium">Digital Marketing Director & Founder</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating badge */}
                            <div className="absolute -top-4 -right-4 bg-brand-orange text-white rounded-2xl px-5 py-3 shadow-xl shadow-orange-200/50 flex items-center gap-2">
                                <Award size={18} />
                                <span className="font-bold text-sm">20+ Brands Built</span>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ── Stats Bar ── */}
            <section className="border-y border-gray-100 bg-white py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((s, i) => {
                        const Icon = s.icon
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="text-center"
                            >
                                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-brand-orange mx-auto mb-3">
                                    <Icon size={20} />
                                </div>
                                <p className="text-3xl md:text-4xl font-extrabold text-text-dark">{s.value}</p>
                                <p className="text-sm text-gray-500 font-medium mt-1">{s.label}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </section>

            {/* ── Our Values ── */}
            <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-bg-light">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-orange border border-brand-orange/40 bg-orange-50 px-4 py-1.5 rounded-full mb-4">
                            What Drives Us
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-text-dark mb-4">How We Operate</h2>
                        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
                            Our principles aren't just words on a wall. They shape every decision we make for your brand.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {values.map((v, i) => {
                            const Icon = v.icon
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.09 }}
                                    className="bg-white rounded-2xl border-2 border-gray-100 p-7 flex gap-5 hover:border-orange-200 hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-brand-orange group-hover:bg-orange-100 transition-colors">
                                        <Icon size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-extrabold text-text-dark mb-2">{v.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── Client Proof ── */}
            <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-orange border border-brand-orange/40 bg-orange-50 px-4 py-1.5 rounded-full mb-4">
                            Social Proof
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-text-dark mb-4">
                            Real Results. <span className="text-brand-orange">Real Clients.</span>
                        </h2>
                        <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
                            Not just testimonials — actual conversations, numbers, and outcomes from the brands we've worked with.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

                        {/* SMM Result */}
                        <motion.div whileHover={{ scale: 1.01 }} className="bg-white rounded-[2rem] border-2 border-gray-100 p-8 flex flex-col shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-0.5">
                                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                        <img src="/logo.jpg.webp" alt="Client" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-text-dark">Rohan K.</h3>
                                    <p className="text-gray-400 text-xs font-medium">@rohank_apparel · SMM Client</p>
                                </div>
                                <div className="flex text-orange-400 gap-0.5">
                                    {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 mb-6 relative">
                                <Quote size={28} className="text-gray-200 absolute -top-3 -left-3 bg-white rounded-full p-1" />
                                <p className="text-gray-700 italic text-sm font-medium leading-relaxed relative z-10">
                                    "PixelShade completely transformed our Instagram. We went from struggling for views to a massive 300% growth in reach in just one month. Best ROI ever."
                                </p>
                            </div>

                            <div className="mt-auto bg-text-dark text-white p-5 rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Accounts Reached</p>
                                    <p className="text-3xl font-black">124K <span className="text-green-400 text-sm font-bold ml-2 bg-green-900/30 px-2 py-0.5 rounded-md">+342% 📈</span></p>
                                </div>
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700">
                                    <TrendingUp size={20} className="text-white" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Wedding Invitation */}
                        <motion.div whileHover={{ scale: 1.01 }} className="bg-white rounded-[2rem] border-2 border-gray-100 p-8 flex flex-col shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-100">
                                    <img src="/wedding-5.webp" alt="Client" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-text-dark">Priya & Arjun</h3>
                                    <p className="text-gray-400 text-xs font-medium">Wedding Invitation Package</p>
                                </div>
                                <div className="flex text-orange-400 gap-0.5">
                                    {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                                </div>
                            </div>

                            <div className="bg-[#e5ddd5] rounded-2xl p-4 flex flex-col gap-3 mb-6 relative overflow-hidden flex-1">
                                <div
                                    className="absolute inset-0 opacity-10"
                                    style={{ backgroundImage: "url('https://wallpapers.com/images/hd/whatsapp-chat-background-wd8hpx3f6z7e6g3i.jpg')", backgroundSize: 'cover' }}
                                />
                                <div className="bg-white p-2 pb-5 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] self-end relative z-10 border border-gray-200">
                                    <img src="/wedding-1.webp" className="rounded-xl w-full max-w-[180px] mb-2 border border-gray-100" alt="invitation" />
                                    <p className="text-xs font-medium text-gray-800 pr-2">OMG! 😭 The cards just arrived and they look even better in print. Everyone is asking who made them! ❤️</p>
                                    <span className="text-[10px] text-gray-400 absolute bottom-1 right-2">10:42 AM <span className="text-blue-500">✓✓</span></span>
                                </div>
                                <div className="bg-[#dcf8c6] p-3 pb-5 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] self-start relative z-10 border border-green-200">
                                    <p className="text-xs font-medium text-gray-800 pr-2">That makes us so happy! Have an amazing wedding! 🎉</p>
                                    <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">10:50 AM</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Logo Design */}
                        <motion.div whileHover={{ scale: 1.01 }} className="bg-white rounded-[2rem] border-2 border-gray-100 p-8 flex flex-col shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-gray-900 border-2 border-gray-100 flex items-center justify-center text-white font-black text-xl">T</div>
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-text-dark">TechFlow Inc.</h3>
                                    <p className="text-gray-400 text-xs font-medium">Brand Identity Client</p>
                                </div>
                                <div className="flex text-orange-400 gap-0.5">
                                    {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 mb-6 relative">
                                <Quote size={28} className="text-gray-200 absolute -top-3 -left-3 bg-white rounded-full p-1" />
                                <p className="text-gray-700 italic text-sm font-medium leading-relaxed relative z-10">
                                    "We needed a fresh identity that looked premium. PixelShade nailed the minimal aesthetic on the very first concept. Outstanding work. 10/10 would hire again."
                                </p>
                            </div>

                            <div className="mt-auto bg-gray-50 border-2 border-gray-100 p-4 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                                        <img src="/logo.jpg.webp" alt="Logo Proof" className="w-8 h-8 object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">Brand_Assets_Final.zip</p>
                                        <p className="text-xs text-gray-400 font-medium">24.5 MB · Approved</p>
                                    </div>
                                </div>
                                <div className="bg-green-100 text-brand-green p-2.5 rounded-full">
                                    <CheckCircle size={18} />
                                </div>
                            </div>
                        </motion.div>

                        {/* Ad Campaign */}
                        <motion.div whileHover={{ scale: 1.01 }} className="bg-white rounded-[2rem] border-2 border-gray-100 p-8 flex flex-col shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-blue-50 overflow-hidden border-2 border-gray-100">
                                    <img src="/wedding-3.webp" alt="Client" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-text-dark">Mark V.</h3>
                                    <p className="text-gray-400 text-xs font-medium">Event Organizer · Ad Creatives</p>
                                </div>
                                <div className="flex text-orange-400 gap-0.5">
                                    {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 mb-6 relative">
                                <Quote size={28} className="text-gray-200 absolute -top-3 -left-3 bg-white rounded-full p-1" />
                                <p className="text-gray-700 italic text-sm font-medium leading-relaxed relative z-10">
                                    "The flyers and ad creatives they designed doubled our event sign-ups. The quality is unmatched for the price point. Very responsive and highly recommended."
                                </p>
                            </div>

                            <div className="mt-auto grid grid-cols-2 gap-4">
                                <div className="bg-brand-orange text-white p-5 rounded-xl">
                                    <p className="text-xs text-orange-200 font-bold uppercase tracking-wider mb-1">Click-Through Rate</p>
                                    <p className="text-3xl font-black">6.4%</p>
                                </div>
                                <div className="bg-text-dark text-white p-5 rounded-xl">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Creative Score</p>
                                    <p className="text-3xl font-black text-brand-green">10/10</p>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="bg-text-dark px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Zap size={36} className="text-brand-orange mx-auto mb-6" />
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5">
                            Let's Build Something <span className="text-brand-orange">Remarkable.</span>
                        </h2>
                        <p className="text-gray-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                            Whether you're launching a brand, scaling your social presence, or need stunning visuals — we're ready to make it happen.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-brand-orange text-white font-bold text-base rounded-full hover:bg-orange-600 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-0.5"
                        >
                            Book a Free Consultation <ArrowRight size={18} />
                        </a>
                    </motion.div>
                </div>
            </section>

        </div>
    )
}

export default About
