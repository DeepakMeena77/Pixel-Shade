import React, { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CheckCircle, XCircle, Clock, Star, Image as ImageIcon,
    Lock, Eye, EyeOff, RefreshCw, Trash2, ShieldCheck, LogOut
} from 'lucide-react'

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

export default function AdminPanel() {
    const [authed, setAuthed]       = useState(false)
    const [password, setPassword]   = useState('')
    const [showPw, setShowPw]       = useState(false)
    const [pwError, setPwError]     = useState('')

    const [reviews, setReviews]     = useState([])
    const [loading, setLoading]     = useState(false)
    const [filter, setFilter]       = useState('pending')   // pending | approved | all
    const [actionLoading, setActionLoading] = useState(null)
    const [lightbox, setLightbox]   = useState(null)

    // ── Auth ──────────────────────────────────────────────────────────────────
    const handleLogin = (e) => {
        e.preventDefault()
        const adminPw = import.meta.env.VITE_ADMIN_PASSWORD || 'pixelshade@admin2024'
        if (password === adminPw) {
            setAuthed(true)
            setPwError('')
        } else {
            setPwError('Incorrect password. Try again.')
        }
    }

    // ── Fetch reviews ─────────────────────────────────────────────────────────
    const fetchReviews = async () => {
        setLoading(true)
        try {
            let query = supabase
                .from('reviews')
                .select('*')
                .order('created_at', { ascending: false })

            if (filter !== 'all') {
                query = query.eq('status', filter)
            }

            const { data, error } = await query
            if (error) throw error
            setReviews(data || [])
        } catch (err) {
            console.error('Fetch error:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (authed) fetchReviews()
    }, [authed, filter])

    // ── Approve / Reject / Delete ─────────────────────────────────────────────
    const updateStatus = async (id, newStatus) => {
        setActionLoading(id + newStatus)
        try {
            const { error } = await supabase
                .from('reviews')
                .update({ status: newStatus })
                .eq('id', id)
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

    const counts = {
        pending:  reviews.filter(r => r.status === 'pending').length,
        approved: reviews.filter(r => r.status === 'approved').length,
        all:      reviews.length,
    }

    // ── Login screen ──────────────────────────────────────────────────────────
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
                            <p className="text-gray-500 text-sm">PixelShade Review Management</p>
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
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                >
                                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {pwError && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                    <XCircle size={14} /> {pwError}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-brand-orange text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <Lock size={16} /> Login
                        </button>
                    </form>
                </motion.div>
            </div>
        )
    }

    // ── Admin dashboard ───────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-bg-dark text-white">
            {/* Header */}
            <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ShieldCheck size={24} className="text-brand-orange" />
                    <h1 className="text-xl font-extrabold">Admin Panel</h1>
                    <span className="text-gray-500 text-sm hidden sm:block">— Review Management</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchReviews}
                        className="p-2 rounded-xl hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                        title="Refresh"
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button
                        onClick={() => setAuthed(false)}
                        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-xl hover:bg-gray-800"
                    >
                        <LogOut size={15} /> Logout
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        { key: 'pending',  label: 'Pending',  icon: Clock,       color: 'text-yellow-400' },
                        { key: 'approved', label: 'Approved', icon: CheckCircle, color: 'text-green-400'  },
                        { key: 'all',      label: 'Total',    icon: Star,        color: 'text-brand-orange' },
                    ].map(({ key, label, icon: Icon, color }) => (
                        <button
                            key={key}
                            onClick={() => setFilter(key)}
                            className={`bg-gray-900 border rounded-2xl p-5 text-left transition-all ${
                                filter === key ? 'border-brand-orange' : 'border-gray-800 hover:border-gray-600'
                            }`}
                        >
                            <Icon size={20} className={`${color} mb-2`} />
                            <p className="text-2xl font-extrabold">{
                                filter === key ? counts[key] : (() => {
                                    if (key === 'pending')  return reviews.filter(r => r.status === 'pending').length
                                    if (key === 'approved') return reviews.filter(r => r.status === 'approved').length
                                    return reviews.length
                                })()
                            }</p>
                            <p className="text-gray-500 text-sm">{label}</p>
                        </button>
                    ))}
                </div>

                {/* Filter tabs */}
                <div className="flex gap-2 mb-6">
                    {['pending', 'approved', 'all'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors capitalize ${
                                filter === f
                                    ? 'bg-brand-orange text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Reviews list */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <RefreshCw size={32} className="animate-spin text-gray-600" />
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-20 text-gray-600">
                        <Star size={48} className="mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-semibold">No {filter === 'all' ? '' : filter} reviews</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {reviews.map(review => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row gap-5"
                                >
                                    {/* Left: review details */}
                                    <div className="flex-grow space-y-2">
                                        {/* Status + service badge */}
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

                                        {/* Stars */}
                                        <div className="flex gap-0.5">
                                            {[1,2,3,4,5].map(s => (
                                                <Star key={s} size={15}
                                                    className={review.rating >= s ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}
                                                />
                                            ))}
                                        </div>

                                        {/* Comment */}
                                        <p className="text-gray-300 italic text-sm leading-relaxed">
                                            "{review.comment}"
                                        </p>

                                        {/* Meta */}
                                        <div className="flex flex-wrap items-center gap-4 pt-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-brand-orange font-bold text-xs">
                                                    {review.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-semibold text-sm">{review.name}</span>
                                            </div>
                                            <span className="text-gray-600 text-xs">
                                                {new Date(review.created_at).toLocaleDateString('en-IN', {
                                                    day: 'numeric', month: 'short', year: 'numeric',
                                                    hour: '2-digit', minute: '2-digit'
                                                })}
                                            </span>
                                        </div>

                                        {/* Screenshot thumbnail */}
                                        {review.screenshot_url && (
                                            <div
                                                className="mt-2 inline-flex items-center gap-2 text-xs text-brand-green cursor-pointer hover:underline"
                                                onClick={() => setLightbox(review.screenshot_url)}
                                            >
                                                <ImageIcon size={13} /> View Screenshot
                                            </div>
                                        )}
                                    </div>

                                    {/* Right: action buttons */}
                                    <div className="flex sm:flex-col gap-2 shrink-0 justify-start">
                                        {review.status !== 'approved' && (
                                            <button
                                                onClick={() => updateStatus(review.id, 'approved')}
                                                disabled={!!actionLoading}
                                                className="flex items-center gap-1.5 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl text-sm font-semibold hover:bg-green-500/20 transition-colors disabled:opacity-50 whitespace-nowrap"
                                            >
                                                {actionLoading === review.id + 'approved'
                                                    ? <RefreshCw size={14} className="animate-spin" />
                                                    : <CheckCircle size={14} />
                                                }
                                                Approve
                                            </button>
                                        )}
                                        {review.status === 'approved' && (
                                            <button
                                                onClick={() => updateStatus(review.id, 'pending')}
                                                disabled={!!actionLoading}
                                                className="flex items-center gap-1.5 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-xl text-sm font-semibold hover:bg-yellow-500/20 transition-colors disabled:opacity-50 whitespace-nowrap"
                                            >
                                                {actionLoading === review.id + 'pending'
                                                    ? <RefreshCw size={14} className="animate-spin" />
                                                    : <Clock size={14} />
                                                }
                                                Unpublish
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteReview(review.id)}
                                            disabled={!!actionLoading}
                                            className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition-colors disabled:opacity-50"
                                        >
                                            {actionLoading === review.id + 'delete'
                                                ? <RefreshCw size={14} className="animate-spin" />
                                                : <Trash2 size={14} />
                                            }
                                            Delete
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    >
                        <motion.img
                            initial={{ scale: 0.85 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.85 }}
                            src={lightbox}
                            alt="Customer screenshot"
                            className="max-w-3xl w-full max-h-[85vh] object-contain rounded-2xl"
                            onClick={e => e.stopPropagation()}
                        />
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute top-4 right-4 bg-white/10 text-white rounded-full p-2 hover:bg-white/20"
                        >
                            <XCircle size={24} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
