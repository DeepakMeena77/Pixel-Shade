import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabase";
import emailjs from "@emailjs/browser";
import { Star, Send, CheckCircle } from "lucide-react";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({ name: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      // 1. Save to Supabase as "pending"
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            name: formData.name,
            rating: formData.rating,
            comment: formData.comment,
            status: 'pending'
          }
        ])
        .select();

      if (error) throw error;

      const newReviewId = data[0].id;

      // 2. Send email via EmailJS for approval
      // The approval link will point to the site's /approve route
      const approvalLink = `${window.location.origin}/approve?id=${newReviewId}`;
      
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: "pixelshade.co@gmail.com",
          reviewer_name: formData.name,
          reviewer_rating: formData.rating,
          reviewer_comment: formData.comment,
          approval_link: approvalLink,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSuccessMsg("Thank you! Your review has been submitted and is pending approval.");
      setFormData({ name: "", rating: 5, comment: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrorMsg("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-dark text-white" id="reviews">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Left: Leave a review form */}
          <div className="w-full md:w-1/3 bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6 font-display">Leave a Review</h3>
            
            {successMsg ? (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-start gap-3">
                <CheckCircle className="shrink-0 mt-0.5" size={20} />
                <p>{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                         <Star
                          size={28}
                          className={formData.rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Comment</label>
                  <textarea
                    required
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors min-h-[120px]"
                    placeholder="Tell us about your experience..."
                  ></textarea>
                </div>
                
                {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-green text-dark font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-green-400 transition-colors disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : (
                    <>Submit Review <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Display Reviews */}
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 font-display"><span className="text-brand-green italic">Client Reviews</span></h2>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-green"></div>
              </div>
            ) : reviews.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-brand-green/30 transition-colors">
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={review.rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-700"}
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic">"{review.comment}"</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-brand-green font-bold text-xl">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <h4 className="font-bold">{review.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-12 text-center">
                <Star size={48} className="text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No reviews yet</h3>
                <p className="text-gray-400">Be the first to leave a review!</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}
