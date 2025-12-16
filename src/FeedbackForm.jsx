// FeedbackForm.jsx
import React, { useState,useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, Timestamp,getDocs } from "firebase/firestore";
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

  const Stars = ({ value }) => (
  <>
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="currentColor"
        className={`bi bi-star-fill ${i < value ? "text-warning" : "text-light"}`}
        viewBox="0 0 16 16"
      >
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg>
    ))}
  </>
);




const [feedbacks, setFeedbacks] = useState([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "feedback"));

        const feedbackData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFeedbacks(feedbackData);
        console.log(feedbackData)
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);


const totalReviews = feedbacks.length;

const average =
  totalReviews === 0
    ? 0
    : (
        feedbacks.reduce((sum, item) => sum + Number(item.rating), 0) /
        totalReviews
      ).toFixed(1);


const ratingSummary = {
  average: average,
  totalReviews: feedbacks.length,
  distribution: [
    { stars: 5, percent: feedbacks.filter(i => i.rating == 5).length },
    { stars: 4, percent: feedbacks.filter(i => i.rating == 4).length },
    { stars: 3, percent: feedbacks.filter(i => i.rating == 3).length },
    { stars: 2, percent: feedbacks.filter(i => i.rating == 2).length },
    { stars: 1, percent: feedbacks.filter(i => i.rating == 1).length },
  ],
};

  return (
    <>
    <div className="d-flex justify-content-center align-items-center" style={{height:"70vh"}}>
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


{/* review  */}




    <section className="d-flex justify-content-center">
      <div className="w-75 border rounded container px-5 py-4">


<div className="row align-items-center">
  <div className="col-auto text-center">
    <h3 className="display-2 fw-bold">{ratingSummary.average}</h3>
    <Stars value={Math.round(ratingSummary.average)} />
    <p className="mb-0 fs-6">
      (Based on {ratingSummary.totalReviews} reviews)
    </p>
  </div>

  {/* Progress bars */}
  <div className="col">
    {ratingSummary.distribution.map((item) => (
      <div key={item.stars} className="progress mb-3" style={{ height: "6px" }}>
        <div
          className="progress-bar bg-warning"
          style={{ width: `${item.percent*4 }%` }}
        />
      </div>
    ))}
  </div>

  {/* Star labels */}
  <div className="col-md-auto col-6">
    {ratingSummary.distribution.map((item) => (
      <div key={item.stars}>
        <Stars value={item.stars} />
        <span className="ms-1">{item.percent}</span>
      </div>
    ))}
  </div>
</div>
<br />
<hr />


{feedbacks.map((review, i) => (
  <div key={i} className="d-flex align-items-start border-bottom pb-4 mb-4">
    <img
      src={`https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-4.jpg`}
      alt={review.username}
      className="rounded-circle avatar-lg"
      style={{width:"50px"}}
    />

    <div className="ms-3">
      <h5 className="mb-1 text-capitalize-first">
        {review.username?.split("@")[0]}
       
      </h5>

      <Stars value={review.rating} />

      <p className="mb-2">{review.feedback}</p>
       <small className="text-muted">{review.createdAt?.toDate().toLocaleString()}</small>
    </div>
  </div>
))}


      </div>
    </section>
    </>
  );
}
