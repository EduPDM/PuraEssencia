
import NavBar from '@/components/navBar';
import Image from 'next/image';
import FlavorSelector from '@/components/selector';
import { Metadata } from 'next';
import path from 'path';
import fs from 'fs';
import Link from 'next/link';

interface Product {
  identifier: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  flavors: string[];
}

interface Props {
  params: {
    id: string;
  };
}

const getItemData = (): Product[] => {
  const filePath = path.join(process.cwd(), 'data/items.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const items: Product[] = JSON.parse(jsonData);
  return items;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const items = getItemData();
  const item = items.find((i) => i.identifier === params.id);

  if (!item) {
    return {
      title: 'Pura Essencia',
    };
  }

  return {
    title: `Detalhes do ${item.name}`,
    description: item.description,
  };
}

export default function ItemPage({ params }: Props) {
  const items: Product[] = getItemData();
  const item = items.find((i) => i.identifier === params.id);

  if(!item){
    return(
      <>
      <NavBar />
      <main className="bg-slate-200 text-white min-h-screen flex flex-col items-center justify-center">
          <p className='font-extrabold text-black'>404 - PRODUTO NÃO EXISTE</p>
          <Link href={"/"}>
            <button className='text-blue-600'>Clique aqui para voltar a navegar em rotas seguras</button>
          </Link>
      </main>
      </>
    )
  }

  if ( item.quantity === 0) {
    return (
      <>
      <NavBar />
      <main className="bg-slate-200 text-white min-h-screen flex items-center justify-center">
        
          <p className='font-extrabold text-red-600'>SEM PRODUTO NO ESTOQUE</p>
        
      </main>
      </>
    )
  }

  const objectFlavor = Object.values(item.flavors); 



  return (
    <>
      <NavBar/> 
      <main className="bg-slate-200 text-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl p-10 gap-8">
          {/* Imagem do produto */}
          <div className="flex-shrink-0">
            <Image
             src={`/${item.image}.jpg`}  // Use a URL da imagem do produto
              width={350}
              height={350}
              alt={`Imagem de ${item.name}`}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="flex flex-col justify-start items-start space-y-6 max-w-md">
            <h1 className="text-3xl font-bold text-black">{item.name}</h1>
            <p className="text-xl text-green-500 font-semibold">
              R$ {item.price.toFixed(2)}
            </p>
            <p className="text-md text-black">{item.description}</p>
            <FlavorSelector flavors={objectFlavor} itemName={item.name} />
          </div>
        </div>
      </main>
    </>
  );
}
