'use client';
import { Phone, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const menus = [
  {
    name: 'ignite',
    label: 'Ignite',
    items: [
      { href: '', label: 'Ignite V250' },
      { href: '', label: 'Ignite V150' },
    ],
  },
  {
    name: 'elfbar',
    label: 'Elfbar',
    items: [
      { href: 'elfbar-30000', label: 'Elfbar 30K' },
    ],
  },
  {
    name: 'oxbar',
    label: 'Oxbar',
    items: [
      { href: 'oxbar-9000', label: 'Oxbar G9500' },
      { href: 'oxbar-g-10000', label: 'Oxbar G10000' },
      { href: 'oxbar-magic-maze-2', label: 'Oxbar MagicMaze 2' },
    ],
  },
];



export default function NavBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const closingTimeout = useRef<NodeJS.Timeout | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  const handleClickOutside = (event: MouseEvent) => {
    if (
      Object.values(menuRefs.current).every(
        (ref) => ref && !ref.contains(event.target as Node)
      )
    ) {
      setOpenMenu(null);
      setClickedMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (closingTimeout.current) {
      clearTimeout(closingTimeout.current);
    }
    if (!clickedMenu) {
      setOpenMenu(menu);
    }
  };

  const handleMouseLeave = (menu: string) => {
    if (openMenu === menu && !clickedMenu) {
      closingTimeout.current = setTimeout(() => {
        setOpenMenu(null);
      }, 200);
    }
  };

  const handleClick = (menu: string) => {
    if (clickedMenu === menu) {
      setClickedMenu(null);
      setOpenMenu(null);
    } else {
      setClickedMenu(menu);
      setOpenMenu(menu);
    }
  };

  return (
    <nav className=' bg-zinc-950 w-screen h-auto z-40 bg-clip-padding  '>
      <div className='py-3 flex bg-primary text-2xl text-white border-b-2 border-gray-300/10 justify-evenly gap-8'>
        <div className='flex items-center text-center'>
        <p>PURA ESSENCIA</p>
        <Image
          src={"/hero-image.png"}
          width={75} 
          height={25} 
          alt=""
          className="relative mx-auto my-0" 
        />
        </div>
        
      </div>

      <div className='w-full bg-secondary text-white md:hidden block py-2'>
        <div className='flex items-center text-center justify-center'>
          <Link href='/'>Voltar ao inicio</Link>
        </div>
      </div>

      <div className='w-full bg-secondary text-white md:block hidden py-2'>
        <ul className='flex justify-around items-center mx-5'>
          <li>
            <a href='/'>Voltar ao inicio</a>
          </li>

          {menus.map((menu) => (
            <li
            key={menu.name}
            className="relative"
            ref={(el) => {
              menuRefs.current[menu.name] = el; 
            }}
            onMouseEnter={() => handleMouseEnter(menu.name)}
            onMouseLeave={() => handleMouseLeave(menu.name)}
            onClick={() => handleClick(menu.name)}
          >
              <span className='ml-2 flex'>
                {menu.label}
                {openMenu === menu.name ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
              {openMenu === menu.name && (
                <ul className='absolute bg-zinc-200 shadow-md mt-4 p-3 space-y-2 transition-all duration-300 ease-in-out w-64 border rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 border-gray-300/10'>
                  {menu.items.map((item) => (
                    <li key={item.href} className='hover:bg-zinc-500 p-2'>
                      <a href={item.href}>{item.label}</a>
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
              className='text-white hover:bg-[#07c98b] rounded-lg p-2 flex bg-green-500 transition-colors'
            >
              Whatsapp
              <span className='ml-2'>
                <Phone size={24} />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
