import React from "react";
import Image1 from "./Group.png";
import Image2 from "./Selected.png";
import Image3 from "./InvertedExplore.png";
import Image4 from "./Invertedprof.png";
import Image5 from "./Invertednot.png";
import "../App.css";
const styles = {
  imageGalleryContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: "75px",
    width: "400px",
  },
  imageContainer: {
    margin: "10px",
    marginLeft: "3.8em",
    // Remove border-related styles
    // border: '1px solid #ddd',
    // borderRadius: '8px',
    // boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    // overflow: 'hidden',
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    display: "block",
  },
  tweetButton: {
    marginTop: "20px",
    textAlign: "center",
  },
  tweetButtonStyle: {
    backgroundColor: "#1DA1F2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    width: "200px",
  },
};

const ImageGallery = () => {
  return (
    <div className="left-pane">
      <div style={styles.imageContainer}>
        <img src={Image1} alt="Image 1" style={styles.image} />
      </div>
      <div style={styles.imageContainer}>
        {/* <Link to="/page2"> */}
        <img src={Image2} alt="Image 2" style={styles.image} />
        {/* </Link> */}
      </div>
      <div style={styles.imageContainer}>
        {/* <Link to="/page3"> */}
        <img src={Image3} alt="Image 3" style={styles.image} />
        {/* </Link> */}
      </div>

      <div style={styles.imageContainer}>
        {/* <Link to="/page3"> */}
        <img src={Image5} alt="Image 5" style={styles.image} />
        {/* </Link> */}
      </div>
      <div style={styles.imageContainer}>
        {/* <Link to="/page3"> */}
        <img src={Image4} alt="Image 4" style={styles.image} />
        {/* </Link> */}
      </div>

      <div style={styles.tweetButton}>
        <button placeholder="Tweet" style={styles.tweetButtonStyle}>
          Tweet
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
