import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../config/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CheckCircle, XCircle, Clock, Star, Image as ImageIcon,
    Lock, Eye, EyeOff, RefreshCw, Trash2, ShieldCheck, LogOut,
    Briefcase, Grid, MessageSquare, Plus, Edit2, X, Save,
    ChevronUp, ChevronDown, Upload, AlertCircle, Layers, Paintbrush,
    Download
} from 'lucide-react'

// ─── Default data (previously hardcoded) ─────────────────────────────────────

const SEED_SERVICES = [
    {
        title: 'Logo Designing',
        tagline: 'Craft a brand identity that commands respect.',
        description: '🎯 Start your brand journey with an iconic identity!\n\nWant a logo that makes your business look premium and trustworthy? 💎\n\nWe specialize in creating powerful, memorable, and custom logos tailored to your brand\'s unique story. 🖌️\n\n💰 Logos: Starts from ₹1,500\n\nLet\'s design a brand identity you\'ll be proud to show off!',
        pricing: 'Starts from ₹1,500',
        features: ['✨ Custom, Unique Designs', '📐 High-Resolution Vector Files', '🎨 Strategic Color Psychology', '📱 Scalable for Web & Print'],
        badge: '',
        icon_color: 'orange',
        sort_order: 0,
    },
    {
        title: 'General Graphic Design',
        tagline: 'High-converting visuals for every marketing need.',
        description: '🎨 Need professional graphics for your business or marketing?\n\nFrom promotional materials to business stationery, we create high-converting designs that grab attention! 🔥\n\n💰 Flyers & Brochures: Starts from ₹1,000\n💳 Business/Visiting Cards: Starts from ₹1,000\n\nUpgrade your visual game today!',
        pricing: 'Starts from ₹1,000',
        features: ['✨ Eye-Catching Flyers & Posters', '🏢 Professional Business Cards', '📱 Clean UI/Ad Creatives'],
        badge: '',
        icon_color: 'green',
        sort_order: 1,
    },
]

const SEED_CLIENTS = [
    { name: 'OSO Real Estates',         tagline: 'Where Every Home Tells a Story',                   industry: 'Real Estate',           logo_url: '/logos/logo-oso-real-estates.jpg',         color: '#0ea5e9', bg: 'from-sky-50 to-blue-50',       border_class: 'border-sky-200',      badge_class: 'bg-sky-100 text-sky-700',        dark: false, sort_order: 0 },
    { name: 'Vivah Utshav',             tagline: 'Turning Dream Weddings Into Timeless Memories',    industry: 'Wedding Solutions',     logo_url: '/logos/logo-vivah-utshav.jpg',             color: '#b45309', bg: 'from-amber-50 to-rose-50',     border_class: 'border-amber-200',    badge_class: 'bg-amber-100 text-amber-700',    dark: false, sort_order: 1 },
    { name: 'VL Boutique',              tagline: 'Style That Speaks Before You Do',                  industry: 'Fashion & Apparel',     logo_url: '/logos/logo-vl-boutique.jpg',              color: '#ec4899', bg: 'from-pink-50 to-orange-50',    border_class: 'border-pink-200',     badge_class: 'bg-pink-100 text-pink-700',      dark: false, sort_order: 2 },
    { name: 'AmlaCubes',                tagline: 'Nature\'s Power, Cubed to Perfection',              industry: 'Health & Wellness',     logo_url: '/logos/logo-amla-cubes.jpg',               color: '#16a34a', bg: 'from-green-50 to-emerald-50',  border_class: 'border-green-200',    badge_class: 'bg-green-100 text-green-700',    dark: false, sort_order: 3 },
    { name: 'MR Realty Talks',          tagline: 'Turning Properties Into Profits',                  industry: 'Real Estate',           logo_url: '/logos/logo-mr-realty-talks.jpg',          color: '#f59e0b', bg: 'from-yellow-50 to-gray-100',   border_class: 'border-yellow-300',   badge_class: 'bg-yellow-100 text-yellow-700',  dark: false, sort_order: 4 },
    { name: 'D Boutique',               tagline: 'Elegance Is Always In Season',                     industry: 'Bridal Fashion',        logo_url: '/logos/logo-d-boutique.jpg',               color: '#7c3aed', bg: 'from-purple-50 to-pink-50',    border_class: 'border-purple-200',   badge_class: 'bg-purple-100 text-purple-700',  dark: false, sort_order: 5 },
    { name: 'MS Cell Point',            tagline: 'Your One-Stop Destination for Premium Gadgets',    industry: 'Electronics & Tech',    logo_url: '/logos/logo-ms-cell-point.jpg',            color: '#ca8a04', bg: 'from-gray-900 to-gray-800',    border_class: 'border-yellow-500/40', badge_class: 'bg-yellow-900/30 text-yellow-400', dark: true,  sort_order: 6 },
    { name: 'House of Maha',            tagline: 'Drape Yourself in Culture and Grace',              industry: 'Ethnic Wear',           logo_url: '/logos/logo-house-of-maha.jpg',            color: '#b91c1c', bg: 'from-red-50 to-amber-50',      border_class: 'border-red-200',      badge_class: 'bg-red-100 text-red-700',        dark: false, sort_order: 7 },
    { name: '1Z Realty',                tagline: 'Homes · Investments · Trust',                      industry: 'Real Estate',           logo_url: '/logos/logo-1z-realty.jpg',                color: '#ca8a04', bg: 'from-gray-900 to-gray-800',    border_class: 'border-yellow-500/40', badge_class: 'bg-yellow-900/30 text-yellow-400', dark: true,  sort_order: 8 },
    { name: 'Astrologer Ramaraju',      tagline: 'Ancient Wisdom, Timeless Guidance',                industry: 'Astrology & Spirituality', logo_url: '/logos/logo-astrologer-ramaraju.jpg',   color: '#92400e', bg: 'from-amber-50 to-yellow-50',   border_class: 'border-amber-300',    badge_class: 'bg-amber-100 text-amber-800',    dark: false, sort_order: 9 },
    { name: 'Sri Mahalakshmi Traders',  tagline: 'Building the Future, Block by Block',              industry: 'Hardware & Cement',     logo_url: '/logos/logo-sri-mahalakshmi-traders.jpg',  color: '#1d4ed8', bg: 'from-blue-50 to-indigo-50',    border_class: 'border-blue-200',     badge_class: 'bg-blue-100 text-blue-700',      dark: false, sort_order: 10 },
    { name: 'VJPT Trustworthy Products',tagline: 'Quality You Can Trust, Purity You Can Feel',       industry: 'Wellness Products',     logo_url: '/logos/logo-vjpt.jpg',                     color: '#15803d', bg: 'from-green-50 to-lime-50',     border_class: 'border-green-300',    badge_class: 'bg-green-100 text-green-700',    dark: false, sort_order: 11 },
    { name: 'Divya Jewelers',           tagline: 'Where Gold Meets Glory',                           industry: 'Jewellery',             logo_url: '/logos/logo-divya-jewelers.jpg',           color: '#b45309', bg: 'from-gray-900 to-gray-800',    border_class: 'border-yellow-500/50', badge_class: 'bg-yellow-900/40 text-yellow-400', dark: true,  sort_order: 12 },
    { name: 'Avigna',                   tagline: 'Wrap Yourself in Tradition, Walk in Style',         industry: 'Sarees & Dress',        logo_url: '/logos/logo-avigna.jpg',                   color: '#db2777', bg: 'from-pink-50 to-rose-50',      border_class: 'border-pink-300',     badge_class: 'bg-pink-100 text-pink-700',      dark: false, sort_order: 13 },
]

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICE_LABELS = {
    'invitations': 'Custom Invitation Cards',
    'social-media': 'Social Media Promo & Management',
    'logos': 'Logo Designing',
    'graphic-design': 'General Graphic Design',
}

const STATUS_STYLES = {
    pending:  'bg-yellow-100 text-yellow-700 border-yellow-200',
    approved: 'bg-green-100 text-green-700 border-green-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
}

const THEME_PRESETS = [
    { label: 'Sky Blue',    color: '#0ea5e9', bg: 'from-sky-50 to-blue-50',       border: 'border-sky-200',    badge: 'bg-sky-100 text-sky-700',      dark: false },
    { label: 'Amber Gold',  color: '#b45309', bg: 'from-amber-50 to-rose-50',     border: 'border-amber-200',  badge: 'bg-amber-100 text-amber-700',  dark: false },
    { label: 'Pink',        color: '#ec4899', bg: 'from-pink-50 to-orange-50',    border: 'border-pink-200',   badge: 'bg-pink-100 text-pink-700',    dark: false },
    { label: 'Green',       color: '#16a34a', bg: 'from-green-50 to-emerald-50',  border: 'border-green-200',  badge: 'bg-green-100 text-green-700',  dark: false },
    { label: 'Yellow',      color: '#f59e0b', bg: 'from-yellow-50 to-gray-100',   border: 'border-yellow-300', badge: 'bg-yellow-100 text-yellow-700', dark: false },
    { label: 'Purple',      color: '#7c3aed', bg: 'from-purple-50 to-pink-50',    border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', dark: false },
    { label: 'Dark Gold',   color: '#ca8a04', bg: 'from-gray-900 to-gray-800',    border: 'border-yellow-500/40', badge: 'bg-yellow-900/30 text-yellow-400', dark: true },
    { label: 'Red',         color: '#b91c1c', bg: 'from-red-50 to-amber-50',      border: 'border-red-200',    badge: 'bg-red-100 text-red-700',      dark: false },
    { label: 'Blue',        color: '#1d4ed8', bg: 'from-blue-50 to-indigo-50',    border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-700',    dark: false },
    { label: 'Dark Red',    color: '#b91c1c', bg: 'from-gray-900 to-gray-800',    border: 'border-yellow-500/50', badge: 'bg-yellow-900/40 text-yellow-400', dark: true },
    { label: 'Lime Green',  color: '#15803d', bg: 'from-green-50 to-lime-50',     border: 'border-green-300',  badge: 'bg-green-100 text-green-700',  dark: false },
    { label: 'Pink Rose',   color: '#db2777', bg: 'from-pink-50 to-rose-50',      border: 'border-pink-300',   badge: 'bg-pink-100 text-pink-700',    dark: false },
]

// ─── Shared UI helpers ────────────────────────────────────────────────────────

const ModalOverlay = ({ onClose, children }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
        onClick={onClose}
    >
        <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-2xl my-8"
            onClick={e => e.stopPropagation()}
        >
            {children}
        </motion.div>
    </motion.div>
)

const FormField = ({ label, required, children, hint }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-300 mb-1.5">
            {label} {required && <span className="text-red-400">*</span>}
        </label>
        {children}
        {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
)

const inputClass = "w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-orange transition-colors placeholder-gray-600"
const textareaClass = "w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-orange transition-colors placeholder-gray-600 min-h-[100px] resize-none"

// ─── Services Tab ─────────────────────────────────────────────────────────────

function ServicesTab() {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)
    const [seeding, setSeeding] = useState(false)
    const [modal, setModal] = useState(null)   // null | 'add' | { ...service }
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState(null)
    const [deletingId, setDeletingId] = useState(null)

    // ── Form state — each field updated individually to avoid closure issues ──
    const [fTitle,    setFTitle]    = useState('')
    const [fTagline,  setFTagline]  = useState('')
    const [fDesc,     setFDesc]     = useState('')
    const [fPricing,  setFPricing]  = useState('')
    const [fBadge,    setFBadge]    = useState('')
    const [fColor,    setFColor]    = useState('orange')
    const [fFeatures, setFFeatures] = useState([''])
    const [fOrder,    setFOrder]    = useState(0)

    const resetForm = (svc = null) => {
        setFTitle(svc?.title    || '')
        setFTagline(svc?.tagline  || '')
        setFDesc(svc?.description || '')
        setFPricing(svc?.pricing  || '')
        setFBadge(svc?.badge    || '')
        setFColor(svc?.icon_color || 'orange')
        setFFeatures(Array.isArray(svc?.features) && svc.features.length > 0 ? svc.features : [''])
        setFOrder(svc?.sort_order ?? 0)
    }

    const fetchServices = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('sort_order', { ascending: true })
            if (error) throw error
            setServices(data || [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchServices() }, [])

    const openAdd = () => {
        resetForm()
        setFOrder(services.length)
        setError('')
        setModal('add')
    }

    const openEdit = (svc) => {
        resetForm(svc)
        setError('')
        setModal(svc)
    }

    // ── Seed previous data ──
    const handleSeed = async () => {
        if (!window.confirm('This will add the 2 original services (Logo Designing & Graphic Design) to your database. Continue?')) return
        setSeeding(true)
        try {
            const { error } = await supabase.from('services').insert(SEED_SERVICES)
            if (error) throw error
            await fetchServices()
        } catch (err) {
            alert('Seed failed: ' + (err.message || 'Unknown error'))
        } finally {
            setSeeding(false)
        }
    }

    const handleSave = async (e) => {
        e.preventDefault()
        if (!fTitle.trim()) { setError('Title is required.'); return }
        setSaving(true)
        setError('')
        try {
            const payload = {
                title:       fTitle.trim(),
                tagline:     fTagline.trim(),
                description: fDesc.trim(),
                pricing:     fPricing.trim(),
                features:    fFeatures.filter(f => f.trim() !== ''),
                badge:       fBadge.trim(),
                icon_color:  fColor,
                sort_order:  Number(fOrder) || 0,
            }
            if (modal === 'add') {
                const { error } = await supabase.from('services').insert([payload])
                if (error) throw error
            } else {
                const { error } = await supabase.from('services').update(payload).eq('id', modal.id)
                if (error) throw error
            }
            setModal(null)
            await fetchServices()
        } catch (err) {
            setError(err.message || 'Failed to save. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        setDeletingId(id)
        try {
            const { error } = await supabase.from('services').delete().eq('id', id)
            if (error) throw error
            setServices(prev => prev.filter(s => s.id !== id))
        } catch (err) {
            console.error(err)
        } finally {
            setDeletingId(null)
            setDeleteConfirm(null)
        }
    }

    const moveOrder = async (svc, dir) => {
        const idx = services.findIndex(s => s.id === svc.id)
        const target = services[idx + dir]
        if (!target) return
        await Promise.all([
            supabase.from('services').update({ sort_order: target.sort_order }).eq('id', svc.id),
            supabase.from('services').update({ sort_order: svc.sort_order }).eq('id', target.id),
        ])
        await fetchServices()
    }

    const addFeature    = () => setFFeatures(f => [...f, ''])
    const removeFeature = (i) => setFFeatures(f => f.filter((_, idx) => idx !== i))
    const updateFeature = (i, val) => setFFeatures(f => { const a = [...f]; a[i] = val; return a })

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-extrabold text-white">Services</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Manage the service cards shown on the Services page</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSeed}
                        disabled={seeding}
                        title="Import the 2 original services from before"
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-gray-300 font-semibold rounded-xl hover:bg-gray-700 transition-colors text-sm disabled:opacity-60"
                    >
                        {seeding ? <RefreshCw size={15} className="animate-spin" /> : <Download size={15} />}
                        Restore Previous
                    </button>
                    <button
                        onClick={openAdd}
                        className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white font-bold rounded-xl hover:bg-orange-600 transition-colors text-sm"
                    >
                        <Plus size={16} /> Add Service
                    </button>
                </div>
            </div>

            {/* List */}
            {loading ? (
                <div className="flex justify-center py-16"><RefreshCw size={28} className="animate-spin text-gray-600" /></div>
            ) : services.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-2xl">
                    <Briefcase size={40} className="mx-auto mb-3 text-gray-700" />
                    <p className="text-gray-500 font-semibold">No services yet</p>
                    <p className="text-gray-600 text-sm mt-1">Click "Restore Previous" to load your original services, or "Add Service" to create new ones</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {services.map((svc, idx) => (
                        <motion.div
                            key={svc.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-start gap-4"
                        >
                            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${svc.icon_color === 'green' ? 'bg-green-500/10' : 'bg-orange-500/10'}`}>
                                {svc.icon_color === 'green'
                                    ? <Paintbrush size={18} className="text-brand-green" />
                                    : <Layers size={18} className="text-brand-orange" />
                                }
                            </div>
                            <div className="flex-grow min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <h3 className="font-bold text-white text-base">{svc.title}</h3>
                                    {svc.badge && (
                                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">{svc.badge}</span>
                                    )}
                                </div>
                                {svc.tagline && <p className="text-sm text-gray-400 italic mb-1">{svc.tagline}</p>}
                                {svc.pricing && <span className="inline-block text-xs font-bold bg-gray-800 text-gray-300 px-3 py-1 rounded-full">{svc.pricing}</span>}
                                {Array.isArray(svc.features) && svc.features.length > 0 && (
                                    <p className="text-xs text-gray-600 mt-1">{svc.features.length} feature{svc.features.length !== 1 ? 's' : ''}</p>
                                )}
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <button onClick={() => moveOrder(svc, -1)} disabled={idx === 0}
                                    className="p-1.5 rounded-lg text-gray-600 hover:text-white hover:bg-gray-800 transition-colors disabled:opacity-30">
                                    <ChevronUp size={15} />
                                </button>
                                <button onClick={() => moveOrder(svc, 1)} disabled={idx === services.length - 1}
                                    className="p-1.5 rounded-lg text-gray-600 hover:text-white hover:bg-gray-800 transition-colors disabled:opacity-30">
                                    <ChevronDown size={15} />
                                </button>
                                <button onClick={() => openEdit(svc)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                                    <Edit2 size={15} />
                                </button>
                                <button onClick={() => setDeleteConfirm(svc)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {modal !== null && (
                    <ModalOverlay onClose={() => setModal(null)}>
                        <div className="p-7">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-extrabold text-white">{modal === 'add' ? 'Add Service' : 'Edit Service'}</h3>
                                <button onClick={() => setModal(null)} className="text-gray-500 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField label="Title" required>
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className={inputClass}
                                            value={fTitle}
                                            onChange={e => setFTitle(e.target.value)}
                                            placeholder="e.g. Logo Designing"
                                        />
                                    </FormField>
                                    <FormField label="Badge Label" hint="e.g. 'New', 'Popular' (optional)">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className={inputClass}
                                            value={fBadge}
                                            onChange={e => setFBadge(e.target.value)}
                                            placeholder="Leave empty for none"
                                        />
                                    </FormField>
                                </div>

                                <FormField label="Tagline">
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className={inputClass}
                                        value={fTagline}
                                        onChange={e => setFTagline(e.target.value)}
                                        placeholder="Short catchy line under the title"
                                    />
                                </FormField>

                                <FormField label="Description" hint="Supports text, emojis, and line breaks">
                                    <textarea
                                        className={textareaClass}
                                        value={fDesc}
                                        onChange={e => setFDesc(e.target.value)}
                                        placeholder="Describe this service..."
                                    />
                                </FormField>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField label="Pricing" hint="e.g. Starts from ₹1,500">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className={inputClass}
                                            value={fPricing}
                                            onChange={e => setFPricing(e.target.value)}
                                            placeholder="Starts from ₹..."
                                        />
                                    </FormField>
                                    <FormField label="Icon Color">
                                        <div className="flex gap-3 mt-1">
                                            {['orange', 'green'].map(c => (
                                                <button key={c} type="button"
                                                    onClick={() => setFColor(c)}
                                                    className={`flex-1 py-2 rounded-xl border-2 font-semibold text-sm capitalize transition-all ${fColor === c
                                                        ? c === 'orange' ? 'border-orange-500 bg-orange-500/15 text-orange-400' : 'border-green-500 bg-green-500/15 text-green-400'
                                                        : 'border-gray-700 text-gray-500 hover:border-gray-600'
                                                    }`}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </FormField>
                                </div>

                                {/* Features */}
                                <FormField label="Features" hint="Bullet points shown on the card">
                                    <div className="space-y-2 mt-1">
                                        {fFeatures.map((feat, i) => (
                                            <div key={i} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className={inputClass}
                                                    value={feat}
                                                    onChange={e => updateFeature(i, e.target.value)}
                                                    placeholder={`Feature ${i + 1}`}
                                                />
                                                <button type="button" onClick={() => removeFeature(i)}
                                                    className="flex-shrink-0 p-2.5 rounded-xl text-gray-600 hover:text-red-400 hover:bg-red-500/10 border border-gray-700 transition-colors">
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={addFeature}
                                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-2 py-1">
                                            <Plus size={14} /> Add feature
                                        </button>
                                    </div>
                                </FormField>

                                {error && (
                                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                                        <AlertCircle size={15} /> {error}
                                    </div>
                                )}

                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setModal(null)}
                                        className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors font-semibold text-sm">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={saving}
                                        className="flex-1 py-3 rounded-xl bg-brand-orange text-white font-bold text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                                        {saving ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
                                        {saving ? 'Saving...' : 'Save Service'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </ModalOverlay>
                )}
            </AnimatePresence>

            {/* Delete Confirm */}
            <AnimatePresence>
                {deleteConfirm && (
                    <ModalOverlay onClose={() => setDeleteConfirm(null)}>
                        <div className="p-7 text-center">
                            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                                <Trash2 size={24} className="text-red-400" />
                            </div>
                            <h3 className="text-lg font-extrabold text-white mb-2">Delete Service?</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                "<span className="text-white font-semibold">{deleteConfirm.title}</span>" will be permanently removed from the website.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-400 hover:text-white transition-colors font-semibold text-sm">
                                    Cancel
                                </button>
                                <button onClick={() => handleDelete(deleteConfirm.id)} disabled={!!deletingId}
                                    className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                                    {deletingId ? <RefreshCw size={15} className="animate-spin" /> : <Trash2 size={15} />}
                                    Delete
                                </button>
                            </div>
                        </div>
                    </ModalOverlay>
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── Our Work Tab ─────────────────────────────────────────────────────────────

function OurWorkTab() {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [seeding, setSeeding] = useState(false)
    const [modal, setModal] = useState(null)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState(null)
    const [deletingId, setDeletingId] = useState(null)
    const [logoFile, setLogoFile] = useState(null)
    const [logoPreview, setLogoPreview] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(false)
    const fileRef = useRef(null)

    // ── Separate state vars to avoid React synthetic event closure bug ──
    const [fName,        setFName]        = useState('')
    const [fTagline,     setFTagline]     = useState('')
    const [fIndustry,    setFIndustry]    = useState('')
    const [fLogoUrl,     setFLogoUrl]     = useState('')
    const [fColor,       setFColor]       = useState('#f97316')
    const [fBg,          setFBg]          = useState('from-orange-50 to-amber-50')
    const [fBorderClass, setFBorderClass] = useState('border-orange-200')
    const [fBadgeClass,  setFBadgeClass]  = useState('bg-orange-100 text-orange-700')
    const [fDark,        setFDark]        = useState(false)
    const [fOrder,       setFOrder]       = useState(0)

    const resetForm = (client = null) => {
        setFName(client?.name || '')
        setFTagline(client?.tagline || '')
        setFIndustry(client?.industry || '')
        setFLogoUrl(client?.logo_url || '')
        setFColor(client?.color || '#f97316')
        setFBg(client?.bg || 'from-orange-50 to-amber-50')
        setFBorderClass(client?.border_class || 'border-orange-200')
        setFBadgeClass(client?.badge_class || 'bg-orange-100 text-orange-700')
        setFDark(client?.dark || false)
        setFOrder(client?.sort_order ?? 0)
    }

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
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchClients() }, [])

    const openAdd = () => {
        resetForm()
        setFOrder(clients.length)
        setLogoFile(null)
        setLogoPreview(null)
        setError('')
        setModal('add')
    }

    const openEdit = (client) => {
        resetForm(client)
        setLogoFile(null)
        setLogoPreview(client.logo_url || null)
        setError('')
        setModal(client)
    }

    // ── Seed previous clients ──
    const handleSeed = async () => {
        if (!window.confirm('This will add all 14 original portfolio clients to your database. Continue?')) return
        setSeeding(true)
        try {
            const { error } = await supabase.from('portfolio_clients').insert(SEED_CLIENTS)
            if (error) throw error
            await fetchClients()
        } catch (err) {
            alert('Seed failed: ' + (err.message || 'Unknown error'))
        } finally {
            setSeeding(false)
        }
    }

    const handleLogoChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        if (!file.type.startsWith('image/')) { setError('Please upload a valid image file.'); return }
        if (file.size > 5 * 1024 * 1024) { setError('Image must be under 5MB.'); return }
        setError('')
        setLogoFile(file)
        setLogoPreview(URL.createObjectURL(file))
    }

    const applyTheme = (preset) => {
        setFColor(preset.color)
        setFBg(preset.bg)
        setFBorderClass(preset.border)
        setFBadgeClass(preset.badge)
        setFDark(preset.dark)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        if (!fName.trim()) { setError('Name is required.'); return }
        setSaving(true)
        setError('')
        try {
            let logoUrl = fLogoUrl

            if (logoFile) {
                setUploadProgress(true)
                try {
                    const ext = logoFile.name.split('.').pop()
                    const fileName = `${fName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.${ext}`
                    const { error: uploadErr } = await supabase.storage
                        .from('portfolio-logos')
                        .upload(fileName, logoFile, { upsert: false })
                    if (!uploadErr) {
                        const { data: urlData } = supabase.storage
                            .from('portfolio-logos')
                            .getPublicUrl(fileName)
                        logoUrl = urlData.publicUrl
                    } else {
                        setError(`Logo upload failed: ${uploadErr.message}. Saving with existing URL.`)
                    }
                } catch (uploadErr) {
                    console.warn('Logo upload error:', uploadErr)
                } finally {
                    setUploadProgress(false)
                }
            }

            const payload = {
                name:         fName.trim(),
                tagline:      fTagline.trim(),
                industry:     fIndustry.trim(),
                logo_url:     logoUrl,
                color:        fColor,
                bg:           fBg,
                border_class: fBorderClass,
                badge_class:  fBadgeClass,
                dark:         fDark,
                sort_order:   Number(fOrder) || 0,
            }

            if (modal === 'add') {
                const { error } = await supabase.from('portfolio_clients').insert([payload])
                if (error) throw error
            } else {
                const { error } = await supabase.from('portfolio_clients').update(payload).eq('id', modal.id)
                if (error) throw error
            }
            setModal(null)
            await fetchClients()
        } catch (err) {
            setError(err.message || 'Failed to save.')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        setDeletingId(id)
        try {
            const { error } = await supabase.from('portfolio_clients').delete().eq('id', id)
            if (error) throw error
            setClients(prev => prev.filter(c => c.id !== id))
        } catch (err) {
            console.error(err)
        } finally {
            setDeletingId(null)
            setDeleteConfirm(null)
        }
    }

    const moveOrder = async (client, dir) => {
        const idx = clients.findIndex(c => c.id === client.id)
        const target = clients[idx + dir]
        if (!target) return
        await Promise.all([
            supabase.from('portfolio_clients').update({ sort_order: target.sort_order }).eq('id', client.id),
            supabase.from('portfolio_clients').update({ sort_order: client.sort_order }).eq('id', target.id),
        ])
        await fetchClients()
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-extrabold text-white">Our Work</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Manage the client portfolio cards shown on the Portfolio page</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSeed}
                        disabled={seeding}
                        title="Import all 14 original portfolio clients"
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-gray-300 font-semibold rounded-xl hover:bg-gray-700 transition-colors text-sm disabled:opacity-60"
                    >
                        {seeding ? <RefreshCw size={15} className="animate-spin" /> : <Download size={15} />}
                        Restore Previous
                    </button>
                    <button
                        onClick={openAdd}
                        className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white font-bold rounded-xl hover:bg-orange-600 transition-colors text-sm"
                    >
                        <Plus size={16} /> Add Client
                    </button>
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex justify-center py-16"><RefreshCw size={28} className="animate-spin text-gray-600" /></div>
            ) : clients.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-2xl">
                    <Grid size={40} className="mx-auto mb-3 text-gray-700" />
                    <p className="text-gray-500 font-semibold">No clients yet</p>
                    <p className="text-gray-600 text-sm mt-1">Click "Restore Previous" to load all 14 original clients, or "Add Client" to add new ones</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clients.map((client, idx) => (
                        <motion.div
                            key={client.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`relative rounded-2xl border overflow-hidden ${client.dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
                        >
                            <div className={`flex items-center justify-center h-36 bg-gradient-to-br ${client.bg}`}>
                                {client.logo_url ? (
                                    <img src={client.logo_url} alt={client.name}
                                        className="w-24 h-24 object-cover rounded-xl shadow" />
                                ) : (
                                    <div className="w-24 h-24 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400">
                                        <ImageIcon size={28} />
                                    </div>
                                )}
                            </div>
                            {client.industry && (
                                <span className={`absolute top-3 left-3 text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${client.badge_class}`}>
                                    {client.industry}
                                </span>
                            )}
                            <div className={`px-4 py-3 border-t ${client.dark ? 'border-gray-700' : 'border-gray-100'}`}>
                                <p className={`font-bold text-sm ${client.dark ? 'text-white' : 'text-gray-900'}`}>{client.name}</p>
                                {client.tagline && <p className={`text-xs italic mt-0.5 ${client.dark ? 'text-gray-400' : 'text-gray-500'}`}>"{client.tagline}"</p>}
                            </div>
                            <div className={`flex items-center gap-1 px-3 py-2 border-t ${client.dark ? 'border-gray-700 bg-gray-950' : 'border-gray-100 bg-gray-50'}`}>
                                <button onClick={() => moveOrder(client, -1)} disabled={idx === 0}
                                    className="p-1 rounded text-gray-500 hover:text-white hover:bg-gray-700 transition-colors disabled:opacity-30">
                                    <ChevronUp size={14} />
                                </button>
                                <button onClick={() => moveOrder(client, 1)} disabled={idx === clients.length - 1}
                                    className="p-1 rounded text-gray-500 hover:text-white hover:bg-gray-700 transition-colors disabled:opacity-30">
                                    <ChevronDown size={14} />
                                </button>
                                <div className="flex-grow" />
                                <button onClick={() => openEdit(client)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                                    <Edit2 size={14} />
                                </button>
                                <button onClick={() => setDeleteConfirm(client)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Add / Edit Modal */}
            <AnimatePresence>
                {modal !== null && (
                    <ModalOverlay onClose={() => setModal(null)}>
                        <div className="p-7">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-extrabold text-white">{modal === 'add' ? 'Add Client' : 'Edit Client'}</h3>
                                <button onClick={() => setModal(null)} className="text-gray-500 hover:text-white transition-colors"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField label="Client / Brand Name" required>
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className={inputClass}
                                            value={fName}
                                            onChange={e => setFName(e.target.value)}
                                            placeholder="e.g. OSO Real Estates"
                                        />
                                    </FormField>
                                    <FormField label="Industry">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className={inputClass}
                                            value={fIndustry}
                                            onChange={e => setFIndustry(e.target.value)}
                                            placeholder="e.g. Real Estate"
                                        />
                                    </FormField>
                                </div>

                                <FormField label="Tagline">
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className={inputClass}
                                        value={fTagline}
                                        onChange={e => setFTagline(e.target.value)}
                                        placeholder="Short brand tagline"
                                    />
                                </FormField>

                                {/* Logo Upload */}
                                <FormField label="Logo Image" hint="Upload to Supabase, or paste an existing public path below">
                                    <div className="space-y-3">
                                        {logoPreview ? (
                                            <div className="relative inline-block">
                                                <img src={logoPreview} alt="Logo preview" className="w-24 h-24 object-cover rounded-xl border border-gray-700" />
                                                <button type="button"
                                                    onClick={() => { setLogoFile(null); setLogoPreview(null); setFLogoUrl(''); if (fileRef.current) fileRef.current.value = '' }}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                                                    <X size={13} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => fileRef.current?.click()}
                                                className="border-2 border-dashed border-gray-700 rounded-xl p-5 text-center cursor-pointer hover:border-brand-orange transition-colors group"
                                            >
                                                <Upload size={22} className="mx-auto mb-1.5 text-gray-600 group-hover:text-brand-orange transition-colors" />
                                                <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">Click to upload logo</p>
                                                <p className="text-xs text-gray-600 mt-0.5">JPG, PNG, WEBP · Max 5MB</p>
                                            </div>
                                        )}
                                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className={inputClass}
                                            value={fLogoUrl}
                                            onChange={e => { setFLogoUrl(e.target.value); if (!logoFile) setLogoPreview(e.target.value || null) }}
                                            placeholder="Or paste URL e.g. /logos/logo-name.jpg"
                                        />
                                    </div>
                                </FormField>

                                {/* Theme Presets */}
                                <FormField label="Card Theme" hint="Pick a color theme for this client's card">
                                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-1">
                                        {THEME_PRESETS.map((preset) => (
                                            <button
                                                key={preset.label}
                                                type="button"
                                                onClick={() => applyTheme(preset)}
                                                title={preset.label}
                                                className={`relative h-10 rounded-xl border-2 transition-all overflow-hidden ${fColor === preset.color && fDark === preset.dark ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:border-gray-500'}`}
                                                style={{ background: preset.dark ? '#111827' : undefined }}
                                            >
                                                <div className="absolute inset-0" style={{ backgroundColor: preset.color, opacity: preset.dark ? 0.6 : 0.35 }} />
                                                <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.color }} />
                                                {preset.dark && <div className="absolute top-0.5 left-0.5 text-[9px] text-yellow-400 font-bold">D</div>}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Selected: {THEME_PRESETS.find(p => p.color === fColor && p.dark === fDark)?.label || 'Custom'} · {fDark ? 'Dark' : 'Light'} card
                                    </p>
                                </FormField>

                                {/* Custom color override */}
                                <FormField label="Custom Accent Color" hint="Hex color — overrides theme color">
                                    <div className="flex gap-3">
                                        <input
                                            type="color"
                                            value={fColor}
                                            onChange={e => setFColor(e.target.value)}
                                            className="w-12 h-10 rounded-xl border border-gray-700 bg-gray-950 cursor-pointer p-1"
                                        />
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className={inputClass}
                                            value={fColor}
                                            onChange={e => setFColor(e.target.value)}
                                            placeholder="#f97316"
                                        />
                                    </div>
                                </FormField>

                                {error && (
                                    <div className="flex items-start gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                                        <AlertCircle size={15} className="flex-shrink-0 mt-0.5" /> {error}
                                    </div>
                                )}

                                {uploadProgress && (
                                    <div className="flex items-center gap-2 text-blue-400 text-sm">
                                        <RefreshCw size={14} className="animate-spin" /> Uploading logo...
                                    </div>
                                )}

                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setModal(null)}
                                        className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors font-semibold text-sm">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={saving}
                                        className="flex-1 py-3 rounded-xl bg-brand-orange text-white font-bold text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                                        {saving ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
                                        {saving ? 'Saving...' : 'Save Client'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </ModalOverlay>
                )}
            </AnimatePresence>

            {/* Delete Confirm */}
            <AnimatePresence>
                {deleteConfirm && (
                    <ModalOverlay onClose={() => setDeleteConfirm(null)}>
                        <div className="p-7 text-center">
                            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                                <Trash2 size={24} className="text-red-400" />
                            </div>
                            <h3 className="text-lg font-extrabold text-white mb-2">Remove Client?</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                "<span className="text-white font-semibold">{deleteConfirm.name}</span>" will be permanently removed from the portfolio.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-400 hover:text-white transition-colors font-semibold text-sm">
                                    Cancel
                                </button>
                                <button onClick={() => handleDelete(deleteConfirm.id)} disabled={!!deletingId}
                                    className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                                    {deletingId ? <RefreshCw size={15} className="animate-spin" /> : <Trash2 size={15} />}
                                    Remove
                                </button>
                            </div>
                        </div>
                    </ModalOverlay>
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── Reviews Tab ──────────────────────────────────────────────────────────────

function ReviewsTab() {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState('pending')
    const [actionLoading, setActionLoading] = useState(null)
    const [lightbox, setLightbox] = useState(null)

    const fetchReviews = async () => {
        setLoading(true)
        try {
            let query = supabase.from('reviews').select('*').order('created_at', { ascending: false })
            if (filter !== 'all') query = query.eq('status', filter)
            const { data, error } = await query
            if (error) throw error
            setReviews(data || [])
        } catch (err) {
            console.error('Fetch error:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchReviews() }, [filter])

    const updateStatus = async (id, newStatus) => {
        setActionLoading(id + newStatus)
        try {
            const { error } = await supabase.from('reviews').update({ status: newStatus }).eq('id', id)
            if (error) throw error
            setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r))
        } catch (err) {
            console.error('Update error:', err)
        } finally {
            setActionLoading(null)
        }
    }

    const deleteReview = async (id) => {
        if (!window.confirm('Permanently delete this review?')) return
        setActionLoading(id + 'delete')
        try {
            const { error } = await supabase.from('reviews').delete().eq('id', id)
            if (error) throw error
            setReviews(prev => prev.filter(r => r.id !== id))
        } catch (err) {
            console.error('Delete error:', err)
        } finally {
            setActionLoading(null)
        }
    }

    return (
        <div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { key: 'pending',  label: 'Pending',  icon: Clock,       color: 'text-yellow-400' },
                    { key: 'approved', label: 'Approved', icon: CheckCircle, color: 'text-green-400'  },
                    { key: 'all',      label: 'Total',    icon: Star,        color: 'text-brand-orange' },
                ].map(({ key, label, icon: Icon, color }) => (
                    <button key={key} onClick={() => setFilter(key)}
                        className={`bg-gray-900 border rounded-2xl p-5 text-left transition-all ${filter === key ? 'border-brand-orange' : 'border-gray-800 hover:border-gray-600'}`}>
                        <Icon size={20} className={`${color} mb-2`} />
                        <p className="text-2xl font-extrabold">
                            {key === 'pending'  ? reviews.filter(r => r.status === 'pending').length :
                             key === 'approved' ? reviews.filter(r => r.status === 'approved').length :
                             reviews.length}
                        </p>
                        <p className="text-gray-500 text-sm">{label}</p>
                    </button>
                ))}
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-6">
                {['pending', 'approved', 'all'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors capitalize ${filter === f ? 'bg-brand-orange text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                        {f}
                    </button>
                ))}
                <button onClick={fetchReviews} className="ml-auto p-2 rounded-xl hover:bg-gray-800 transition-colors text-gray-400 hover:text-white" title="Refresh">
                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-16"><RefreshCw size={32} className="animate-spin text-gray-600" /></div>
            ) : reviews.length === 0 ? (
                <div className="text-center py-20 text-gray-600">
                    <Star size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-semibold">No {filter === 'all' ? '' : filter} reviews</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence>
                        {reviews.map(review => (
                            <motion.div key={review.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row gap-5"
                            >
                                <div className="flex-grow space-y-2">
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize ${STATUS_STYLES[review.status] || STATUS_STYLES.pending}`}>
                                            {review.status}
                                        </span>
                                        {review.service_id && (
                                            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                                                {SERVICE_LABELS[review.service_id] || review.service_id}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[1,2,3,4,5].map(s => (
                                            <Star key={s} size={15} className={review.rating >= s ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'} />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 italic text-sm leading-relaxed">"{review.comment}"</p>
                                    <div className="flex flex-wrap items-center gap-4 pt-1">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-brand-orange font-bold text-xs">
                                                {review.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-semibold text-sm">{review.name}</span>
                                        </div>
                                        <span className="text-gray-600 text-xs">
                                            {new Date(review.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    {review.screenshot_url && (
                                        <div className="mt-2 inline-flex items-center gap-2 text-xs text-brand-green cursor-pointer hover:underline"
                                            onClick={() => setLightbox(review.screenshot_url)}>
                                            <ImageIcon size={13} /> View Screenshot
                                        </div>
                                    )}
                                </div>
                                <div className="flex sm:flex-col gap-2 shrink-0 justify-start">
                                    {review.status !== 'approved' && (
                                        <button onClick={() => updateStatus(review.id, 'approved')} disabled={!!actionLoading}
                                            className="flex items-center gap-1.5 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl text-sm font-semibold hover:bg-green-500/20 transition-colors disabled:opacity-50 whitespace-nowrap">
                                            {actionLoading === review.id + 'approved' ? <RefreshCw size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                                            Approve
                                        </button>
                                    )}
                                    {review.status === 'approved' && (
                                        <button onClick={() => updateStatus(review.id, 'pending')} disabled={!!actionLoading}
                                            className="flex items-center gap-1.5 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-xl text-sm font-semibold hover:bg-yellow-500/20 transition-colors disabled:opacity-50 whitespace-nowrap">
                                            {actionLoading === review.id + 'pending' ? <RefreshCw size={14} className="animate-spin" /> : <Clock size={14} />}
                                            Unpublish
                                        </button>
                                    )}
                                    <button onClick={() => deleteReview(review.id)} disabled={!!actionLoading}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition-colors disabled:opacity-50">
                                        {actionLoading === review.id + 'delete' ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            <AnimatePresence>
                {lightbox && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                        <motion.img initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
                            src={lightbox} alt="Customer screenshot"
                            className="max-w-3xl w-full max-h-[85vh] object-contain rounded-2xl"
                            onClick={e => e.stopPropagation()} />
                        <button onClick={() => setLightbox(null)}
                            className="absolute top-4 right-4 bg-white/10 text-white rounded-full p-2 hover:bg-white/20">
                            <XCircle size={24} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────

const TABS = [
    { key: 'reviews',  label: 'Reviews',  icon: MessageSquare },
    { key: 'services', label: 'Services', icon: Briefcase },
    { key: 'ourwork',  label: 'Our Work', icon: Grid },
]

export default function AdminPanel() {
    const [authed, setAuthed]     = useState(false)
    const [password, setPassword] = useState('')
    const [showPw, setShowPw]     = useState(false)
    const [pwError, setPwError]   = useState('')
    const [activeTab, setActiveTab] = useState('reviews')

    const handleLogin = (e) => {
        e.preventDefault()
        const adminPw = import.meta.env.VITE_ADMIN_PASSWORD || 'pixelshade@admin2024'
        if (password === adminPw) { setAuthed(true); setPwError('') }
        else setPwError('Incorrect password. Try again.')
    }

    if (!authed) {
        return (
            <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 border border-gray-800 rounded-3xl p-10 w-full max-w-md"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-brand-orange/10 rounded-xl">
                            <ShieldCheck size={28} className="text-brand-orange" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-white">Admin Panel</h1>
                            <p className="text-gray-500 text-sm">PixelShade Website Management</p>
                        </div>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPw ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white pr-12 focus:outline-none focus:border-brand-orange transition-colors"
                                    placeholder="Enter admin password"
                                    autoFocus
                                />
                                <button type="button" onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {pwError && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                    <XCircle size={14} /> {pwError}
                                </p>
                            )}
                        </div>
                        <button type="submit"
                            className="w-full bg-brand-orange text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                            <Lock size={16} /> Login
                        </button>
                    </form>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-bg-dark text-white">
            {/* Top bar */}
            <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ShieldCheck size={24} className="text-brand-orange" />
                    <h1 className="text-xl font-extrabold">Admin Panel</h1>
                    <span className="text-gray-600 text-sm hidden sm:block">— PixelShade Management</span>
                </div>
                <button
                    onClick={() => setAuthed(false)}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-xl hover:bg-gray-800"
                >
                    <LogOut size={15} /> Logout
                </button>
            </div>

            {/* Tab nav */}
            <div className="border-b border-gray-800 px-6">
                <div className="flex gap-1 -mb-px max-w-6xl mx-auto">
                    {TABS.map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-all ${
                                activeTab === key
                                    ? 'border-brand-orange text-white'
                                    : 'border-transparent text-gray-500 hover:text-gray-300'
                            }`}
                        >
                            <Icon size={16} />
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'reviews'  && <ReviewsTab />}
                        {activeTab === 'services' && <ServicesTab />}
                        {activeTab === 'ourwork'  && <OurWorkTab />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
