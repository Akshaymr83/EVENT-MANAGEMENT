

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../Review/Review.css';
// import img from '../images/pexels-photo-415829.webp';
// import { Button } from 'react-bootstrap'; // For the edit and delete buttons

// function Review() {
//   const [reviews, setReviews] = useState([]);
//   const [userName, setUserName] = useState(null);
//   const [currentReview, setCurrentReview] = useState('');
//   const [editingReviewId, setEditingReviewId] = useState(null);

//   useEffect(() => {
//     // Check if user is logged in by getting the data from localStorage
//     const user = localStorage.getItem('user');
//     let parsedUser = null;
//     try {
//       if (user) {
//         parsedUser = JSON.parse(user);
//         setUserName(parsedUser?.name); // Set the username if logged in
//       }
//     } catch (error) {
//       console.error('Failed to parse user data from localStorage', error);
//     }

//     // Fetch reviews after checking user login status
//     fetchReviews();
//   }, []);

//   const fetchReviews = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/review/review');
//       setReviews(response.data);
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//     }
//   };

//   const handleAddReview = () => {
//     if (!userName) {
//       alert('No user logged in');
//       return;
//     }
//     // Logic for opening modal to add review (handleAddReview can be your modal trigger)
//     setCurrentReview('');
//     setEditingReviewId(null); // Reset any editing review ID
//   };

//   const handleSubmit = async () => {
//     if (!currentReview.trim()) {
//       alert('Review text cannot be empty!');
//       return;
//     }

//     try {
//       if (editingReviewId) {
//         await axios.put(`http://localhost:5000/api/review/review/${editingReviewId}`, {
//           userName,
//           reviewText: currentReview,
//         });
//       } else {
//         await axios.post('http://localhost:5000/api/review/review', {
//           userName,
//           reviewText: currentReview,
//         });
//       }

//       setCurrentReview('');
//       setEditingReviewId(null);
//       fetchReviews();
//     } catch (error) {
//       console.error('Error submitting review:', error);
//     }
//   };

//   const handleEditReview = (reviewId, reviewText) => {
//     if (reviewText && reviewText !== currentReview) {
//       setEditingReviewId(reviewId);
//       setCurrentReview(reviewText);
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/api/review/review/${reviewId}?userName=${userName}`);
//       console.log('Review deleted successfully:', response.data);
//       fetchReviews();
//     } catch (error) {
//       console.error('Error deleting review:', error.response?.data || error.message);
//     }
//   };
  
  
  
//   return (
//     <>' <div className="feedbacks">
//     <h1 className="feedbackstitle">FEEDBACKS</h1>
//     <div className="input-container">
//       <input
//         type="text"
//         name="userName"
//         className="input"
//         placeholder="User Name"
//         value={userName || 'Not Logged In'}
//         disabled
//       />
//       <textarea
//         name="reviewText"
//         className="input"
//         placeholder="Enter your review"
//         value={currentReview}
//         onChange={(e) => setCurrentReview(e.target.value)}
//       />
//     </div>
//     <button className="sub-btn" onClick={handleSubmit}>
//       Submit
//     </button>
//   </div>
// '
//       <div className="reviewContainer">
       
//         {reviews.map((review) => (
//           <div className="reviewbox" key={review._id}>
            
//             <div className="reviewCard">
//               <p>{review.reviewText}</p>
//               <h6>
//                 <b>: {review.userName}</b>
//               </h6>

//               {review.userName === userName && (
//                 <>
//                   <Button
//                     variant="secondary"
//                     className="me-2"
//                     onClick={() => handleEditReview(review._id, review.reviewText)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="danger"
//                     onClick={() => handleDeleteReview(review._id)}
//                   >
//                     Delete
//                   </Button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Review;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../Review/Review.css';
// import { Button } from 'react-bootstrap'; // For the edit and delete buttons

// function Review() {
//   const [reviews, setReviews] = useState([]);
//   const [userName, setUserName] = useState(null);
//   const [currentReview, setCurrentReview] = useState('');
//   const [editingReviewId, setEditingReviewId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0);  // To keep track of the page

//   const reviewsPerPage = 4;  // Number of reviews per page
//   const maxReviewLength = 200; // Maximum length of each review to maintain consistent size

//   useEffect(() => {
//     // Check if user is logged in by getting the data from localStorage
//     const user = localStorage.getItem('user');
//     let parsedUser = null;
//     try {
//       if (user) {
//         parsedUser = JSON.parse(user);
//         setUserName(parsedUser?.name); // Set the username if logged in
//       }
//     } catch (error) {
//       console.error('Failed to parse user data from localStorage', error);
//     }

//     // Fetch reviews after checking user login status
//     fetchReviews();
//   }, []);

//   const fetchReviews = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/review/review');
//       setReviews(response.data);
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//     }
//   };

//   const handleAddReview = () => {
//     if (!userName) {
//       alert('No user logged in');
//       return;
//     }
//     setCurrentReview('');
//     setEditingReviewId(null); // Reset any editing review ID
//   };

//   const handleSubmit = async () => {
//     if (!currentReview.trim()) {
//       alert('Review text cannot be empty!');
//       return;
//     }

//     try {
//       if (editingReviewId) {
//         await axios.put(`http://localhost:5000/api/review/review/${editingReviewId}`, {
//           userName,
//           reviewText: currentReview,
//         });
//       } else {
//         await axios.post('http://localhost:5000/api/review/review', {
//           userName,
//           reviewText: currentReview,
//         });
//       }

//       setCurrentReview('');
//       setEditingReviewId(null);
//       fetchReviews();
//     } catch (error) {
//       console.error('Error submitting review:', error);
//     }
//   };

//   const handleEditReview = (reviewId, reviewText) => {
//     if (reviewText && reviewText !== currentReview) {
//       setEditingReviewId(reviewId);
//       setCurrentReview(reviewText);
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/review/review/${reviewId}?userName=${userName}`);
//       fetchReviews();
//     } catch (error) {
//       console.error('Error deleting review:', error.response?.data || error.message);
//     }
//   };

//   // Calculate the reviews to be shown based on currentPage and reviewsPerPage
//   const currentReviews = reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage);

//   const handleNext = () => {
//     if ((currentPage + 1) * reviewsPerPage < reviews.length) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <>
//       <div className="feedbacks">
//         <h1 className="feedbackstitle">FEEDBACKS</h1>
//         <div className="input-container">
//           <input
//             type="text"
//             name="userName"
//             className="input"
//             placeholder="User Name"
//             value={userName || 'Not Logged In'}
//             disabled
//           />
//           <textarea
//             name="reviewText"
//             className="input review-textarea"
//             placeholder="Enter your review"
//             value={currentReview}
//             onChange={(e) => setCurrentReview(e.target.value)}
//             maxLength={maxReviewLength}  // Limit review length
//           />
//         </div>
//         <button className="sub-btn" onClick={handleSubmit}>
//           Submit
//         </button>
//       </div>

//       <div className="reviewContainer">
//         {currentReviews.map((review) => (
//           <div className="reviewbox" key={review._id}>
//             <div className="reviewCard">
//               <p className="reviewText">{`"${review.reviewText.substring(0, maxReviewLength)}"`}</p>
//               <h6>
//                 <b>: {review.userName}</b>
//               </h6>

//               {review.userName === userName && (
//                 <>
//                   <Button
//                     variant="secondary"
//                     className="me-2"
//                     onClick={() => handleEditReview(review._id, review.reviewText)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="danger"
//                     onClick={() => handleDeleteReview(review._id)}
//                   >
//                     Delete
//                   </Button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="paginationButtons">
//         <Button
//           variant="secondary"
//           onClick={handlePrevious}
//           disabled={currentPage === 0}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="secondary"
//           onClick={handleNext}
//           disabled={(currentPage + 1) * reviewsPerPage >= reviews.length}
//         >
//           Next
//         </Button>
//       </div>
//     </>
//   );
// }

// export default Review;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Review/Review.css';
import { Button } from 'react-bootstrap'; // For the edit and delete buttons

function Review() {
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState(null);
  const [currentReview, setCurrentReview] = useState('');
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);  // To keep track of the page

  const reviewsPerPage = 4;  // Number of reviews per page
  const maxReviewLength = 200; // Maximum length of each review to maintain consistent size

  useEffect(() => {
    // Check if user is logged in by getting the data from localStorage
    const user = localStorage.getItem('user');
    let parsedUser = null;
    try {
      if (user) {
        parsedUser = JSON.parse(user);
        setUserName(parsedUser?.name); // Set the username if logged in
      }
    } catch (error) {
      console.error('Failed to parse user data from localStorage', error);
    }

    // Fetch reviews after checking user login status
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/review/review');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddReview = () => {
    if (!userName) {
      alert('No user logged in');
      return;
    }
    setCurrentReview('');
    setEditingReviewId(null); // Reset any editing review ID
  };

  const handleSubmit = async () => {
    if (!currentReview.trim()) {
      alert('Review text cannot be empty!');
      return;
    }

    try {
      if (editingReviewId) {
        await axios.put(`http://localhost:5000/api/review/review/${editingReviewId}`, {
          userName,
          reviewText: currentReview,
        });
      } else {
        await axios.post('http://localhost:5000/api/review/review', {
          userName,
          reviewText: currentReview,
        });
      }

      setCurrentReview('');
      setEditingReviewId(null);
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleEditReview = (reviewId, reviewText) => {
    if (reviewText && reviewText !== currentReview) {
      setEditingReviewId(reviewId);
      setCurrentReview(reviewText);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5000/api/review/review/${reviewId}?userName=${userName}`);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error.response?.data || error.message);
    }
  };

  // Calculate the reviews to be shown based on currentPage and reviewsPerPage
  const currentReviews = reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage);

  return (
    <>
      <div className="feedbacks">
        <h1 className="feedbackstitle">FEEDBACKS</h1>
        <div className="input-container">
          <input
            type="text"
            name="userName"
            className="input"
            placeholder="User Name"
            value={userName || 'Not Logged In'}
            disabled
          />
          <textarea
            name="reviewText"
            className="input review-textarea"
            placeholder="Enter your review"
            value={currentReview}
            onChange={(e) => setCurrentReview(e.target.value)}
            maxLength={maxReviewLength}  // Limit review length
          />
        </div>
        <button className="sub-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <div className="reviewContainer">
        {currentReviews.map((review) => (
          <div className="reviewbox" key={review._id}>
            <div className="reviewCard">
              <p className="reviewText">{`"${review.reviewText.substring(0, maxReviewLength)}"`}</p>
              <h6>
                <b>: {review.userName}</b>
              </h6>

              {review.userName === userName && (
                <>
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => handleEditReview(review._id, review.reviewText)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteReview(review._id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Circles */}
      <div className="paginationCircles">
        {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }).map((_, index) => (
          <span
            key={index}
            className={`paginationCircle ${index === currentPage ? 'active' : ''}`}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>
    </>
  );
}

export default Review;
