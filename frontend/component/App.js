import React, { useEffect, useState } from "react";
import "./App.css";

import MiddlePane from "./components/MiddlePane";
import RightPane from "./components/RightPane";
// import ImageGallery from "./components/Side";
import Auth from "./components/Auth";
import { storage } from "./config/firebase";
import { db, auth } from "./config/firebase"; // Import auth from firebase
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { v4 } from "uuid";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ImageGallery from "./components/Side";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const moviesCollectionRef = collection(db, "post");

  const [imageUrls, setImageUrls] = useState([]);

  const [newUser, setUser] = useState("");
  // const [newTime, setTime] = useState(0);
  const [image, setImage] = useState(null);
  // const [imlink,setLink]=useState("")
  const [alttext,setAlt]=useState("")
  const imagesListRef = ref(storage, "images/");
  console.log(storage)
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);


  useEffect(() => {
    getMovieList();
  }, []);


  const onSubmitMovie = async () => {
    try {
      if (image == null) return;
      let link = `images/${image.name + v4()}`;
      const imageRef = ref(storage, link);
  
      // Upload the image to Firebase Storage
      uploadBytes(imageRef, image).then((snapshot) => {
        // Get the download URL for the image
        getDownloadURL(snapshot.ref).then((url) => {
          // Store the full image URL in Firestore
          addDoc(moviesCollectionRef, {
            name: newUser,
            time: [2003, 20],
            alttext: alttext,
            image: url, // Store the full image URL here
          });
  
          // Refresh the movie list
          getMovieList();
        });
      });
    } catch (err) {
      console.error(err);
    }
  };
   
//   <div>
//      <div className="new" style={{ backgroundColor: "black", height: "100vh" }}>
//        <Router>
//        <Routes>
//     <Route exact path="/" element={<Auth/>}>
    
//  </Route>

//      <Route exact path="/page" element={<ImageGallery/>}>
    
//  </Route> 
//  </Routes>
//  </Router>

{/* <div> */}
 {/* <p>hello</p> */}
 return (
  <div>
    <div>
      <input
        placeholder="User..."
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        placeholder="Alttext"
        onChange={(e) => setAlt(e.target.value)}
      />
      <input
        type="file"
        onChange={(event) => {
          setImage(event.target.files[0]);
        }}
      />
      <button onClick={onSubmitMovie}>Submit Movie</button>
    </div>
    <div>
      {movieList.map((movie) => (
        <div key={movie.id}>
          <h1>{movie.name}</h1>
          <h2>{movie.alttext}</h2>
          <h3>{movie.time[0]}</h3>
          <img src={movie.image} alt={movie.alttext} />
          <h4>{movie.image}</h4>
        </div>
      ))}
    </div>
  </div>
);


}

export default App;
