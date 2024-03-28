// next navigation
'use client';
import { useEffect, useState } from "react";

export default function ProductDetailsPage({params}) {
  const [product, setProduct] = useState(null);
  const [img, setImg] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/products/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error(error));
  }, [params.slug]);

  // Função para lidar com a seleção de tamanho
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // Função para lidar com a seleção de cor
  const handleColorChange = (color) => {
    setSelectedColor(color);
    setImg(color === 'Pink' ? 'pink' : color === 'Azul' ? 'blue' : color === 'Verde' ? 'green' : '-')
  };



  return (
    <div className="container mx-auto">
      <div className="flex h-32 items-center">
      <button
        className="bg-blue-500 text-white font-semibold px-4 h-12 rounded"
        onClick={() => {
          window.history.back();
        }}
      >
        Voltar
      </button>
      <h1 className="text-2xl font-bold my-8 ml-8">Detalhes do Produto</h1>
      </div>
      <div className="flex flex-col items-center md:flex-row">
        {product && (
          <>
            <img src={img !== '' ? `/${img}-shirt.jpg` : product.image} alt={product.name} className="w-full md:w-1/2 rounded-lg shadow-lg" />
            <div className="md:pl-8 flex-1">
              <h2 className="text-xl font-semibold mb-4">{product.name}</h2>
              <p className="text-gray-600 mb-4">Preço: ${product.price}</p>
              <div className="my-4">
                <p className="font-semibold mb-2">Tamanho:</p>
                <div className="flex flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      
                      onClick={() => handleSizeChange(size)}
                      className={`mr-4 mb-4 px-4 py-2 rounded border ${
                        selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="my-4">
                <p className="font-semibold mb-2">Cor:</p>
                <div className="flex flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`mr-4 mb-4 px-4 py-2 rounded border ${
                        selectedColor === color ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              <button
                disabled
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-4"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
