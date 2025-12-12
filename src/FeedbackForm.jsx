// FeedbackForm.jsx
import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "./context/AuthContext";

export default function FeedbackForm() {


    const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) return setMessage("Please select a rating.");

    try {
      await addDoc(collection(db, "feedback"), {
        rating,
        feedback: text,
        createdAt: Timestamp.now(),
        username: user.email
      });

      setMessage("Feedback submitted successfully!");
      setRating(0);
      setText("");
    } catch (error) {
      setMessage("Error submitting feedback.");
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
        <form
      onSubmit={handleSubmit}
      style={{
        width: "350px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <h2>Leave Feedback about this App</h2>

      {/* ⭐ Star Rating */}
      <div style={{ display: "flex", gap: "5px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              fontSize: "26px",
              cursor: "pointer",
              color: star <= (hover || rating) ? "#ffc107" : "#ccc",
            }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        ))}
      </div>

      {/* 📝 Text Area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your feedback..."
        rows="4"
        style={{ padding: "10px", fontSize: "14px" }}
      />

      <button
        type="submit"
        className="btn btn-primary"
        style={{
        //   background: "#1976d2",
          color: "white",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Submit
      </button>

      {message && <p>{message}</p>}
    </form>
    </div>
  );
}
