import React from 'react'
import { motion } from 'framer-motion'
import { Paintbrush, MessageSquare, Diamond, Layers } from 'lucide-react'

const Services = () => {
    const servicesList = [
        {
            id: "invitations",
            icon: <Diamond size={32} className="text-brand-orange" />,
            title: "Custom Invitation Cards",
            description: "Elevate your special moments. We design highly personalized, elegant, and modern invitation cards for weddings, corporate events, and exclusive gatherings. Every design is crafted to leave a lasting impression before the event even begins.",
            features: ["Premium Typography", "Custom Illustrations", "Print-Ready & Digital Formats"]
        },
        {
            id: "social-media",
            icon: <MessageSquare size={32} className="text-brand-green" />,
            title: "Social Media Promo & Management",
            description: "Stop scrolling, start engaging. We engineer high-impact social media promotional material and manage campaigns that turn followers into brand advocates. Our strategies are aggressively focused on visual storytelling and community engagement.",
            features: ["Content Calendars", "Viral-Engineered Graphics", "Platform-Specific Sizing"]
        },
        {
            id: "logos",
            icon: <Layers size={32} className="text-brand-orange" />,
            title: "Logo Designing",
            description: "Your brand's visual cornerstone. We specialize in designing iconic, minimal, yet powerful logos that instantly communicate your brand's ethos. No generic templates—pure custom identity systems.",
            features: ["Vector Precision", "Color Psychology", "Scalable Systems"]
        },
        {
            id: "graphic-design",
            icon: <Paintbrush size={32} className="text-brand-green" />,
            title: "General Graphic Design",
            description: "From explosive ad creatives to clean corporate brochures, we handle all facets of digital and print design. Maintaining strict brand consistency across every single touchpoint.",
            features: ["Marketing Collateral", "Ad Creatives", "Merchandise Design"]
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
