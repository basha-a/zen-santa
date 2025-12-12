import { useState, useEffect } from "react";
import { auth, db } from "./firebase";

import { useAuth } from "./context/AuthContext";
import { collection, addDoc, query, where, onSnapshot, doc, updateDoc,setDoc, getDoc,serverTimestamp } from "firebase/firestore";
import Hero from "./component/Hero";
import Hero2 from "./component/Hero2";
import InstructionImage from "./component/InstructionImage";


export default function Wishlist() {
  const { user } = useAuth();

  // Form fields
  const [wishlist1, setWishlist1] = useState("");
  const [wishlist2, setWishlist2] = useState("");
  const [wishlist3, setWishlist3] = useState("");
  const [comments, setComments] = useState("");

  // List of data from Firestore
  const [myData, setMyData] = useState(null);


  const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

const [loading, setLoading] = useState(true);

const [showForm, setShowForm] = useState(false);

const [isLoading, setIsLoading] = useState(false);


useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);

    if (!myData) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }

  }, 2000);

  return () => clearTimeout(timer);
}, [myData]);






  const handleSubmitAnything = async (e) => {
    e.preventDefault();

    console.log("Santa's choice");

    try {
      await setDoc(doc(db, "userWishlist", user.uid), {
        uid: user.uid,
        wishlist1: "Anything",
        wishlist2 :"",
        wishlist3: "",
        comments,
        username: user.email,
        createdAt: serverTimestamp()
      });
      // clear form
      setWishlist1("");
      setWishlist2("");
      setWishlist3("");
      setComments("");

      // setShowForm(false); 
      // fetchData();

      await fetchData();
      setShowForm(false);


    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Error saving data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("inside handle submit");


      // VALIDATION: at least one wishlist required
  if (!wishlist1 && !wishlist2 && !wishlist3) {
    alert("Please enter at least 1 wishlist item.");
    return;
  }

  setIsLoading(true);  // <-- start loading
    try {
      await setDoc(doc(db, "userWishlist", user.uid), {
        uid: user.uid,
        wishlist1,
        wishlist2,
        wishlist3,
        comments,
        username: user.email,
        createdAt: serverTimestamp()
      });
      // clear form
      setWishlist1("");
      setWishlist2("");
      setWishlist3("");
      setComments("");
      setIsLoading(true);

      // setShowForm(false); // hide form
      // fetchData();
      await fetchData();
      setShowForm(false);


    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Error saving data");
    }
  };

// Move this OUTSIDE useEffect
const fetchData = async () => {
  if (!user) return;

  const docRef = doc(db, "userWishlist", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    setMyData(data);
    setWishlist1(data.wishlist1);
    setWishlist2(data.wishlist2);
    setWishlist3(data.wishlist3);
    setComments(data.comments);
    setIsEditing(true);
    console.log("Data", data)
  } else {
    setMyData(null);
    setIsEditing(false);
  }
};

// Now useEffect calls it
useEffect(() => {
  fetchData();
}, [user]);

const handleUpdateAnything = async (e) => {
  e.preventDefault();

  try {
    const docRef = doc(db, "userWishlist", user.uid);

    await updateDoc(docRef, {
      wishlist1: "Anything",
      wishlist2:"",
      wishlist3:"",
      comments
    });

    // setShowForm(false); // hide form
    // fetchData();

    await fetchData();
      setShowForm(false);

  } catch (err) {
    console.error("Update error:", err);
  }
}

const handleUpdate = async (e) => {
  e.preventDefault();

    // VALIDATION: at least one wishlist required
  if (!wishlist1 && !wishlist2 && !wishlist3) {
    alert("Please enter at least 1 wishlist item.");
    return;
  }

  console.log("inside handle update");

  try {
    const docRef = doc(db, "userWishlist", user.uid);

    console.log(docRef)

    await updateDoc(docRef, {
      wishlist1,
      wishlist2,
      wishlist3,
      comments,
    });

    // setShowForm(false); // hide form
    // fetchData();

    await fetchData();
      setShowForm(false);

  } catch (err) {
    console.error("Update error:", err);
  }
};


const editMyWishlist = () => {
    setShowForm(prev => !prev);
}

const isURL = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};
//style={{position:"relative", height:"50vh", alignContent:"center"}} style={{position:"absolute" ,right:"50px", width:"500px", top:"0px"}} 

  return (
    <>

   {showForm && (
    <section id="form-section" className="mb-4 row g- mt-5 mx-2" >

    <div className="col-6">
      <h3 className="ms-5">Add Your Wishlists <span className="text-muted fs-6">(Budget 500 to 700rs)</span></h3>

      <div className="mx-5 pe-5 w-100">

      <form onSubmit={isEditing ? handleUpdate : handleSubmit}>

        <div className="w-100">
          <input
            type="text"
            placeholder="Wishlist 1"
            value={wishlist1}
            onChange={(e) => setWishlist1(e.target.value)}
            className="form-control "
          />
          <br />

          <input
            type="text"
            placeholder="Wishlist 2"
            value={wishlist2}
            onChange={(e) => setWishlist2(e.target.value)}
            className="form-control"
          />
          <br />

          <input
            type="text"
            placeholder="Wishlist 3"
            value={wishlist3}
            onChange={(e) => setWishlist3(e.target.value)}
            className="form-control"
          />
          <br />
           <div className="mb-3">
            
            <textarea 
              className="form-control" 
              id="exampleFormControlTextarea1" 
              rows="3" placeholder="Comments..." 
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
          </div>
        </div>
        <br />
       
        <button 
        className="btn btn-sm btn-primary" 
        type="submit"
        disabled={isLoading}
        >
          {isEditing ? "Update Wishlist" : "Save Wishlist"}
        </button>

        <a onClick={isEditing ? handleUpdateAnything : handleSubmitAnything} className="btn btn-sm ms-4 btn-outline-dark">Anything (Santa's choice)</a>


      </form>
      </div>




    </div>

      <div className="col-6">
        <img src="https://blogger.googleusercontent.com/img/a/AVvXsEjYLzenOcqZ6TJ_OZkE79OOinz9fIHeuLguNhEtPvRLDSWeOyhWWTzkS3fLYrMaSKq_RRt2Y5hWIw7PvJfpJ6ONxXPiA79UEnQ-EdK5rcC55-2WCUwQD9B-yFb7hajzJAZEuS1IWPzwssJOavdzgy3mdWuysVQgSWepzKpBBT5ajwka3ZcflRDhI3gs3jg" style={{width:"500px"}}  alt="" />

      </div>
    </section>

)}


{!myData ? (
  <div>
    {loading && (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    
  </div>

) : (

<section className="mx-5 border border-rounded rounded p-5">
  <div className="d-flex align-items-center">
    <h3>My Wishlist:</h3> <button className="btn border-0" onClick={editMyWishlist} disabled><i className="bi bi-pencil text-success" ></i></button>
  </div>
<div className="row">
  <div className="col-6">
    <div className="list-group w-100" id="list-tab" role="tablist">
      <a
        className="list-group-item list-group-item-action active"
        id="list-wishliat1-list"
        data-bs-toggle="list"
        href="#list-wishliat1"
        role="tab"
        aria-controls="list-wishliat1"
      >
        {/* {myData.wishlist1} */}
        {isURL(myData.wishlist1) ? "Link 1" : myData.wishlist1}
      </a>
      {myData.wishlist2 && (
        <a
        className="list-group-item list-group-item-action"
        id="list-wishlist2-list"
        data-bs-toggle="list"
        href="#list-wishlist2"
        role="tab"
        aria-controls="list-wishlist2"
      >
        {/* {myData.wishlist2} */}
        {isURL(myData.wishlist2) ? "Link 2" : myData.wishlist2}
      </a>
      )}
      {myData.wishlist3 && (
        <a
        className="list-group-item list-group-item-action"
        id="list-wishlist3-list"
        data-bs-toggle="list"
        href="#list-wishlist3"
        role="tab"
        aria-controls="list-wishlist3"
      >
        {/* {myData.wishlist3} */}
        {isURL(myData.wishlist3) ? "Link 3" : myData.wishlist3}
      </a>
      )}
    </div>
  </div>

  <div className="col-6">
    <div className="tab-content" id="nav-tabContent">
      <div
        className="tab-pane fade show active"
        id="list-wishliat1"
        role="tabpanel"
        aria-labelledby="list-wishliat1-list"
      >

        {isURL(myData.wishlist1) ? (
          <div>
            <h6 className="text-center w-75 mb-4">Link of the Product!</h6>
            <section className="d-flex justify-content-around w-75">
              <a href={myData.wishlist1} className="btn btn-sm btn-warning" target="_blank">Open Link</a>
            </section>
          </div>
        ) : (
          <div>
            <h6 className="text-center w-75 mb-4">Search on</h6>
            <section className="d-flex justify-content-around w-75">
              
              <a 
                  href={`https://www.flipkart.com/search?q=${encodeURIComponent(myData.wishlist1)}`} 
                  target="_blank"
                >
                  <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/flipkart-icon.png" width={"30px"} alt="" />
              </a>
              <a 
                href={`https://www.amazon.in/s?k=${encodeURIComponent(myData.wishlist1)}`} 
                target="_blank"
              >
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/amazon-icon.png" width={"30px"} alt="" />

              </a>
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(myData.wishlist1)}`} 
                target="_blank"
              >
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-color-icon.png" width={"30px"} alt="" />
              </a>
            </section>
          </div>
        )}

        
      </div>
      <div
        className="tab-pane fade"
        id="list-wishlist2"
        role="tabpanel"
        aria-labelledby="list-wishlist2-list"
      >
       {isURL(myData.wishlist2) ? (
          <div>
            <h6 className="text-center w-75 mb-4">Link of the Product!</h6>
            <section className="d-flex justify-content-around w-75">
              <a href={myData.wishlist2} className="btn btn-sm btn-warning" target="_blank">Open Link</a>
            </section>
          </div>
        ) : (
          <div>
            <h6 className="text-center w-75 mb-4">Search on</h6>
            <section className="d-flex justify-content-around w-75">
              
              <a 
                  href={`https://www.flipkart.com/search?q=${encodeURIComponent(myData.wishlist2)}`} 
                  target="_blank"
                >
                  <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/flipkart-icon.png" width={"30px"} alt="" />
              </a>
              <a 
                href={`https://www.amazon.in/s?k=${encodeURIComponent(myData.wishlist2)}`} 
                target="_blank"
              >
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/amazon-icon.png" width={"30px"} alt="" />

              </a>
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(myData.wishlist2)}`} 
                target="_blank"
              >
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-color-icon.png" width={"30px"} alt="" />
              </a>
            </section>
          </div>
        )}
      </div>
      <div
        className="tab-pane fade"
        id="list-wishlist3"
        role="tabpanel"
        aria-labelledby="list-wishlist3-list"
      >
        {isURL(myData.wishlist3) ? (
          <div>
            <h6 className="text-center w-75 mb-4">Link of the Product!</h6>
            <section className="d-flex justify-content-around w-75">
              <a href={myData.wishlist3} className="btn btn-sm btn-warning" target="_blank">Open Link</a>
            </section>
          </div>
        ) : (
          <div>
            <h6 className="text-center w-75 mb-4">Search on</h6>
            <section className="d-flex justify-content-around w-75">
              
              <a 
                  href={`https://www.flipkart.com/search?q=${encodeURIComponent(myData.wishlist3)}`} 
                  target="_blank"
                >
                  <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/flipkart-icon.png" width={"30px"} alt="" />
              </a>
              <a 
                href={`https://www.amazon.in/s?k=${encodeURIComponent(myData.wishlist3)}`} 
                target="_blank"
              >
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/amazon-icon.png" width={"30px"} alt="" />

              </a>
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(myData.wishlist3)}`} 
                target="_blank"
              >
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-color-icon.png" width={"30px"} alt="" />
              </a>
            </section>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
{comments && (
  <p className="mt-3">Comments: <span className="text-primary">{comments}</span></p>
)}
</section>
)}


<InstructionImage />
    </>
  );
}
