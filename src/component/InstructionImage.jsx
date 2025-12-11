import { useState, useEffect } from "react";

const InstructionImage = () => {
 const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const hasSeenImage = localStorage.getItem("instructionImageShown");

    if (!hasSeenImage) {
      // delay to trigger animation after mount
      setTimeout(() => {
        setShowImage(true);
      }, 2000);
    }
  }, []);

  const handleClick = () => {
    setShowImage(false);
    localStorage.setItem("instructionImageShown", "true");
  };

  return (
    <>
    <div className={`image-slide-container ${showImage ? "visible-image" : "hidden-image"}`}>
        
    </div>
    <div onClick={handleClick}
        className={`p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3 w-25 santa-text ${showImage ? "visible-image" : "hidden-image"}`}
    >
       Ho ho ho! Santa’s here! <br />
You can add up to 3 wishlists — a product name, a link, or a category. Tell Santa what you’d like!
{/* <br />
<button className="btn btn-sm btn-outline-dark">Ok</button> */}
    </div>
    <img
        src="https://blogger.googleusercontent.com/img/a/AVvXsEiSW5_9lROjdLWc04XkyBGaAWEhQqr63IHOwrYvoPlvBdd90TIXf7eEp5LD5w_7B0413A4XfCS2r4ba3HyRR1ykReGBYS5vzVmBA7m7_NqanIuHaE5JtEQ7R9g4tIQuPsRkUwPVSKN-UMjlnHMG69beK2SDcLU-duo8jryUVV9FQ9xbBoOlj7dbEwBOZTI"
        // className="santa-image"
        className={`santa-image ${showImage ? "visible-image" : "hidden-image"}`}
        onClick={handleClick}
        alt="instruction"
        style={{ cursor: "pointer" }}
        />
    </>
    
  );
}

export default InstructionImage