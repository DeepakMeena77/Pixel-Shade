import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ExternalLink, RefreshCw } from 'lucide-react'
import { supabase } from '../config/supabase'


const Portfolio = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchClients = async () => {
            setLoading(true)
            try {
                const { data, error } = await supabase
                    .from('portfolio_clients')
                    .select('*')
                    .order('sort_order', { ascending: true })
                if (error) throw error
                setClients(data || [])
            } catch (err) {
                console.error('Failed to load portfolio clients:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchClients()
    }, [])

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
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="rounded-3xl border-2 border-gray-100 overflow-hidden animate-pulse">
                                    <div className="h-56 bg-gray-100 flex items-center justify-center">
                                        <div className="w-36 h-36 bg-gray-200 rounded-2xl" />
                                    </div>
                                    <div className="px-6 py-5 space-y-2 border-t border-gray-100">
                                        <div className="h-5 bg-gray-200 rounded w-3/4" />
                                        <div className="h-4 bg-gray-100 rounded w-full" />
                                        <div className="h-1 bg-gray-100 rounded-full mt-3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : clients.length === 0 ? (
                        <div className="text-center py-24 border-2 border-dashed border-gray-200 rounded-3xl">
                            <Sparkles size={40} className="mx-auto mb-3 text-gray-300" />
                            <p className="text-gray-500 font-semibold text-lg">No portfolio clients yet</p>
                            <p className="text-gray-400 text-sm mt-1">Add clients from the Admin Panel to display them here</p>
                        </div>
                    ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
                        {clients.map((client, index) => (
                            <motion.div
                                key={client.id || client.name}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ delay: (index % 3) * 0.1, duration: 0.5, ease: 'easeOut' }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="group relative"
                            >
                                <div
                                    className={`relative rounded-3xl border-2 ${
                                        client.border_class || client.border || 'border-orange-200'
                                    } overflow-hidden transition-all duration-500
                                        ${hoveredIndex === index ? 'shadow-2xl -translate-y-2 scale-[1.02]' : 'shadow-sm'}
                                        bg-gradient-to-br ${client.bg}`}
                                >
                                    {/* Industry Badge */}
                                    <div className="absolute top-5 left-5 z-10">
                                        <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                                            client.badge_class || client.badge || 'bg-orange-100 text-orange-700'
                                        }`}>
                                            {client.industry}
                                        </span>
                                    </div>

                                    {/* Logo Display */}
                                    <div className="relative flex items-center justify-center h-56 md:h-64 p-8 pt-14">
                                        <motion.div
                                            className="w-40 h-40 md:w-48 md:h-48 rounded-full shadow-xl overflow-hidden flex-shrink-0"
                                            animate={{
                                                scale: hoveredIndex === index ? 1.08 : 1,
                                                rotate: hoveredIndex === index ? 2 : 0,
                                            }}
                                            transition={{ duration: 0.4, ease: 'easeOut' }}
                                        >
                                            <img
                                                src={client.logo_url}
                                                alt={`${client.name} Logo`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none'
                                                    e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:900;color:${client.color || '#f97316'}">${client.name.charAt(0)}</div>`
                                                }}
                                            />
                                        </motion.div>
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
                                    <div className={`px-6 pb-7 pt-1 border-t-2 ${
                                        client.border_class || client.border || 'border-orange-200'
                                    } ${client.dark ? 'border-white/10' : ''}`}>
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
                    )}
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
