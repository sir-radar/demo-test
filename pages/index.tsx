import { useState } from 'react';
import Header from '@/components/Header';
import Spinner from '@/components/Spinner';
import ProductCard from '@/components/ProductCard';
import { ProductInterface, products } from '@/util/products';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<
    ProductInterface | undefined
  >(undefined);

  const selectProduct = (productIndex: number) => {
    const product = products[productIndex];
    setSelectedProduct(product);
  };

  return (
    <main className="bg-[#F0F0F2]">
      <Header />

      <div className="flex min-h-screen px-6 py-[84px]">
        <section className="flex flex-col w-full">
          <h2>Available Items</h2>
          <label className="uppercase text-[#8E8E99] alt-font text-[12px]">
            Search
          </label>
          <input className="p-2 mb-3" />
          <div className="flex gap-2 mb-3">
            <div className="flex flex-col w-full">
              <label className="uppercase text-[#8E8E99] alt-font text-[12px]">
                Price max
              </label>
              <input className="w-full p-2" />
            </div>
            <div className="flex flex-col w-full">
              <label className="uppercase text-[#8E8E99] alt-font text-[12px]">
                Order By*
              </label>
              <input className="w-full p-2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                imageURL={product.imageURL}
                isSelected={selectedProduct?.id === product.id}
                handleClick={() => selectProduct(i)}
              />
            ))}
          </div>
        </section>
        <section className="w-full">
          <Spinner product={selectedProduct} />
        </section>
      </div>
    </main>
  );
}
