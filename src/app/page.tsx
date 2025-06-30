import Image from "next/image";
import Carousel from "./components/Carousel";
import Header from "./components/Header";

export default function Home() {
  return (
    <main>
      <style>
@import url('https://fonts.googleapis.com/css2?family=Bitcount+Grid+Double:wght@100..900&family=Comfortaa:wght@300..700&display=swap');
</style>
    <Header />
      <Carousel />
    </main>
  );
}
