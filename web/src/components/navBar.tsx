'use client';
import { Phone, ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const menus = [
  {
    name: 'ignite',
    label: 'Ignite',
    items: [
      { href: 'ignite-25000', label: 'Ignite V250' },
      { href: 'ignite-15000', label: 'Ignite V150' },
    ],
  },
  {
    name: 'elfbar',
    label: 'Elfbar',
    items: [
      { href: 'elficeking-40000', label: 'Elfbar Ice King 40K' },
      { href: 'elfbar-30000', label: 'Elfbar 30K' }
     
    ],
  },
  {
    name: 'oxbar',
    label: 'Oxbar',
    items: [
      { href: 'oxbar-64000', label: 'NOVO Oxbar 64K' },
      { href: 'oxbar-magic-maze-2', label: 'Oxbar MagicMaze 30k' },
      { href: 'oxbar-g-10000', label: 'Oxbar G10000' },
      { href: 'oxbar-9000', label: 'Oxbar G9500' }
      
    ],
  },
  {
    name: 'pynepod',
    label: 'Pyne Pod',
    items: [
      { href: 'pynepod-8000', label: 'Pyne Pod 8K' }
    ],
  },
 
];

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const toggleSideMenu = () => {
    setShowSideMenu(!showSideMenu);
  };

  const handleMenuClick = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <nav className='bg-zinc-950 w-screen h-auto z-40'>
      <div className='flex bg-primary text-2xl text-white border-b-2 border-gray-300/10 justify-between items-center p-4'>
        <button className='block text-white' onClick={toggleSideMenu}>
          {showSideMenu ? <X size={32} /> : <Menu size={32} />}
        </button>
        <Image src='/logohero.jpg' width={105} height={35} alt='Logo' className='my-0 mx-auto' />
      </div>

      {showSideMenu && (
        <div className='fixed top-0 left-0 h-full w-64 bg-zinc-900 text-white shadow-lg p-6 transition-all duration-300 transform'>
          <ul className='space-y-4'>
            <li>
              <Link href='/' className='block text-white hover:bg-gray-700 p-2 rounded-md transition-colors'>
                Voltar ao início
              </Link>
            </li>
            {menus.map((menu) => (
              <li key={menu.name} className='relative'>
                <button
                  className='flex items-center cursor-pointer w-full text-left text-lg font-semibold py-2 px-4 rounded-md hover:bg-zinc-700 focus:outline-none transition-colors'
                  onClick={() => handleMenuClick(menu.name)}
                >
                  {menu.label}
                  {openMenu === menu.name ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openMenu === menu.name && (
                  <ul className='bg-zinc-800 mt-2 p-3 space-y-2 rounded-md'>
                    {menu.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className='block text-sm text-white hover:bg-zinc-600 py-2 px-4 rounded-md transition-colors'
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <a
                href='https://wa.me/5519994719189?text=Gostaria%20de%20fazer%20um%20pedido'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center text-white hover:bg-green-500 rounded-lg p-3 transition-all'
              >
                Whatsapp
                <Phone size={24} className='ml-2' />
              </a>
            </li>
          </ul>
          <button
            className='absolute bottom-4 right-4 text-white hover:bg-zinc-600 rounded-full p-2'
            onClick={toggleSideMenu}
          >
            <X size={50} />
          </button>
        </div> 
      )}
    </nav>
  );
}
