import React from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Twitter, Instagram } from 'lucide-react'

const About = () => {
    return (
        <div className="bg-bg-light min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="order-2 lg:order-1"
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold text-text-dark mb-6">
                            The Mind Behind <br />
                            <span className="text-brand-orange">Pixel Shade</span>
                        </h1>

                        <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-10">
                            <p>
                                I am a freelance creative director specializing in high-converting Social Media Marketing and precise Graphic Design. I built Pixel Shade on a singular philosophy: <span className="font-bold text-text-dark">Design should not just look good; it must perform.</span>
                            </p>
                            <p>
                                Whether it's an intimate, beautifully handcrafted wedding invitation or an aggressive, multi-platform social media campaign, I engineer visual assets that demand attention. I don't use templates. Everything I build is custom, strategic, and optimized for maximum impact.
                            </p>
                            <p>
                                My background spans across branding ecosystems, organic growth strategies, and meticulous print-ready design. I partner with ambitious startups, luxury event planners, and established brands to elevate their visual footprint.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-text-dark hover:bg-brand-orange hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-text-dark hover:bg-brand-green hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-text-dark hover:bg-brand-orange hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="order-1 lg:order-2"
                    >
                        {/* Minimalist flat portrait placeholder */}
                        <div className="relative w-full aspect-[4/5] bg-brand-green rounded-[3rem] border-2 border-text-dark p-8 flex flex-col justify-end overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-300">
                            <div className="absolute inset-0 bg-[#fefefe] origin-bottom-left -rotate-6 transform scale-150"></div>
                            <div className="absolute inset-0 border-4 border-white opacity-20"></div>

                            <div className="relative z-10 text-center mb-8">
                                <h3 className="text-4xl font-extrabold text-text-dark tracking-tighter mix-blend-multiply opacity-20 transform -rotate-90 origin-bottom-left absolute -left-12 bottom-20">
                                    CREATIVE
                                </h3>
                                {/* Provide instruction for user */}
                                <div className="w-32 h-32 mx-auto bg-gray-200 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center text-xs text-gray-500 font-bold mb-4">
                                    Drop Your<br />Selfie Here
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>

            </div>
        </div>
    )
}

export default About
