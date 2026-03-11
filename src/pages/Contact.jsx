import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import { CheckCircle2, Send, Mail, MapPin, Phone } from 'lucide-react'

const Contact = () => {
    const { contactFormSubmitted, setContactFormSubmitted } = useStore()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        project: ''
    })

    // We are using FormSubmit.co for free backend-less form submission
    // so the handleSubmit is mainly for state/UI updates.
    const formActionUrl = "https://formsubmit.co/pixelshade.co@gmail.com"

    // The handleSubmit function is now primarily for UI updates after the form is submitted
    // via the 'action' attribute. For FormSubmit.co, the form will redirect or handle submission
    // directly. If you want to show the success message without a redirect, you'd need to
    // use an AJAX submission (e.g., fetch API) instead of a direct form action.
    // For this example, we'll keep the direct form action and assume the success state
    // might be handled by a redirect or a separate mechanism if needed.
    // For now, we'll remove the handleSubmit as the form will submit directly.
    // If you want to use the `contactFormSubmitted` state, you would need to
    // implement an AJAX submission or a redirect back to a specific URL that
    // then sets this state.

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="bg-bg-light min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-block py-1 px-4 mb-6 text-sm font-bold tracking-widest text-brand-orange border-2 border-brand-orange uppercase rounded-full">
                            Let's Talk
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-text-dark mb-6 leading-none">
                            Initiate Your <br />
                            Project.
                        </h1>
                        <p className="text-xl text-gray-600 mb-12 max-w-lg">
                            Ready to upgrade your visual identity? Drop us a line with your project details and we will get back to you within 24 hours.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-orange-100 text-brand-orange rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Email Us</h4>
                                    <p className="text-gray-600">pixelshade.co@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 text-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Studio Location</h4>
                                    <p className="text-gray-600">Kakinada, Andhra Pradesh</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-orange-100 text-brand-orange rounded-full flex items-center justify-center flex-shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Call Us</h4>
                                    <p className="text-gray-600">+91 9296604555</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 md:p-12 rounded-[2rem] border-2 border-text-dark"
                    >
                        {contactFormSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center h-full text-center py-12"
                            >
                                <div className="w-20 h-20 bg-green-100 text-brand-green rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Transmission Received</h3>
                                <p className="text-gray-600 mb-8 max-w-sm">
                                    Your project details have been sent to our desk. We'll be in touch shortly to schedule a sync.
                                </p>
                                <button
                                    onClick={() => setContactFormSubmitted(false)}
                                    className="text-brand-orange font-bold hover:underline"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form action={formActionUrl} method="POST" className="space-y-6">
                                {/* FormSubmit Configuration */}
                                <input type="hidden" name="_subject" value="New Project Inquiry from Pixel Shade Portfolio" />
                                <input type="hidden" name="_captcha" value="false" />
                                {/* You can optionally add a redirect URL here after submission */}
                                {/* <input type="hidden" name="_next" value="http://yourwebsite.com/contact-success" /> */}

                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-text-dark mb-2 uppercase tracking-wide">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-bg-light border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-0 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-text-dark mb-2 uppercase tracking-wide">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-bg-light border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-0 transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-bold text-text-dark mb-2 uppercase tracking-wide">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-bg-light border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-0 transition-colors"
                                        placeholder="+91 90000 00000"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="project" className="block text-sm font-bold text-text-dark mb-2 uppercase tracking-wide">Project Details</label>
                                    <textarea
                                        id="project"
                                        name="project"
                                        required
                                        rows="4"
                                        value={formData.project}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-bg-light border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-0 transition-colors resize-none"
                                        placeholder="Tell us about what you want to build..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-5 bg-text-dark text-white font-bold text-lg rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 uppercase tracking-wider"
                                >
                                    Launch Project <Send size={20} />
                                </button>
                            </form>
                        )}

                    </motion.div>

                </div>

            </div>
        </div>
    )
}

export default Contact
