'use client';

import { useState } from 'react';


interface FlavorSelectorProps {
  flavors: string[];
  itemName: string; 
}

export default function Selector({ flavors, itemName }: FlavorSelectorProps) {
  const [selectedFlavor, setSelectedFlavor] = useState('');

  const handleFlavorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFlavor(event.target.value);
  };

  const whatsappNumber = "5519994719189"; 

  const getWhatsAppLink = () => {
    const message = `Olá, gostaria de comprar o pod ${itemName}, sabor de ${selectedFlavor}.`;
    const encodedMessage = encodeURIComponent(message); 
    return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
  };

  return (
    <div className="flex flex-col justify-start items-start space-y-6 max-w-md">
      <div className="w-full">
        <label htmlFor="flavor" className="block mb-2 text-lg text-black">
          Escolha o sabor:
        </label>
        <select
          id="flavor"
          value={selectedFlavor}
          onChange={handleFlavorChange}
          className="w-full px-4 py-2 text-gray-900 rounded-lg"
        >
          <option value="">Nenhum sabor escolhido</option>
          {flavors.map((flavor) => (
            <option key={flavor} value={flavor}>
              {flavor}
            </option>
          ))}
        </select>
      </div>

      <a
        href={selectedFlavor ? getWhatsAppLink() : '#'}
        target="_blank" 
        rel="noopener noreferrer"
        className={`${
          selectedFlavor
            ? 'bg-blue-500 hover:bg-blue-700 cursor-pointer'
            : 'bg-gray-400 cursor-not-allowed'
        } text-white text-lg font-bold py-3 px-6 rounded-lg transition-all shadow-md`}
        style={{ pointerEvents: selectedFlavor ? 'auto' : 'none' }} 
      >
        Comprar agora
      </a>
    </div>
  );
}
