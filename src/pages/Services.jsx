import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Paintbrush, Layers, Star, Send, CheckCircle, ChevronDown, Image as ImageIcon, X, ZoomIn, TrendingUp, Target, Users, BarChart2, Video, FileText, Headphones, Calendar, Search, Gift, Clock, Zap, Award, ArrowRight, RefreshCw } from 'lucide-react'
import { supabase } from '../config/supabase'
import emailjs from '@emailjs/browser'
import { useSEO } from '../hooks/useSEO'

// ─── Service Reviews Panel ────────────────────────────────────────────────────

function ServiceReviewPanel({ serviceId, serviceTitle }) {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' })
    const [screenshotFile, setScreenshotFile] = useState(null)
    const [screenshotPreview, setScreenshotPreview] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [lightboxImg, setLightboxImg] = useState(null)
    const fileInputRef = useRef(null)

    // ── Fetch approved reviews for this service ──
    const fetchReviews = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('status', 'approved')
                .eq('service_id', serviceId)
                .order('created_at', { ascending: false })
            if (error) throw error
            setReviews(data || [])
        } catch (err) {
            console.error('Error fetching reviews:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [serviceId])

    // ── Screenshot handler ──
    const handleScreenshotChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        if (!file.type.startsWith('image/')) {
            setErrorMsg('Please upload a valid image file (JPG, PNG, WEBP).')
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            setErrorMsg('Image size must be under 5MB.')
            return
        }
        setErrorMsg('')
        setScreenshotFile(file)
        setScreenshotPreview(URL.createObjectURL(file))
    }

    const removeScreenshot = () => {
        setScreenshotFile(null)
        setScreenshotPreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    // ── Submit handler ──
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setSuccessMsg('')
        setErrorMsg('')

        try {
            let screenshotUrl = null

            // 1. Try to upload screenshot — fail silently if bucket doesn't exist yet
            if (screenshotFile) {
                try {
                    const fileExt = screenshotFile.name.split('.').pop()
                    const fileName = `${serviceId}_${Date.now()}.${fileExt}`
                    const { error: uploadError } = await supabase.storage
                        .from('review-screenshots')
                        .upload(fileName, screenshotFile, { upsert: false })

                    if (!uploadError) {
                        const { data: urlData } = supabase.storage
                            .from('review-screenshots')
                            .getPublicUrl(fileName)
                        screenshotUrl = urlData.publicUrl
                    } else {
                        console.warn('Screenshot upload skipped (bucket may not exist yet):', uploadError.message)
                    }
                } catch (uploadErr) {
                    console.warn('Screenshot upload failed, continuing without it:', uploadErr)
                }
            }

            // 2a. Try inserting with all columns (including service_id & screenshot_url)
            let insertedId = null
            const { data, error } = await supabase
                .from('reviews')
                .insert([{
                    name: formData.name,
                    rating: formData.rating,
                    comment: formData.comment,
                    status: 'pending',
                    service_id: serviceId,
                    screenshot_url: screenshotUrl
                }])
                .select()

            if (error) {
                // Fallback: columns might not exist yet — insert with only the original columns
                const { data: fallbackData, error: fallbackError } = await supabase
                    .from('reviews')
                    .insert([{
                        name: formData.name,
                        rating: formData.rating,
                        comment: formData.comment,
                        status: 'pending'
                    }])
                    .select()

                if (fallbackError) throw fallbackError
                insertedId = fallbackData[0].id
            } else {
                insertedId = data[0].id
            }

            // 3. Send admin email via EmailJS — fail silently (review is already saved in DB)
            try {
                const approvalLink = `${window.location.origin}/approve?id=${insertedId}`
                const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

                if (publicKey) {
                    await emailjs.send(
                        import.meta.env.VITE_EMAILJS_SERVICE_ID,
                        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                        {
                            to_email: 'pixelshade.co@gmail.com',
                            reviewer_name: formData.name,
                            reviewer_rating: formData.rating,
                            reviewer_comment: formData.comment,
                            approval_link: approvalLink,
                        },
                        { publicKey }
                    )
                }
            } catch (emailErr) {
                console.warn('EmailJS notification failed (review still saved):', emailErr)
            }

            setSuccessMsg('Thank you! Your review has been submitted and is pending approval.')
            setFormData({ name: '', rating: 5, comment: '' })
            removeScreenshot()
            setShowForm(false)
        } catch (err) {
            console.error('Error submitting review:', err)
            setErrorMsg('Something went wrong. Please try again later.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="mt-8 pt-6 border-t-2 border-gray-100">

            {/* ── Section header ── */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-text-dark flex items-center gap-2">
                    <Star size={18} className="text-yellow-500 fill-yellow-500" />
                    Customer Feedback
                    {reviews.length > 0 && (
                        <span className="text-sm font-normal text-gray-500">({reviews.length})</span>
                    )}
                </h3>
                <button
                    onClick={() => { setShowForm(!showForm); setSuccessMsg(''); setErrorMsg('') }}
                    className="text-sm font-semibold px-4 py-2 rounded-full border-2 border-text-dark text-text-dark hover:bg-text-dark hover:text-white transition-colors flex items-center gap-1"
                >
                    {showForm ? <><X size={14} /> Cancel</> : '+ Leave a Review'}
                </button>
            </div>

            {/* ── Success message after submit ── */}
            <AnimatePresence>
                {successMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-4 bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl flex items-start gap-3 text-sm"
                    >
                        <CheckCircle size={18} className="shrink-0 mt-0.5" />
                        <p>{successMsg}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Review submission form ── */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-6"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-4"
                        >
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                Reviewing: {serviceTitle}
                            </p>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-text-dark focus:outline-none focus:border-brand-orange transition-colors text-sm"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star
                                                size={26}
                                                className={formData.rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Comment */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Experience</label>
                                <textarea
                                    required
                                    value={formData.comment}
                                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-text-dark focus:outline-none focus:border-brand-orange transition-colors text-sm min-h-[100px] resize-none"
                                    placeholder="Tell others about your experience with this service..."
                                />
                            </div>

                            {/* Screenshot Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Screenshot / Work Sample <span className="text-gray-400 font-normal">(optional)</span>
                                </label>
                                {screenshotPreview ? (
                                    <div className="relative inline-block">
                                        <img
                                            src={screenshotPreview}
                                            alt="Preview"
                                            className="w-full max-w-xs h-32 object-cover rounded-xl border border-gray-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeScreenshot}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-brand-orange transition-colors group"
                                    >
                                        <ImageIcon size={28} className="mx-auto mb-2 text-gray-400 group-hover:text-brand-orange transition-colors" />
                                        <p className="text-sm text-gray-500 group-hover:text-brand-orange transition-colors">
                                            Click to upload a screenshot of the work we did for you
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP · Max 5MB</p>
                                    </div>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleScreenshotChange}
                                />
                            </div>

                            {errorMsg && (
                                <p className="text-red-500 text-sm">{errorMsg}</p>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-text-dark text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm"
                            >
                                {submitting ? 'Submitting...' : <><Send size={16} /> Submit Review</>}
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Approved reviews display ── */}
            {loading ? (
                <div className="flex justify-center py-6">
                    <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-brand-orange" />
                </div>
            ) : reviews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-brand-orange/40 transition-colors flex flex-col gap-3"
                        >
                            {/* Stars */}
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={14}
                                        className={review.rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-gray-600 text-sm italic leading-relaxed flex-grow">
                                "{review.comment}"
                            </p>

                            {/* Screenshot thumbnail */}
                            {review.screenshot_url && (
                                <div
                                    className="relative group cursor-pointer rounded-xl overflow-hidden border border-gray-200"
                                    onClick={() => setLightboxImg(review.screenshot_url)}
                                >
                                    <img
                                        src={review.screenshot_url}
                                        alt="Customer screenshot"
                                        className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <ZoomIn size={22} className="text-white" />
                                    </div>
                                </div>
                            )}

                            {/* Reviewer name */}
                            <div className="flex items-center gap-2.5 mt-auto pt-2 border-t border-gray-100">
                                <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-brand-orange font-bold text-sm">
                                    {review.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-semibold text-sm text-text-dark">{review.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-8 text-center">
                    <Star size={36} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">No reviews yet for this service.</p>
                    <p className="text-xs text-gray-400 mt-1">Be the first to share your experience!</p>
                </div>
            )}

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {lightboxImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                        onClick={() => setLightboxImg(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.85 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.85 }}
                            className="relative max-w-3xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={lightboxImg}
                                alt="Full size screenshot"
                                className="w-full max-h-[80vh] object-contain rounded-2xl"
                            />
                            <button
                                onClick={() => setLightboxImg(null)}
                                className="absolute -top-4 -right-4 bg-white text-text-dark rounded-full p-1.5 hover:bg-gray-100 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── Services Page ────────────────────────────────────────────────────────────

const Services = () => {
    useSEO({
        title: 'Services | Pixel Shade – Branding, SMM & Ad Campaigns',
        description: 'Explore Pixel Shade\'s full suite of creative services: futuristic branding, social media marketing, and high-converting ad campaigns tailored for your business.',
        path: '/services',
    })

    const [openReviews, setOpenReviews] = useState(null)
    const [servicesList, setServicesList] = useState([])
    const [loadingServices, setLoadingServices] = useState(true)

    useEffect(() => {
        const fetchServices = async () => {
            setLoadingServices(true)
            try {
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .order('sort_order', { ascending: true })
                if (error) throw error
                setServicesList(data || [])
            } catch (err) {
                console.error('Failed to load services:', err)
            } finally {
                setLoadingServices(false)
            }
        }
        fetchServices()
    }, [])

    const toggleReviews = (id) => {
        setOpenReviews(prev => prev === id ? null : id)
    }

    return (
        <>
        <div className="bg-bg-light pt-20 md:pt-24 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Header ── */}
                <div className="text-center mb-12 md:mb-20 max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-dark mb-6"
                    >
                        Our <span className="text-brand-orange">Arsenal</span>
                    </motion.h1>
                    <p className="text-base md:text-xl text-gray-600">
                        We don't just create graphics; we build visual assets designed to dominate digital and physical spaces. Explore our core capabilities.
                    </p>
                </div>

                {/* ── Service Cards ── */}
                {loadingServices ? (
                    <div className="flex flex-col gap-8">
                        {[1, 2].map(n => (
                            <div key={n} className="bg-white rounded-2xl border border-gray-100 p-10 animate-pulse">
                                <div className="flex gap-8">
                                    <div className="w-64 flex-shrink-0 space-y-4">
                                        <div className="w-14 h-14 bg-gray-200 rounded-xl" />
                                        <div className="h-6 bg-gray-200 rounded-lg w-40" />
                                        <div className="h-4 bg-gray-100 rounded w-32" />
                                        <div className="h-8 bg-gray-200 rounded-full w-36" />
                                    </div>
                                    <div className="flex-grow space-y-3">
                                        <div className="h-4 bg-gray-100 rounded w-full" />
                                        <div className="h-4 bg-gray-100 rounded w-4/5" />
                                        <div className="h-4 bg-gray-100 rounded w-3/5" />
                                        <div className="grid grid-cols-2 gap-2 mt-4">
                                            {[1,2,3,4].map(i => <div key={i} className="h-8 bg-gray-100 rounded-lg" />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : servicesList.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
                        <RefreshCw size={36} className="mx-auto mb-3 text-gray-300" />
                        <p className="text-gray-500 font-semibold">No services added yet</p>
                        <p className="text-gray-400 text-sm mt-1">Add services from the Admin Panel to display them here</p>
                    </div>
                ) : (
                <div className="flex flex-col gap-8">
                    {servicesList.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                            style={{ borderLeft: '4px solid', borderLeftColor: service.icon_color === 'green' ? 'var(--brand-green, #22c55e)' : 'var(--brand-orange, #f97316)' }}
                        >
                            <div className="p-5 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8">

                                {/* Left: Icon + Title */}
                                <div className="flex-shrink-0 flex flex-col items-start gap-3 md:gap-4 w-full md:w-64">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                                            {service.icon_color === 'green'
                                                ? <Paintbrush size={28} className="text-brand-green" />
                                                : <Layers size={28} className="text-brand-orange" />
                                            }
                                        </div>
                                        {service.badge && (
                                            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-orange-50 border border-orange-100 px-3 py-1 rounded-full">
                                                {service.badge}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-extrabold text-text-dark leading-tight">{service.title}</h2>
                                        <p className="text-sm text-gray-400 mt-1 italic">{service.tagline}</p>
                                    </div>
                                    {/* Pricing pill */}
                                    {service.pricing && (
                                        <div className="mt-auto pt-2">
                                            <span className="inline-block bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-full">
                                                {service.pricing}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Divider */}
                                <div className="hidden md:block w-px bg-gray-100 self-stretch" />

                                {/* Right: Description + Features + Reviews */}
                                <div className="flex-grow flex flex-col gap-5">
                                    {service.description && (
                                        <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
                                            {service.description}
                                        </p>
                                    )}

                                    {/* Features */}
                                    {Array.isArray(service.features) && service.features.length > 0 && (
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {service.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-center gap-2 text-sm font-medium text-text-dark bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                                                    <CheckCircle size={14} className="text-brand-green flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* ── Toggle Reviews Button ── */}
                                    <button
                                        onClick={() => toggleReviews(service.id)}
                                        className="mt-2 flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors"
                                    >
                                        <span className="font-semibold text-text-dark flex items-center gap-2 text-sm">
                                            <Star size={15} className="text-yellow-500 fill-yellow-500" />
                                            Customer Reviews & Feedback
                                        </span>
                                        <ChevronDown
                                            size={16}
                                            className={`text-gray-400 transition-transform duration-300 ${openReviews === service.id ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {/* ── Collapsible Review Panel ── */}
                                    <AnimatePresence>
                                        {openReviews === service.id && (
                                            <motion.div
                                                key="panel"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.35, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <ServiceReviewPanel
                                                    serviceId={service.id}
                                                    serviceTitle={service.title}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                )}

            </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
             LEAD MACHINE — Special Growth Packages Section
        ════════════════════════════════════════════════════════════ */}
        <div className="bg-gray-950 py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Section Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-6"
                >
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-4 py-1.5 rounded-full mb-5">
                        🚀 Special Growth Program
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                        Turn Your Business Into a{' '}
                        <span className="text-yellow-400">Lead Machine</span>
                        {' '}in <span className="text-yellow-400">30 Days</span>
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                        We Handle Your Ads + Content + Growth —{' '}
                        <span className="text-white font-semibold">You Get Leads & Sales</span>
                    </p>
                </motion.div>

                {/* ── Campaign Performance Stats ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16"
                >
                    {[
                        { label: 'Leads Generated', value: '528', delta: '↑ 162%', up: true },
                        { label: 'Cost Per Lead', value: '₹28.40', delta: '↓ 21%', up: true },
                        { label: 'Amount Spent', value: '₹14,250', delta: 'Optimised', up: true },
                        { label: 'ROAS', value: '5.8X', delta: '↑ 95%', up: true },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                            <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                            <span className="inline-block mt-1 text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                                {stat.delta}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* ── Scarcity Banner ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-3 mb-12"
                >
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold px-5 py-2.5 rounded-full">
                        <Clock size={14} className="animate-pulse" />
                        Limited Slots Available — Only <span className="text-red-300 font-extrabold mx-1">5 Clients</span> This Month!
                    </div>
                </motion.div>

                {/* ── Pricing Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {[
                        {
                            tag: 'Trial',
                            tagColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
                            accentColor: 'border-blue-500/40',
                            glowColor: 'hover:border-blue-500/70',
                            priceColor: 'text-blue-400',
                            price: '₹15,999',
                            billing: 'Trial package — First Month',
                            popular: false,
                            freePerks: ['Free Digital Business Card'],
                            includes: [
                                { icon: <Video size={15} />, text: '5 High-Converting Video Ads', sub: 'Engaging & result-driven' },
                                { icon: <FileText size={15} />, text: '5 Social Media Posters + 10 Videos', sub: 'Branded & creative' },
                                { icon: <Target size={15} />, text: 'Ad Campaign Management', sub: null },
                                { icon: <Calendar size={15} />, text: 'Content Preparation', sub: 'Planned & strategic content' },
                                { icon: <BarChart2 size={15} />, text: 'Weekly Performance Reports', sub: 'Insights & optimization' },
                                { icon: <Users size={15} />, text: 'Instagram Collaboration', sub: '3 collaborations (free)' },
                                { icon: <Headphones size={15} />, text: '24/7 Customer Support', sub: 'We\'re always here for you' },
                            ]
                        },
                        {
                            tag: 'Most Popular',
                            tagColor: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
                            accentColor: 'border-yellow-500/60',
                            glowColor: 'hover:border-yellow-400',
                            priceColor: 'text-yellow-400',
                            price: '₹21,999',
                            billing: 'First Month — 2 Installments',
                            popular: true,
                            freePerks: ['Free Digital Business Card', 'Free Promotion'],
                            includes: [
                                { icon: <Video size={15} />, text: '10 High-Converting Video Ads', sub: 'Engaging & result-driven' },
                                { icon: <FileText size={15} />, text: '10 Social Media Posters + 14 Videos', sub: 'Branded & creative' },
                                { icon: <Target size={15} />, text: 'Daily Ad Campaign Management', sub: '1 Campaign Running Always' },
                                { icon: <Calendar size={15} />, text: 'Monthly Content Calendar', sub: 'Planned & scheduled in advance' },
                                { icon: <BarChart2 size={15} />, text: 'Weekly Performance Reports', sub: 'Insights & optimization' },
                                { icon: <Search size={15} />, text: 'SEO (Basic)', sub: 'Get your brand to top of Google' },
                                { icon: <Headphones size={15} />, text: '24/7 Customer Support', sub: 'We\'re always here for you' },
                            ]
                        },
                        {
                            tag: 'Pro',
                            tagColor: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
                            accentColor: 'border-orange-500/40',
                            glowColor: 'hover:border-orange-500/70',
                            priceColor: 'text-orange-400',
                            price: '₹29,999',
                            billing: 'First Month — 2 Installments',
                            popular: false,
                            freePerks: ['Free Digital Business Card', 'Free Promotion'],
                            includes: [
                                { icon: <Video size={15} />, text: '15 High-Converting Video Ads', sub: 'Engaging & result-driven' },
                                { icon: <FileText size={15} />, text: '10 Social Media Posters + 20 Videos', sub: 'Branded & creative' },
                                { icon: <Target size={15} />, text: 'Daily Ad Campaign Management', sub: '1 Campaign Running Always' },
                                { icon: <Calendar size={15} />, text: 'Monthly Content Calendar', sub: 'Planned & scheduled in advance' },
                                { icon: <BarChart2 size={15} />, text: 'Weekly Performance Reports', sub: 'Insights & optimization' },
                                { icon: <Search size={15} />, text: 'Full SEO', sub: 'Get your brand to top of Google' },
                                { icon: <Headphones size={15} />, text: '24/7 Customer Support', sub: 'We\'re always here for you' },
                            ]
                        },
                    ].map((plan, idx) => (
                        <motion.div
                            key={plan.tag}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.12 }}
                            className={`relative flex flex-col rounded-2xl border-2 bg-white/5 backdrop-blur-sm transition-all duration-300 ${
                                plan.popular
                                    ? 'border-yellow-500/60 scale-[1.03] shadow-2xl shadow-yellow-500/10'
                                    : `${plan.accentColor} ${plan.glowColor}`
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                    <span className="bg-yellow-400 text-gray-900 text-xs font-extrabold uppercase tracking-widest px-5 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                                        ⭐ Most Popular
                                    </span>
                                </div>
                            )}
                            <div className="p-7 flex flex-col h-full">
                                {/* Tag + Price */}
                                <div className="mb-6">
                                    <span className={`inline-block text-xs font-bold uppercase tracking-widest border px-3 py-1 rounded-full mb-3 ${plan.tagColor}`}>
                                        {plan.tag}
                                    </span>
                                    <div className="flex items-end gap-1">
                                        <span className={`text-5xl font-extrabold ${plan.priceColor}`}>{plan.price}</span>
                                    </div>
                                    <p className="text-gray-500 text-xs mt-1.5">{plan.billing}</p>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-white/10 mb-5" />

                                {/* Includes */}
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">What's Included</p>
                                <ul className="flex flex-col gap-3 flex-grow">
                                    {plan.includes.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className={`mt-0.5 flex-shrink-0 ${plan.priceColor}`}>{item.icon}</span>
                                            <div>
                                                <p className="text-white text-sm font-medium">{item.text}</p>
                                                {item.sub && <p className="text-gray-500 text-xs">{item.sub}</p>}
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Free Perks */}
                                <div className="mt-5 pt-4 border-t border-white/10">
                                    {plan.freePerks.map((perk, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-green-400 font-semibold mb-1">
                                            <Gift size={12} />
                                            <span>Free {perk}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <a
                                    href="/contact"
                                    className={`mt-5 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                                        plan.popular
                                            ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-lg shadow-yellow-400/20'
                                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                                    }`}
                                >
                                    Get Started <ArrowRight size={14} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ── Why Businesses Choose Us ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h3 className="text-center text-2xl font-extrabold text-white mb-8">
                        Why Businesses <span className="text-yellow-400">Choose Us</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: <Target size={22} className="text-yellow-400" />, title: 'Get Consistent Leads', highlight: 'Daily', desc: 'Real qualified leads delivered to your business every single day.' },
                            { icon: <Zap size={22} className="text-yellow-400" />, title: 'Done-for-You Content', highlight: '+ Ads', desc: 'We create, manage, and publish everything — you focus on your business.' },
                            { icon: <Users size={22} className="text-yellow-400" />, title: 'Target the Right', highlight: 'Audience', desc: 'Precision audience targeting so every rupee reaches your ideal customer.' },
                            { icon: <TrendingUp size={22} className="text-yellow-400" />, title: 'Optimized for Maximum', highlight: 'ROI', desc: 'Data-driven campaigns continuously improved for best return on spend.' },
                        ].map((reason, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-400/30 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center mb-4">
                                    {reason.icon}
                                </div>
                                <h4 className="text-white font-bold text-base">
                                    {reason.title}{' '}
                                    <span className="text-yellow-400">{reason.highlight}</span>
                                </h4>
                                <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{reason.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Trust Pillars ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="border-t border-white/10 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                >
                    {[
                        { icon: <Award size={20} />, label: 'Proven Results' },
                        { icon: <BarChart2 size={20} />, label: 'Transparent Reporting' },
                        { icon: <Users size={20} />, label: 'Expert Team' },
                        { icon: <TrendingUp size={20} />, label: 'Scalable Growth' },
                    ].map((pillar) => (
                        <div key={pillar.label} className="flex flex-col items-center gap-2">
                            <div className="text-yellow-400">{pillar.icon}</div>
                            <p className="text-gray-400 text-sm font-medium">{pillar.label}</p>
                        </div>
                    ))}
                </motion.div>

            </div>
        </div>


        {/* ── CTA ── */}
        <div className="bg-bg-light py-16 text-center">
            <div className="max-w-7xl mx-auto px-4">
                <a
                    href="/contact"
                    className="inline-block px-10 py-5 bg-text-dark text-white font-bold text-lg rounded-full hover:bg-gray-800 transition-colors uppercase tracking-wider"
                >
                    Let's Build Something
                </a>
            </div>
        </div>
        </>
    )
}

export default Services
