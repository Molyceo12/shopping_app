// src/Homescreen.tsx
// import Header from "./Header";
// import Body from "./Body";
import Footer from "./footer";
import Body from "./body";
import HelloSection from "./hellosection";
import Header from "./header";
import Whychooseus from "./whychooseus";
import NearestShop from "./nearestshop";

const Homescreen: React.FC = () => {
  

  // Load products from localStorage
  

  return (
    <div className="homescreen">
       {/* <Header cartCount={cartCount} isLoggedIn={isLoggedIn} /> */}
       <Header/>
       <HelloSection/>
      <Body/>
      <NearestShop/>
      <Whychooseus/>
      <Footer />
    </div>
  );
};

export default Homescreen;
