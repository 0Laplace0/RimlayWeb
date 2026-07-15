import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';

const AccumulateShop = () => {
  const accumulateProducts = Array.from({ length: 22 }, (_, index) => ({
    id: `acc-${index + 1}`,
    name: `Accumulated Reward ${index + 1}`,
    price: (index + 1) * 100,
    image: "https://placehold.co/300x300/121214/a855f7?text=Reward", 
  }));

  return (
    <div className="min-h-screen bg-[#0d0d11] text-white flex flex-col w-full">
      <Navbar />
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-[1000px]">
          <ProductGrid 
            products={accumulateProducts} 
            title="ACCUMULATE SHOP" 
            subtitle="ร้านค้ายอดสะสม" 
            cols={4} 
            rows={5} 
            priceUnit="Points"
          />
        </div>
      </div>
    </div>
  );
};

export default AccumulateShop;