import "./App.css";
import Category from "./Component/Category";
import Food from "./Component/Food";
import Headline from "./Component/HeadlineCards";
import Hero from "./Component/Hero";
import Navbar from "./Component/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Headline />
      <Food />
      <Category />
    </div>
  );
}

export default App;
