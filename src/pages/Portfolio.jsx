import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ExternalLink } from 'lucide-react'

const clients = [
    {
        logo: '/logos/logo-oso-real-estates.jpg',
        name: 'OSO Real Estates',
        tagline: 'Where Every Home Tells a Story',
        industry: 'Real Estate',
        color: '#0ea5e9',
        bg: 'from-sky-50 to-blue-50',
        border: 'border-sky-200',
        badge: 'bg-sky-100 text-sky-700',
    },
    {
        logo: '/logos/logo-vivah-utshav.jpg',
        name: 'Vivah Utshav',
        tagline: 'Turning Dream Weddings Into Timeless Memories',
        industry: 'Wedding Solutions',
        color: '#b45309',
        bg: 'from-amber-50 to-rose-50',
        border: 'border-amber-200',
        badge: 'bg-amber-100 text-amber-700',
    },
    {
        logo: '/logos/logo-vl-boutique.jpg',
        name: 'VL Boutique',
        tagline: 'Style That Speaks Before You Do',
        industry: 'Fashion & Apparel',
        color: '#ec4899',
        bg: 'from-pink-50 to-orange-50',
        border: 'border-pink-200',
        badge: 'bg-pink-100 text-pink-700',
    },
    {
        logo: '/logos/logo-amla-cubes.jpg',
        name: 'AmlaCubes',
        tagline: 'Nature\'s Power, Cubed to Perfection',
        industry: 'Health & Wellness',
        color: '#16a34a',
        bg: 'from-green-50 to-emerald-50',
        border: 'border-green-200',
        badge: 'bg-green-100 text-green-700',
    },
    {
        logo: '/logos/logo-mr-realty-talks.jpg',
        name: 'MR Realty Talks',
        tagline: 'Turning Properties Into Profits',
        industry: 'Real Estate',
        color: '#f59e0b',
        bg: 'from-yellow-50 to-gray-100',
        border: 'border-yellow-300',
        badge: 'bg-yellow-100 text-yellow-700',
    },
    {
        logo: '/logos/logo-d-boutique.jpg',
        name: 'D Boutique',
        tagline: 'Elegance Is Always In Season',
        industry: 'Bridal Fashion',
        color: '#7c3aed',
        bg: 'from-purple-50 to-pink-50',
        border: 'border-purple-200',
        badge: 'bg-purple-100 text-purple-700',
    },
    {
        logo: '/logos/logo-ms-cell-point.jpg',
        name: 'MS Cell Point',
        tagline: 'Your One-Stop Destination for Premium Gadgets',
        industry: 'Electronics & Tech',
        color: '#ca8a04',
        bg: 'from-gray-900 to-gray-800',
        border: 'border-yellow-500/40',
        badge: 'bg-yellow-900/30 text-yellow-400',
        dark: true,
    },
    {
        logo: '/logos/logo-house-of-maha.jpg',
        name: 'House of Maha',
        tagline: 'Drape Yourself in Culture and Grace',
        industry: 'Ethnic Wear',
        color: '#b91c1c',
        bg: 'from-red-50 to-amber-50',
        border: 'border-red-200',
        badge: 'bg-red-100 text-red-700',
    },
    {
        logo: '/logos/logo-1z-realty.jpg',
        name: '1Z Realty',
        tagline: 'Homes · Investments · Trust',
        industry: 'Real Estate',
        color: '#ca8a04',
        bg: 'from-gray-900 to-gray-800',
        border: 'border-yellow-500/40',
        badge: 'bg-yellow-900/30 text-yellow-400',
        dark: true,
    },
    {
        logo: '/logos/logo-astrologer-ramaraju.jpg',
        name: 'Astrologer Ramaraju',
        tagline: 'Ancient Wisdom, Timeless Guidance',
        industry: 'Astrology & Spirituality',
        color: '#92400e',
        bg: 'from-amber-50 to-yellow-50',
        border: 'border-amber-300',
        badge: 'bg-amber-100 text-amber-800',
    },
    {
        logo: '/logos/logo-sri-mahalakshmi-traders.jpg',
        name: 'Sri Mahalakshmi Traders',
        tagline: 'Building the Future, Block by Block',
        industry: 'Hardware & Cement',
        color: '#1d4ed8',
        bg: 'from-blue-50 to-indigo-50',
        border: 'border-blue-200',
        badge: 'bg-blue-100 text-blue-700',
    },
    {
        logo: '/logos/logo-vjpt.jpg',
        name: 'VJPT Trustworthy Products',
        tagline: 'Quality You Can Trust, Purity You Can Feel',
        industry: 'Wellness Products',
        color: '#15803d',
        bg: 'from-green-50 to-lime-50',
        border: 'border-green-300',
        badge: 'bg-green-100 text-green-700',
    },
    {
        logo: '/logos/logo-divya-jewelers.jpg',
        name: 'Divya Jewelers',
        tagline: 'Where Gold Meets Glory',
        industry: 'Jewellery',
        color: '#b45309',
        bg: 'from-gray-900 to-gray-800',
        border: 'border-yellow-500/50',
        badge: 'bg-yellow-900/40 text-yellow-400',
        dark: true,
    },
    {
        logo: '/logos/logo-avigna.jpg',
        name: 'Avigna',
        tagline: 'Wrap Yourself in Tradition, Walk in Style',
        industry: 'Sarees & Dress',
        color: '#db2777',
        bg: 'from-pink-50 to-rose-50',
        border: 'border-pink-300',
        badge: 'bg-pink-100 text-pink-700',
    },
]

const Portfolio = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null)

    return (
        <div className="bg-bg-light min-h-screen">

            {/* ── Hero Header ── */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-bg-light">
                {/* Background decorative elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-brand-orange/30 bg-orange-50 text-brand-orange text-sm font-bold uppercase tracking-widest"
                        >
                            <Sparkles size={14} />
                            Our Client Portfolio
                        </motion.div>

                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-text-dark mb-6 leading-none tracking-tight">
                            Brands We{' '}
                            <span className="relative inline-block">
                                <span className="text-brand-orange">Shaped</span>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    className="absolute bottom-0 left-0 right-0 h-1.5 bg-brand-green rounded-full origin-left"
                                />
                            </span>
                        </h1>

                        <p className="text-base md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Every logo tells a brand's story. Here are the identities we had the privilege of crafting — from concept to icon.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-gray-500"
                        >
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                                {clients.length}+ Logos Delivered
                            </span>
                            <span className="w-px h-4 bg-gray-300" />
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                                Across 8+ Industries
                            </span>
                            <span className="w-px h-4 bg-gray-300" />
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                                100% Custom Designs
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── Client Logos Grid ── */}
            <section className="pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
                        {clients.map((client, index) => (
                            <motion.div
                                key={client.name}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ delay: (index % 3) * 0.1, duration: 0.5, ease: 'easeOut' }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="group relative"
                            >
                                <div
                                    className={`relative rounded-3xl border-2 ${client.border} overflow-hidden transition-all duration-500
                                        ${hoveredIndex === index ? 'shadow-2xl -translate-y-2 scale-[1.02]' : 'shadow-sm'}
                                        bg-gradient-to-br ${client.bg}`}
                                >
                                    {/* Industry Badge */}
                                    <div className="absolute top-5 left-5 z-10">
                                        <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${client.badge}`}>
                                            {client.industry}
                                        </span>
                                    </div>

                                    {/* Logo Display */}
                                    <div className="relative flex items-center justify-center h-56 md:h-64 p-8 pt-14">
                                        <motion.img
                                            src={client.logo}
                                            alt={`${client.name} Logo`}
                                            className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-2xl shadow-lg"
                                            animate={{
                                                scale: hoveredIndex === index ? 1.08 : 1,
                                                rotate: hoveredIndex === index ? 2 : 0,
                                            }}
                                            transition={{ duration: 0.4, ease: 'easeOut' }}
                                        />
                                    </div>

                                    {/* Hover Glow Ring */}
                                    <motion.div
                                        className="absolute inset-0 rounded-3xl pointer-events-none"
                                        animate={{
                                            boxShadow: hoveredIndex === index
                                                ? `inset 0 0 0 2px ${client.color}40`
                                                : 'inset 0 0 0 0px transparent'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    {/* Info Section */}
                                    <div className={`px-6 pb-7 pt-1 border-t-2 ${client.border} ${client.dark ? 'border-white/10' : ''}`}>
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className={`text-xl font-extrabold mb-1 leading-tight ${client.dark ? 'text-white' : 'text-text-dark'}`}>
                                                    {client.name}
                                                </h3>
                                                <p className={`text-sm leading-relaxed italic ${client.dark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    "{client.tagline}"
                                                </p>
                                            </div>
                                            <motion.div
                                                animate={{
                                                    opacity: hoveredIndex === index ? 1 : 0,
                                                    x: hoveredIndex === index ? 0 : 8,
                                                }}
                                                transition={{ duration: 0.25 }}
                                                className="flex-shrink-0 mt-1"
                                            >
                                                <div
                                                    className="w-9 h-9 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: `${client.color}20`, color: client.color }}
                                                >
                                                    <ExternalLink size={16} />
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Color accent bar */}
                                        <motion.div
                                            className="mt-4 h-1 rounded-full origin-left"
                                            style={{ backgroundColor: client.color }}
                                            animate={{ scaleX: hoveredIndex === index ? 1 : 0.3 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Bottom CTA ── */}
            <section className="py-16 px-4 bg-text-dark">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                            Want Your Brand Among{' '}
                            <span className="text-brand-orange">These Icons?</span>
                        </h2>
                        <p className="text-gray-400 text-base md:text-lg mb-10 max-w-xl mx-auto">
                            Let's build a logo that your customers will remember — and your competitors will envy.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-brand-orange text-white font-bold text-lg rounded-full hover:bg-orange-600 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1"
                        >
                            <Sparkles size={20} />
                            Start Your Brand Journey
                        </a>
                    </motion.div>
                </div>
            </section>

        </div>
    )
}

export default Portfolio
