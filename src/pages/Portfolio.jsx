import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const Portfolio = () => {
    const works = [
        {
            image: "NEERAJ.FX PORTFOLIO_page-0003.jpg",
            title: "Brand Logo Design",
            category: "Logo Design",
            description: "A bold and modern logo crafted for Coffee House — featuring a distinctive coffee bean icon with a rising steam, projecting warmth, energy, and brand identity at a glance.",
            color: "bg-[#f5f0eb]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0004.jpg",
            title: "Business Card Design",
            category: "Print Design",
            description: "A sleek, professional business card layout for Coffee House — elegantly presenting contact details with the brand's color palette, typography, and QR integration for a lasting impression.",
            color: "bg-[#fff8f0]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0005.jpg",
            title: "ID Card Design",
            category: "Corporate Identity",
            description: "A clean and structured employee ID card design tailored for Coffee House staff — combining brand colors, logo placement, and essential information in a professional layout.",
            color: "bg-[#f0f4ff]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0006.jpg",
            title: "Promotional Flyer",
            category: "Print Design",
            description: "An eye-catching promotional flyer for Coffee House — highlighting a 25% OFF deal with vibrant imagery, compelling typography, and a strong call-to-action for maximum reach.",
            color: "bg-[#fff3e0]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0007.jpg",
            title: "Social Media Post",
            category: "Digital Design",
            description: "A visually engaging social media post for Coffee House — designed to boost online presence with brand-consistent aesthetics, product highlights, and enticing promotional content.",
            color: "bg-[#e8f5e9]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0008.jpg",
            title: "Bifold Brochure",
            category: "Print Design",
            description: "A sophisticated bifold brochure for Coffee House — thoughtfully structured to narrate the brand story, menu highlights, and offers across two panels with rich visuals and elegant type.",
            color: "bg-[#fce4ec]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0009.jpg",
            title: "Trifold Brochure",
            category: "Print Design",
            description: "A detailed trifold brochure for Coffee House — showcasing menu categories, brand identity, and promotional offers in a compact, fold-friendly format perfect for countertop distribution.",
            color: "bg-[#e3f2fd]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0010.jpg",
            title: "Standee Design",
            category: "Outdoor Display",
            description: "A tall, high-impact standee for Coffee House — designed to grab attention at events and storefronts with striking visuals, bold typography, and a clear promotional message.",
            color: "bg-[#f3e5f5]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0011.jpg",
            title: "Instagram Post Mockup",
            category: "Social Media Design",
            description: "A polished Instagram post mockup for Coffee House — showcasing feed-ready content with branded imagery, caption layout, and engagement-optimized visual composition for digital campaigns.",
            color: "bg-[#fff8e1]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0012.jpg",
            title: "Billboard Advertising",
            category: "Outdoor Advertising",
            description: "A commanding billboard design for Coffee House — built for large-format visibility with bold messaging, brand-consistent colors, and a striking product photograph that demands attention on the road.",
            color: "bg-[#e0f7fa]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0013.jpg",
            title: "Package Design",
            category: "Product Packaging",
            description: "A premium product package design for Coffee House — featuring a minimalist kraft bag with logo application, product origin label (Sumatera), and essential brand details in an artisan-inspired format.",
            color: "bg-[#fafafa]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0014.jpg",
            title: "Sign Board Design",
            category: "Signage Design",
            description: "A bold and legible signboard design for Coffee House — crafted for storefront visibility with essential business information, brand colors, and a clean layout that ensures clarity from a distance.",
            color: "bg-[#e8f5e9]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0015.jpg",
            title: "Vehicle Branding – Delivery Van",
            category: "Vehicle Branding",
            description: "A full-wrap branding design applied to a delivery van for Coffee House — turning the vehicle into a moving advertisement with bold logo placement, brand palette, and promotional text for maximum visibility.",
            color: "bg-[#fff3e0]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0016.jpg",
            title: "Coffee Cup Branding",
            category: "Product Branding",
            description: "Custom cup branding for Coffee House — featuring the logo, tagline, and brand colors seamlessly wrapped around a coffee cup, delivering a premium and consistent brand experience to every customer.",
            color: "bg-[#efebe9]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0017.jpg",
            title: "Google Ads Banner Set",
            category: "Digital Advertising",
            description: "A complete set of Google Display Ad banners for Coffee House — crafted in multiple sizes (skyscraper, banner, square, leaderboard) to maximize reach across websites with consistent brand messaging.",
            color: "bg-[#fff8e1]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0018.jpg",
            title: "Facebook Cover Design",
            category: "Social Media Design",
            description: "A professionally crafted Facebook cover photo for Coffee House — showcasing a \"Hot Delicious Coffee\" campaign with striking product imagery, contact details, and a bold call-to-action for the page header.",
            color: "bg-[#e3f2fd]"
        },
        {
            image: "NEERAJ.FX PORTFOLIO_page-0019.jpg",
            title: "Apparel Branding – Hoodie",
            category: "Merchandise Design",
            description: "A clean logo application mockup on a branded hoodie for Coffee House — demonstrating how the brand identity translates to merchandise, with a centered chest print in a consistent and recognizable style.",
            color: "bg-[#f5f5f5]"
        },
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
                    <a
                        href="https://drive.google.com/drive/folders/1PELCDpRUhLuAzqhFOVgpXkxbuv7xtq6F"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold uppercase tracking-widest text-brand-orange pb-4 border-b-2 border-brand-orange inline-block hover:text-orange-600 transition-colors duration-200"
                    >
                        View All Projects
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {works.map((work, index) => (
                        <motion.div
                            key={work.image}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            {/* Actual Image Render */}
                            <div
                                className={`w-full aspect-[4/3] ${work.color} rounded-[2rem] border-2 border-text-dark mb-6 flex flex-col items-center justify-center text-center relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-2`}
                            >
                                <img
                                    src={`/${work.image}`}
                                    alt={work.title}
                                    className="w-full h-full object-contain"
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
