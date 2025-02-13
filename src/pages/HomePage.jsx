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
      <div className="shopping-cards my-15">
        <div className="main-content text-center m-15">
          <h3 className="font-bold text-[#252B42]">EDITOR'S PICK</h3>
          <p>Problems trying to resolve the conflict between </p>
        </div>
        <div className="">
          <div className="main-content flex flex-col items-center gap-6 mb-6">
            <ShopCard />
            <ShopCard />
          </div>
          <div className="main-content flex flex-col items-center gap-6">
            <ShopCard />
            <ShopCard />
          </div>
        </div>
        <div className="main-content">
          <img src="https://placehold.co/324x242" alt="image-3" />
          <img src="https://placehold.co/324x242" alt="image-4" />
        </div>
      </div>
    </div>
  );
}
