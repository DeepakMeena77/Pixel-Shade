import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import { CheckCircle, XCircle, Star, Image as ImageIcon } from "lucide-react";

// Map service IDs to readable titles
const SERVICE_TITLES = {
    "invitations": "Custom Invitation Cards",
    "social-media": "Social Media Promo & Management",
    "logos": "Logo Designing",
    "graphic-design": "General Graphic Design",
}

export default function ApproveReview() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const navigate = useNavigate();

    const [status, setStatus] = useState("loading"); // loading, success, error, not-found
    const [message, setMessage] = useState("Approving review...");
    const [reviewData, setReviewData] = useState(null);

    useEffect(() => {
        if (!id) {
            setStatus("error");
            setMessage("No review ID provided.");
            return;
        }

        const approveReview = async () => {
            try {
                // Check if review exists
                const { data, error: fetchError } = await supabase
                    .from('reviews')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (fetchError || !data) {
                    setStatus("not-found");
                    setMessage("Review not found.");
                    return;
                }

                setReviewData(data);

                // Update the status to approved
                const { error: updateError } = await supabase
                    .from('reviews')
                    .update({ status: 'approved' })
                    .eq('id', id);

                if (updateError) throw updateError;

                setStatus("success");
                setMessage("Review successfully approved! It will now appear on the website.");
            } catch (error) {
                console.error("Error approving review:", error);
                setStatus("error");
                setMessage("Failed to approve review. Check console for details.");
            }
        };

        approveReview();
    }, [id]);

    return (
        <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl max-w-lg w-full text-center border-2 border-gray-100">

                {status === "loading" && (
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange mb-4" />
                        <h2 className="text-xl font-bold">Processing...</h2>
                        <p className="text-gray-500 mt-2">{message}</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-col items-center">
                        <CheckCircle size={64} className="mb-4 text-green-500" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Approved!</h2>
                        <p className="text-gray-600 mb-6">{message}</p>

                        {/* Review Summary Card */}
                        {reviewData && (
                            <div className="w-full text-left bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6 space-y-3">
                                {/* Service label */}
                                {reviewData.service_id && (
                                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">
                                        {SERVICE_TITLES[reviewData.service_id] || reviewData.service_id}
                                    </p>
                                )}

                                {/* Stars */}
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={16}
                                            className={reviewData.rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                        />
                                    ))}
                                </div>

                                {/* Comment */}
                                <p className="text-gray-700 text-sm italic">"{reviewData.comment}"</p>

                                {/* Screenshot */}
                                {reviewData.screenshot_url && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                                            <ImageIcon size={12} /> Customer Screenshot
                                        </p>
                                        <a href={reviewData.screenshot_url} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={reviewData.screenshot_url}
                                                alt="Customer screenshot"
                                                className="w-full h-32 object-cover rounded-xl border border-gray-200 hover:opacity-90 transition-opacity"
                                            />
                                        </a>
                                    </div>
                                )}

                                {/* Reviewer name */}
                                <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-brand-orange font-bold text-xs">
                                        {reviewData.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-800">{reviewData.name}</span>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => navigate("/")}
                            className="px-6 py-3 bg-brand-green text-dark font-bold rounded-xl hover:bg-green-400 transition-colors w-full"
                        >
                            Go to Homepage
                        </button>
                    </div>
                )}

                {(status === "error" || status === "not-found") && (
                    <div className="flex flex-col items-center text-red-500">
                        <XCircle size={64} className="mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <button
                            onClick={() => navigate("/")}
                            className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition-colors w-full"
                        >
                            Back to Home
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
