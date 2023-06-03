import Image from 'next/image';
import Logo from '../assets/images/logo.svg';
import Unboxing from '../assets/images/unboxing.svg';
import Battles from '../assets/images/battles.svg';
import Deals from '../assets/images/deals.svg';
import Affiliates from '../assets/images/affiliates.svg';
import FreeDrop from '../assets/images/freeDrop.svg';
import Link from 'next/link';

const navItems = [
  {
    title: 'Unboxing',
    image: Unboxing,
    active: false,
  },
  {
    title: 'Battles',
    image: Battles,
    active: false,
  },
  {
    title: 'Deals',
    image: Deals,
    active: true,
  },
  {
    title: 'Affiliates',
    image: Affiliates,
    active: false,
  },
  {
    title: 'Free Drop',
    image: FreeDrop,
    active: false,
  },
];

export default function Header() {
  return (
    <nav className="flex py-2 px-3.5 bg-white">
      <Link href="/" className="flex items-center justify-center">
        <svg className="w-[131px] mx-4 my-0" viewBox="0 -2 50 9">
          <Logo />
        </svg>
      </Link>

      <ul className="flex font-bold uppercase">
        {navItems.map((item) => (
          <li
            key={item.title}
            className={
              item.active
                ? 'flex items-center px-4 py-5 text-[#3D789D]'
                : 'flex items-center px-4 py-5 text-[#8E8E99]'
            }
          >
            <item.image className="mr-[0.65rem]" />
            <p>{item.title}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}
