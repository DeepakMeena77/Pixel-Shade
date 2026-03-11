import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const Portfolio = () => {
    const works = [
        {
            id: "wedding-1",
            title: "Elegant Watercolor Wedding Invitation",
            category: "Invitation Design",
            description: "A beautifully hand-crafted watercolor illustration featuring natural floral elements and an intimate couple portrait, tailored for a premium wedding event.",
            color: "bg-[#e8f5e9]"
        },
        {
            id: "wedding-2",
            title: "Traditional Monogram Wedding Invite",
            category: "Invitation Design",
            description: "A sophisticated invitation design integrating elegant Telugu typography, custom 'R & P' monogram, and delicate botanical imagery.",
            color: "bg-[#fff3e0]"
        },
        {
            id: "wedding-3",
            title: "Classic Ceremonial Invitation Format",
            category: "Invitation Design",
            description: "A formal wedding invitation card layout utilizing culturally rich typography and a clean, structured frame for pristine readability.",
            color: "bg-[#f5f5f5]"
        },
        {
            id: "wedding-4",
            title: "Premium Print Layout",
            category: "Print Design",
            description: "Custom premium print layout designed for high-fidelity physical distribution.",
            color: "bg-[#e1bee7]"
        },
        {
            id: "wedding-5",
            title: "Bespoke Event Stationary",
            category: "Event Collateral",
            description: "Tailor-made stationery items that elevate the aesthetic of your special events.",
            color: "bg-[#e0f2f1]"
        }
    ]

    return (
        <div className="bg-bg-light min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-5xl md:text-7xl font-extrabold text-text-dark mb-6 leading-none"
                        >
                            Selected <br /><span className="text-brand-green">Works</span>
                        </motion.h1>
                        <p className="text-xl text-gray-600">
                            A curated look into our design vault. We let the visuals do the talking.
                        </p>
                    </div>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-orange pb-4 border-b-2 border-brand-orange inline-block">
                        View All Projects
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {works.map((work, index) => (
                        <motion.div
                            key={work.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            {/* Actual Image Render */}
                            <div
                                className={`w-full aspect-square ${work.color} rounded-[2rem] border-2 border-text-dark mb-6 flex flex-col items-center justify-center text-center relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-2`}
                            >
                                <img
                                    src={`/${work.id}.jpeg`}
                                    alt={work.title}
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full border-2 border-text-dark flex items-center justify-center translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                                    <ArrowUpRight size={24} />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-2xl font-bold">{work.title}</h3>
                                    <span className="text-sm font-bold text-brand-orange uppercase tracking-wider">{work.category}</span>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    {work.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Portfolio
