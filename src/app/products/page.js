'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Products() {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((error) => console.error(error));
  }, [])

  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    if(searchTerm.length > 0) {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else if(priceFilter.length > 0) {
      const filtered = allProducts.filter((product) => product.price <= priceFilter);
      setFilteredProducts(filtered);
    } else if (sizeFilter.length > 0) {
      const filtered = allProducts.filter((product) => product.sizes.includes(sizeFilter));
      setFilteredProducts(filtered);
    } else if(colorFilter.length > 0) {
      const filtered = allProducts.filter((product) => product.colors.includes(colorFilter));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
    
  }, [searchTerm, priceFilter, sizeFilter, colorFilter, allProducts])

  const resetFilters = () => {
    setSearchTerm('');
    setPriceFilter('');
    setSizeFilter('');
    setColorFilter('');
    setFilteredProducts(allProducts);
  };

  return (
    <div className='m-8 md:m-0'>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold my-8">Lista de Camisetas</h1>
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Pesquisar produtos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-auto"
          />
          <input
            type="number"
            placeholder="Preço máximo"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-auto"
          />
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-auto"
          >
            <option value="">Tamanho</option>
            <option value="P">P</option>
            <option value="M">M</option>
            <option value="G">G</option>
            <option value="GG">GG</option>
          </select>
          <select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-auto"
          >
            <option value="">Cor</option>
            <option value="Azul">Azul</option>
            <option value="Verde">Verde</option>
            <option value="Pink">Pink</option>
          </select>
          <button
            onClick={resetFilters}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Limpar Filtros
          </button>
        </div>
        {filteredProducts.length === 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <p className="font-bold">Nenhum produto encontrado!</p>
            <p>Por favor, ajuste seus filtros de pesquisa.</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border rounded p-4">
              <img src={product.image} alt={product.name} className="w-full w-100  mb-2 rounded" />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
              <div className="flex justify-between mt-2">
                <div>
                  <p className="font-semibold">Tamanhos:</p>
                  <p>{product.sizes.join(', ')}</p>
                </div>
                <div>
                  <p className="font-semibold">Cores:</p>
                  <p>{product.colors.join(', ')}</p>
                </div>

              </div>
              <button type="button" onClick={() => router.push(`/products/${product.id}`)} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Detalhes
                </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
