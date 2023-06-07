import Link from 'next/link';
import Logo from './icons/logo.svg';
import Unboxing from './icons/unboxing.svg';
import Battles from './icons/battles.svg';
import Deals from './icons/deals.svg';
import Affiliates from './icons/affiliates.svg';
import FreeDrop from './icons/freeDrop.svg';

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
    <nav className="flex py-2 px-3.5 bg-white fixed w-full z-10">
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
