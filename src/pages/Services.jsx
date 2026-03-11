import React from 'react'
import { motion } from 'framer-motion'
import { Paintbrush, MessageSquare, Diamond, Layers } from 'lucide-react'

const Services = () => {
    const servicesList = [
        {
            id: "invitations",
            icon: <Diamond size={32} className="text-brand-orange" />,
            title: "Custom Invitation Cards",
            description: (
                <>
                    💌 Planning a special event and need the perfect invitation?
                    <br /><br />
                    Make your first impression unforgettable with our beautifully crafted digital and print-ready cards. ✨
                    <br /><br />
                    At PixelShade, we design elegant invitations that match your vibe and theme perfectly! 🎨
                    <br /><br />
                    <span className="font-bold text-brand-orange text-lg">💰 Custom Wedding Cards: ₹600</span><br />
                    <span className="font-bold text-brand-orange text-lg">🎬 Video Invitations: ₹700</span>
                    <br /><br />
                    Reach out today to make your event truly memorable!
                </>
            ),
            features: [
                "✨ Premium Typography & Layout",
                "🎨 Custom Illustrations",
                "🖨️ Print-Ready & Digital Formats",
                "📹 Animated/Video Invites Available"
            ]
        },
        {
            id: "social-media",
            icon: <MessageSquare size={32} className="text-brand-green" />,
            title: "Social Media Promo & Management",
            description: (
                <>
                    🚀 Want to grow your business quickly on social media?
                    <br /><br />
                    Finding it difficult to create daily posts, increase your followers, and get more reach? 🤔
                    <br /><br />
                    With the PixelShade Social Media Management Package, we will build a professional online presence for your brand! 📈
                    <br /><br />
                    <span className="font-bold text-brand-orange text-xl">💰 Only ₹4,999 / Month</span>
                    <br /><br />
                    Start right now to take your business to the next level!
                </>
            ),
            features: [
                "✨ 30 Posts Every Month",
                "📊 Fast Growth Strategy",
                "🔥 Trending Content",
                "📱 Multi-Platform Posting",
                "💬 24/7 Support"
            ]
        },
        {
            id: "logos",
            icon: <Layers size={32} className="text-brand-orange" />,
            title: "Logo Designing",
            description: (
                <>
                    🎯 Start your brand journey with an iconic identity!
                    <br /><br />
                    Want a logo that makes your business look premium and trustworthy? 💎
                    <br /><br />
                    We specialize in creating powerful, memorable, and custom logos tailored to your brand's unique story. 🖌️
                    <br /><br />
                    <span className="font-bold text-brand-orange text-xl">💰 Logos: ₹500</span>
                    <br /><br />
                    Let's design a brand identity you'll be proud to show off!
                </>
            ),
            features: [
                "✨ Custom, Unique Designs",
                "📐 High-Resolution Vector Files",
                "🎨 Strategic Color Psychology",
                "📱 Scalable for Web & Print"
            ]
        },
        {
            id: "graphic-design",
            icon: <Paintbrush size={32} className="text-brand-green" />,
            title: "General Graphic Design",
            description: (
                <>
                    🎨 Need professional graphics for your business or marketing?
                    <br /><br />
                    From promotional materials to business stationery, we create high-converting designs that grab attention! 🔥
                    <br /><br />
                    <span className="font-bold text-brand-orange text-lg">💰 Flyers & Brochures: ₹350</span><br />
                    <span className="font-bold text-brand-orange text-lg">💳 Business/Visiting Cards: ₹500</span><br />
                    <span className="font-bold text-brand-orange text-lg">✨ Canva Pro (1 Year) - ₹199</span>
                    <br /><br />
                    Upgrade your visual game today!
                </>
            ),
            features: [
                "✨ Eye-Catching Flyers & Posters",
                "🏢 Professional Business Cards",
                "📱 Clean UI/Ad Creatives",
                "👑 Premium Canva Access"
            ]
        }
    ]

    return (
        <div className="bg-bg-light min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-extrabold text-text-dark mb-6"
                    >
                        Our <span className="text-brand-orange">Arsenal</span>
                    </motion.h1>
                    <p className="text-xl text-gray-600">
                        We don't just create graphics; we build visual assets designed to dominate digital and physical spaces. Explore our core capabilities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {servicesList.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-10 md:p-14 border-2 border-text-dark rounded-[2.5rem] hover:bg-gray-50 transition-colors flex flex-col items-start"
                        >
                            <div className="mb-6 bg-gray-100 p-4 rounded-full border-2 border-gray-200">
                                {service.icon}
                            </div>
                            <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed text-lg flex-grow">
                                {service.description}
                            </p>

                            <div className="w-full pt-6 border-t border-gray-200">
                                <ul className="space-y-2">
                                    {service.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-center gap-2 font-medium text-text-dark">
                                            <span className="w-2 h-2 rounded-full bg-brand-green"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <a href="/contact" className="inline-block px-10 py-5 bg-text-dark text-white font-bold text-lg rounded-full hover:bg-gray-800 transition-colors uppercase tracking-wider">
                        Let's Build Something
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Services
