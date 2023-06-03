import Image from 'next/image';
import Logo from '../assets/images/logo.svg';

export default function Header() {
  return (
    <nav className="flex bg-red-500">
      <Image src={Logo} alt="Logo" />

      <ul className="flex">
        <li>Unboxing</li>
        <li>Battles</li>
        <li>Deals</li>
        <li>Affiliates</li>
        <li>Free Drop</li>
      </ul>
    </nav>
  );
}
