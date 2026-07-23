import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Paintbrush, MessageSquare, Diamond, Layers, Star, Send, CheckCircle, ChevronDown, Image as ImageIcon, X, ZoomIn } from 'lucide-react'
import { supabase } from '../config/supabase'
import emailjs from '@emailjs/browser'

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
    const [openReviews, setOpenReviews] = useState(null)

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
                    <span className="font-bold text-brand-orange text-lg">💰 Custom Wedding Cards: Starts from ₹600</span><br />
                    <span className="font-bold text-brand-orange text-lg">🎬 Video Invitations: Starts from ₹700</span>
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
                    <span className="font-bold text-brand-orange text-xl">💰 Starts from ₹4,999 / Month</span>
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
                    <span className="font-bold text-brand-orange text-xl">💰 Logos: Starts from ₹500</span>
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
                    <span className="font-bold text-brand-orange text-lg">💰 Flyers & Brochures: Starts from ₹350</span><br />
                    <span className="font-bold text-brand-orange text-lg">💳 Business/Visiting Cards: Starts from ₹500</span><br />
                    <span className="font-bold text-brand-orange text-lg">✨ Canva Pro (1 Year) - Starts from ₹199</span>
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

    const toggleReviews = (id) => {
        setOpenReviews(prev => prev === id ? null : id)
    }

    return (
        <div className="bg-bg-light min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Header ── */}
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

                {/* ── Service Cards ── */}
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
                            {/* Icon */}
                            <div className="mb-6 bg-gray-100 p-4 rounded-full border-2 border-gray-200">
                                {service.icon}
                            </div>

                            {/* Title & Description */}
                            <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed text-lg flex-grow">
                                {service.description}
                            </p>

                            {/* Features */}
                            <div className="w-full pt-6 border-t border-gray-200">
                                <ul className="space-y-2">
                                    {service.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-center gap-2 font-medium text-text-dark">
                                            <span className="w-2 h-2 rounded-full bg-brand-green" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* ── Toggle Reviews Button ── */}
                            <button
                                onClick={() => toggleReviews(service.id)}
                                className="mt-8 w-full flex items-center justify-between px-5 py-3.5 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-colors group"
                            >
                                <span className="font-semibold text-text-dark flex items-center gap-2 text-sm">
                                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                    Customer Reviews & Feedback
                                </span>
                                <ChevronDown
                                    size={18}
                                    className={`text-gray-500 transition-transform duration-300 ${openReviews === service.id ? 'rotate-180' : ''}`}
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
                                        className="overflow-hidden w-full"
                                    >
                                        <ServiceReviewPanel
                                            serviceId={service.id}
                                            serviceTitle={service.title}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* ── CTA ── */}
                <div className="mt-24 text-center">
                    <a
                        href="/contact"
                        className="inline-block px-10 py-5 bg-text-dark text-white font-bold text-lg rounded-full hover:bg-gray-800 transition-colors uppercase tracking-wider"
                    >
                        Let's Build Something
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Services
