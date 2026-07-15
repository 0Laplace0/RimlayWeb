import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';

const Shop = () => {
  const shopProducts = Array.from({ length: 25 }, (_, index) => ({
    id: `shop-${index + 1}`,
    name: `Shop Item ${index + 1}`,
    price: Math.floor(Math.random() * 200) + 20,
    image: "https://placehold.co/300x300/121214/a855f7?text=Shop", 
  }));

  return (
    <div className="min-h-screen bg-[#0d0d11] text-white flex flex-col w-full">
      <Navbar />
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-[1000px]">
          <ProductGrid 
            products={shopProducts} 
            title="MAIN SHOP" 
            subtitle="ร้านค้าทั่วไป" 
            cols={4} 
            rows={5} 
            priceUnit="Cash"
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;