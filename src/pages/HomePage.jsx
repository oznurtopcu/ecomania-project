import ShopCard from "../components/ShopCard";
import Slider from "../components/Slider";

export default function HomePage() {
  const sampleSlides = [
    {
      image: "", // Replace with the actual URL of your image (or use require('./image.jpg') if local)
      summerText: "SUMMER 2020",
      newCollectionText: "NEW COLLECTION",
      description:
        "We know how large objects will act, but things on a small scale.",
      buttonText: "SHOP NOW",
    },
    {
      image: "", // Add more slides as needed
      summerText: "SUMMER 2021", // Example different content
      newCollectionText: "Another Collection",
      description: "Example description for the second slide.",
      buttonText: "EXPLORE MORE",
    },
    // ... more slides
  ];

  return (
    <div className="container">
      <div className="slider">
        <Slider slides={sampleSlides} />
        {/* <img src="https://placehold.co/414x753" alt="slider" /> */}
      </div>
      <div className="shopping-cards">
        <div className="main-content">
          <h3>EDITOR'S PICK</h3>
          <p>Problems trying to resolve the conflict between </p>
        </div>
        <div className="main-content">
          <ShopCard />
          <img src="https://placehold.co/324x500" alt="image-1" />
          <img src="https://placehold.co/324x500" alt="image-2" />
        </div>
        <div className="main-content">
          <img src="https://placehold.co/324x242" alt="image-3" />
          <img src="https://placehold.co/324x242" alt="image-4" />
        </div>
      </div>
    </div>
  );
}
