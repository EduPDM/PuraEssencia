import fs from "fs";
import Image from "next/image";
import Link from 'next/link';
import path from "path";

interface Product {
    identifier: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    flavors: string[];
}

const getItemData = (): Product[] => {
  const filePath = path.join(process.cwd(), 'data/items.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const items: Product[] = JSON.parse(jsonData);
  return items;
};

export default function Item() {
  const items = getItemData();

  return (
    <>
      {items.map((item, index) => (
        <Link  
          key={index} 
          href={item.quantity == 0 ? "#" : `/${item.identifier}`}
          className={item.quantity !== 0 ? "cursor-pointer" : "pointer-events-none"}
        >
          <div 
            className="flex flex-col lg:flex-row items-start bg-secondary rounded-md shadow-lg p-4 lg:p-6 bg-zinc-600 transition-all duration-300 h-full"
            
          >
            <div className="flex-shrink-0 w-full lg:w-1/2 mb-4 md:mb-0">
              <Image 
                src={`/${item.image}.jpg`} 
                width={300} 
                height={300} 
                alt={item.name} 
                className="object-cover mxs rounded-md" 
              />
            </div>
            <div className="flex-1 text-center lg:text-left w-full lg:w-1/2 lg:mx-5 mx-0 pt-6">
              <p className="font-bold text-white">{item.name}</p>
              <p className="text-base hidden lg:block text-white">{item.description}</p>
              {item.quantity !== 0 ? (
                <p className="text-green-500 font-semibold font text-xl mt-2">R${item.price}</p>
              ) : (
                <p className="text-red-500 font-semibold mt-2">ESGOTADO</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
