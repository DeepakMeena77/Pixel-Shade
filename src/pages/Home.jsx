import React from 'react'
import { motion } from 'framer-motion'
import { Share2, MessageSquare, Rocket, ArrowRight, Zap, TrendingUp, Cpu, Maximize, Instagram } from 'lucide-react'

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">

            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 bg-bg-light overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-4 mb-6 text-xs md:text-sm font-bold tracking-widest text-brand-green border border-brand-green uppercase rounded-full">
                            Future-Proof Design
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-dark leading-tight mb-8">
                            Elevate Your <br />
                            <span className="text-brand-orange">Digital Presence</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed md:leading-relaxed">
                            We blend futuristic aesthetics with high-energy marketing strategies to make your brand impossible to ignore.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="/services" className="w-full sm:w-auto px-8 py-4 bg-brand-orange text-white font-bold rounded-full hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                                Explore Services
                            </a>
                            <a href="#process" className="w-full sm:w-auto px-8 py-4 bg-transparent text-text-dark border-2 border-text-dark font-bold rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                Our Process
                            </a>
                            <a 
                                href="https://www.instagram.com/pixelshade.co?igsh=MW44dGd3YTUxZTV3dQ==" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                <Instagram size={20} />
                                Instagram
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Summary Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-8 border-2 border-gray-100 rounded-2xl bg-bg-light transition-all"
                        >
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-6 text-brand-orange">
                                <Share2 size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Futuristic Branding</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Identity systems built for the next generation of digital platforms and metaverses.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center"><Zap size={12} /></div> Detailed Logo Reviews</li>
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center"><Zap size={12} /></div> Cyberpunk/Print Style</li>
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center"><Zap size={12} /></div> Brand Guidelines</li>
                            </ul>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-8 border-2 border-gray-100 rounded-2xl bg-bg-light transition-all"
                        >
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-6 text-brand-orange">
                                <MessageSquare size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">SMM Mastery</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Aggressive growth strategies focusing on high-engagement visual storytelling.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center"><Zap size={12} /></div> Viral Content Creation</li>
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center"><Zap size={12} /></div> Multi-platform Strategy</li>
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center"><Zap size={12} /></div> Community Building</li>
                            </ul>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-8 border-2 border-gray-100 rounded-2xl bg-bg-light transition-all"
                        >
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-6 text-brand-orange">
                                <Rocket size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Ad Campaigns</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Conversion-optimized creative sets designed to slice through the digital noise.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center"><Zap size={12} /></div> Motion Ad Creative</li>
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center"><Zap size={12} /></div> A/B Variation Testing</li>
                                <li className="flex items-center gap-3 text-sm font-medium"><div className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center"><Zap size={12} /></div> Data-Driven Iteration</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section id="process" className="px-4 sm:px-6 lg:px-8 py-24 bg-[#fff9f4]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold mb-20 text-text-dark">Our Process</h2>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-px bg-orange-200 md:-translate-x-1/2 hidden md:block" />

                        {/* Steps */}
                        <div className="space-y-16">
                            {/* Step 1 */}
                            <div className="relative flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full border-2 border-brand-orange bg-white text-brand-orange font-bold flex items-center justify-center text-xl z-10 mb-6">
                                    1
                                </div>
                                <h4 className="text-xl font-bold mb-2">Sync</h4>
                                <p className="text-gray-500 text-sm max-w-xs text-center">Deep-dive into your brand's DNA and business objectives.</p>
                            </div>

                            {/* Step 2 */}
                            <div className="relative flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full border-2 border-brand-orange bg-white text-brand-orange font-bold flex items-center justify-center text-xl z-10 mb-6">
                                    2
                                </div>
                                <h4 className="text-xl font-bold mb-2">Ideate</h4>
                                <p className="text-gray-500 text-sm max-w-xs text-center">Explosive creative brainstorming and moodboarding.</p>
                            </div>

                            {/* Step 3 */}
                            <div className="relative flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full border-2 border-brand-orange bg-white text-brand-orange font-bold flex items-center justify-center text-xl z-10 mb-6">
                                    3
                                </div>
                                <h4 className="text-xl font-bold mb-2">Render</h4>
                                <p className="text-gray-500 text-sm max-w-xs text-center">High-fidelity asset production and visual creation.</p>
                            </div>

                            {/* Step 4 */}
                            <div className="relative flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-brand-orange border-2 border-brand-orange text-white font-bold flex items-center justify-center text-xl z-10 mb-6">
                                    4
                                </div>
                                <h4 className="text-xl font-bold mb-2">Deploy</h4>
                                <p className="text-gray-500 text-sm max-w-xs text-center">Launch and continuous performance optimization.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* CTA Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-50 p-10 md:p-16 rounded-[2rem] border-2 border-gray-100">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                                Ready to enter the <span className="text-brand-green">Next Dimension?</span>
                            </h2>
                            <p className="text-gray-600 mb-8 max-w-md text-lg leading-relaxed">
                                Stop settling for average visuals. Let's build a brand that defines the future of your industry.
                            </p>
                            <a href="/contact" className="inline-flex justify-center items-center gap-3 w-full sm:w-auto px-8 py-4 bg-brand-orange text-white font-bold rounded-full hover:bg-orange-600 transition-colors">
                                Start Project <ArrowRight size={20} />
                            </a>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square bg-orange-100 rounded-3xl flex items-center justify-center text-brand-orange">
                                <Zap size={48} />
                            </div>
                            <div className="aspect-square bg-green-100 rounded-3xl flex items-center justify-center text-brand-green">
                                <TrendingUp size={48} />
                            </div>
                            <div className="aspect-square bg-green-50 rounded-3xl flex items-center justify-center text-brand-green">
                                <Cpu size={48} />
                            </div>
                            <div className="aspect-square bg-orange-50 rounded-3xl flex items-center justify-center text-brand-orange">
                                <Maximize size={48} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Home
