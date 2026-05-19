import HeroBanner from '../components/HeroBanner';
import NewArrivals from '../components/NewArrivals';
import SummerBanner from '../components/SummerBanner';
import SummerSlider from '../components/SummerSlider';
import CategoriesGrid from '../components/CategoriesGrid';
import RecommendedSlider from '../components/RecommendedSlider';
import SaleBanner from '../components/SaleBanner';

const Home = () => {
  return (
    <div className="w-full">
      <HeroBanner />
      <NewArrivals />
      <div className="max-w-[1700px] mx-auto px-10">
        <hr className="border-t border-gray-200 my-10" />
      </div>
      <SummerBanner />
      <SummerSlider />
      <div className="max-w-[1700px] mx-auto px-10">
        <hr className="border-t border-gray-200 my-10" />
      </div>
      <SaleBanner />
      <CategoriesGrid />
      <RecommendedSlider />
      <div className="max-w-[1700px] mx-auto px-10">
        <hr className="border-t border-gray-200 my-10" />
      </div>
    </div>
  )
}

export default Home
