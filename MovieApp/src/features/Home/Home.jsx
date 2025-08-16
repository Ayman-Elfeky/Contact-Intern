import Carousel from "../../common/Carousel/Carousel";
import Footer from "../../common/Footer/Footer";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import './Home.css'

export default function Home() {

  return (
    <>
      {/* <NavBar /> */}
      <div className="home">
        <Carousel />
        <MoviesContainer movieType={'movies'}/>
        <Footer />
      </div>
    </>
  );
}
