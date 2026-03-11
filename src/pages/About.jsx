import React from 'react'
import { motion } from 'framer-motion'
import { Star, CheckCircle, BarChart3, TrendingUp, Quote } from 'lucide-react'

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
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="order-1 lg:order-2"
                    >
                        {/* Minimalist flat portrait placeholder */}
                        <div className="relative w-full aspect-[4/5] bg-brand-green rounded-[3rem] border-2 border-text-dark p-8 flex flex-col justify-end overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-300 group">
                            
                            {/* The User's Selfie Image */}
                            <img 
                                src="/selfie.jpg.jpeg" 
                                alt="Founder" 
                                className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                    // If image is missing, show the graphic placeholder instead
                                    e.target.style.display = 'none';
                                    e.target.nextElementSibling.style.display = 'block';
                                }} 
                            />

                            {/* Fallback Graphic (shows if no selfie.jpg is found) */}
                            <div className="absolute inset-0 bg-[#fefefe] origin-bottom-left -rotate-6 transform scale-150 z-[-1]"></div>
                            
                            <div className="absolute inset-0 border-4 border-white opacity-20 z-10 pointer-events-none"></div>

                            <div className="relative z-10 text-center mb-8">
                                <h3 className="text-4xl font-extrabold text-text-dark tracking-tighter mix-blend-multiply opacity-20 transform -rotate-90 origin-bottom-left absolute -left-12 bottom-20">
                                    CREATIVE
                                </h3>

                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Client Success Stories & Proofs Section */}
                <section className="mt-32 max-w-7xl mx-auto border-t-2 border-gray-100 pt-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-4">
                            Don't Just Take Our <span className="text-brand-orange">Word For It.</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Real conversations, real analytics, and raw reactions from our recent clients. 
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        
                        {/* Social Media Proof - DM Style */}
                        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-100 shadow-sm flex flex-col pt-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-1">
                                    <img src="/logo.jpg.png" alt="Client" className="w-full h-full rounded-full border-2 border-white object-cover bg-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-text-dark">Rohan K. <span className="text-blue-500 text-sm">✓</span></h3>
                                    <p className="text-gray-500 text-sm">@rohank_apparel</p>
                                </div>
                                <div className="ml-auto flex text-orange-400">
                                    <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6 relative">
                                <dt className="text-gray-200 absolute -top-4 -left-4 bg-white rounded-full p-1"><Quote size={32} /></dt>
                                <p className="text-gray-700 italic relative z-10 font-medium leading-relaxed">
                                    "PixelShade completely transformed our Instagram. We went from struggling for views to a massive 300% growth in reach in just one month. The daily posts are exactly what we needed! Best ROI ever."
                                </p>
                            </div>
                            
                            {/* IG Insights Mockup */}
                            <div className="mt-auto bg-text-dark text-white p-6 rounded-xl flex items-center justify-between shadow-lg">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Accounts Reached</p>
                                    <p className="text-3xl font-black">124K <span className="text-green-400 text-sm font-bold ml-2 bg-green-900/40 px-2 py-1 rounded-md">+342% 📈</span></p>
                                </div>
                                <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700">
                                    <TrendingUp size={24} className="text-white" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Invitation Cards Proof - WhatsApp Style */}
                        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-100 shadow-sm flex flex-col pt-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-100 flex items-center justify-center">
                                    <img src="/wedding-5.jpeg" alt="Client" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-text-dark">Priya & Arjun</h3>
                                    <p className="text-gray-500 text-sm">Wedding Package</p>
                                </div>
                                <div className="ml-auto flex text-orange-400">
                                    <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                                </div>
                            </div>

                            {/* WhatsApp Mockup */}
                            <div className="bg-[#e5ddd5] rounded-2xl p-5 flex flex-col gap-4 mb-6 relative overflow-hidden h-full">
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://wallpapers.com/images/hd/whatsapp-chat-background-wd8hpx3f6z7e6g3i.jpg')", backgroundSize: "cover"}}></div>
                                <div className="bg-white p-2 pb-6 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] self-end relative border border-gray-200 z-10">
                                    <img src="/wedding-1.jpeg" className="rounded-xl w-full max-w-[200px] mb-2 border border-gray-100" />
                                    <p className="text-sm font-medium text-gray-800 pr-2">OMG! 😭 The cards just arrived and they look even better in print. Everyone is asking who made them! Thank you so much team!! ❤️</p>
                                    <span className="text-[10px] text-gray-400 absolute bottom-1 right-2">10:42 AM <span className="text-blue-500">✓✓</span></span>
                                </div>
                                <div className="bg-[#dcf8c6] p-3 pb-6 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] self-start relative border border-green-200 z-10">
                                    <p className="text-sm font-medium text-gray-800 pr-2">That makes us so happy! Have an amazing wedding! 🎉</p>
                                    <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">10:50 AM</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Logo Design Proof */}
                        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-100 shadow-sm flex flex-col pt-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-gray-900 border-2 border-gray-100 flex items-center justify-center text-white font-bold text-xl">
                                    T
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-text-dark">TechFlow Inc.</h3>
                                    <p className="text-gray-500 text-sm">Startup Founder</p>
                                </div>
                                <div className="ml-auto flex text-orange-400">
                                    <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6 relative">
                                <dt className="text-gray-200 absolute -top-4 -left-4 bg-white rounded-full p-1"><Quote size={32} /></dt>
                                <p className="text-gray-700 italic relative z-10 font-medium leading-relaxed">
                                    "We needed a fresh identity that looked premium. PixelShade nailed the minimal aesthetic on the very first concept. Outstanding work. 10/10 would hire again."
                                </p>
                            </div>
                            
                            {/* Final Logo Handover Mockup */}
                            <div className="mt-auto bg-[#f8f9fa] border-2 border-gray-200 p-5 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                                        <img src="/logo.jpg.png" alt="Logo Proof" className="w-10 h-10 object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800 mb-1">Brand_Assets_Final.zip</p>
                                        <p className="text-xs text-gray-500 font-medium">24.5 MB • Approved</p>
                                    </div>
                                </div>
                                <div className="bg-green-100 text-brand-green p-3 rounded-full flex flex-col items-center">
                                    <CheckCircle size={20} className="mb-1" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Graphic Design Proof */}
                        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-100 shadow-sm flex flex-col pt-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                   <img src="/wedding-3.jpeg" alt="Client" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-text-dark">Mark V.</h3>
                                    <p className="text-gray-500 text-sm">Event Organizer</p>
                                </div>
                                <div className="ml-auto flex text-orange-400">
                                    <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6 relative">
                                <dt className="text-gray-200 absolute -top-4 -left-4 bg-white rounded-full p-1"><Quote size={32} /></dt>
                                <p className="text-gray-700 italic relative z-10 font-medium leading-relaxed">
                                    "The flyers and ad creatives they designed doubled our event sign-ups. The quality is unmatched for the price point. Very responsive and highly recommended."
                                </p>
                            </div>
                            
                            {/* Ad Performance Matrix */}
                            <div className="mt-auto grid grid-cols-2 gap-4">
                                <div className="bg-brand-orange text-white p-5 rounded-xl border border-orange-500 shadow-md">
                                    <p className="text-xs text-orange-200 font-bold uppercase tracking-wider mb-1">Click-Through Rate</p>
                                    <p className="text-3xl font-black">6.4%</p>
                                </div>
                                <div className="bg-text-dark text-white p-5 rounded-xl shadow-md border border-gray-800">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Creative Score</p>
                                    <p className="text-3xl font-black text-brand-green">10/10</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default About
