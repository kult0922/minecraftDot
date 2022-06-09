import Footer from "./components/Footer";
import ImageConverter from "./components/ImageConverter";

const HomeComponent = () => {
  return (
    <>
      <div className="text-3xl ml-6 mt-4 mb-4">Minecraft Dot</div>
      <ImageConverter></ImageConverter>
      <Footer></Footer>
    </>
  );
};

export default HomeComponent;
