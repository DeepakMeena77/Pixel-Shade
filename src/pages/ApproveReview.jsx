import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import { CheckCircle, XCircle } from "lucide-react";

export default function ApproveReview() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  
  const [status, setStatus] = useState("loading"); // loading, success, error, not-found
  const [message, setMessage] = useState("Approving review...");

  useEffect(() => {
    if (!id) {
      setStatus("error");
      setMessage("No review ID provided.");
      return;
    }

    const approveReview = async () => {
      try {
        // Check if review exists
        const { data: reviewData, error: fetchError } = await supabase
          .from('reviews')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError || !reviewData) {
          setStatus("not-found");
          setMessage("Review not found.");
          return;
        }

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
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-2 border-gray-100">
        
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange mb-4"></div>
            <h2 className="text-xl font-bold">Processing...</h2>
            <p className="text-gray-500 mt-2">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center text-green-500">
            <CheckCircle size={64} className="mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Approved!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
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
