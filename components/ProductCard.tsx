import Image from 'next/image';

import { USDollar } from '@/util/currencyFormatter';
import { classNames } from '@/util/classNames';

interface ProductCardInterface {
  name: string;
  price: number;
  brand: string;
  imageURL: string;
  isSelected: boolean;
  handleClick: () => void;
}

export default function ProductCard({
  name,
  price,
  imageURL,
  brand,
  isSelected,
  handleClick,
}: ProductCardInterface) {
  return (
    <div
      onClick={() => handleClick()}
      className={classNames(
        'flex flex-col p-[0.625rem] bg-white h-[235px] max-h-[235px] hover:border-2 hover:border-solid hover:border-red-800',
        isSelected && 'border-2 border-solid border-red-800'
      )}
    >
      <div className="bg-[#F9E6C2] flex justify-center items-center relative w-full h-[175px] max-h-[175px] p-4">
        <Image
          className="w-[63px]"
          src={imageURL}
          alt=""
          height={100}
          width={100}
        />
      </div>
      <h5 className="text-[.9375rem]">{name}</h5>
      <p className="alt-font text-[#8E8E99] text-[12px]">{brand}</p>
      <p className="text-[14px]">{USDollar.format(price)}</p>
    </div>
  );
}
