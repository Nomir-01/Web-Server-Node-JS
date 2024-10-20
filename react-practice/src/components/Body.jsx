import React, { useState } from "react";

export default function Body({ onAddToCart }) {
  const products = [
    {
      id: 1,
      title: "Wireless Earbuds",
      price: "49.99",
      category: "Electronics",
      description:
        "High-quality wireless earbuds with noise cancellation and long battery life.",
      quantity: 15,
      inStock: true,
      image:
        "https://w1.pngwing.com/pngs/307/580/png-transparent-tv-led-tv-smart-tv-sony-we665-television-lcd-television-samsung-j5200-inch-thumbnail.png",
    },
    {
      id: 2,
      title: "Fitness Tracker",
      price: "29.99",
      category: "Wearable Tech",
      description:
        "Track your daily activities, heart rate, and sleep with this lightweight fitness tracker.",
      quantity: 0,
      inStock: false,
    },
    {
      id: 3,
      title: "Gaming Laptop",
      price: "1299.99",
      category: "Computers",
      description:
        "Powerful gaming laptop with a high refresh rate display and the latest GPU technology.",
      quantity: 5,
      inStock: true,
    },
    {
      id: 4,
      title: "Smartwatch",
      price: "199.99",
      category: "Wearable Tech",
      description:
        "Stay connected on the go with this stylish smartwatch featuring GPS and heart-rate monitoring.",
      quantity: 8,
      inStock: true,
    },
    {
      id: 5,
      title: "4K Ultra HD TV",
      price: "899.99",
      category: "Home Entertainment",
      description:
        "Experience stunning visuals with this 55-inch 4K Ultra HD Smart TV with built-in streaming apps.",
      quantity: 2,
      inStock: true,
    },
    {
      id: 6,
      title: "Bluetooth Speaker",
      price: "39.99",
      category: "Audio",
      description:
        "Portable Bluetooth speaker with deep bass and a 12-hour battery life for on-the-go listening.",
      quantity: 0,
      inStock: false,
    },
    {
      id: 7,
      title: "Electric Toothbrush",
      price: "24.99",
      category: "Health & Personal Care",
      description:
        "Rechargeable electric toothbrush with multiple cleaning modes and a two-minute timer.",
      quantity: 10,
      inStock: true,
    },
    {
      id: 8,
      title: "Digital Camera",
      price: "499.99",
      category: "Photography",
      description:
        "Compact digital camera with 20MP sensor and 4K video recording capabilities.",
      quantity: 3,
      inStock: true,
    },
    {
      id: 9,
      title: "Robot Vacuum Cleaner",
      price: "149.99",
      category: "Home Appliances",
      description:
        "Automatic robot vacuum cleaner with smart mapping technology and app control.",
      quantity: 7,
      inStock: true,
    },
    {
      id: 10,
      title: "Air Fryer",
      price: "89.99",
      category: "Kitchen Appliances",
      description:
        "Cook healthier meals with this easy-to-use air fryer, featuring rapid air circulation technology.",
      quantity: 0,
      inStock: false,
    },
  ];

  return (
    <main className="flex-grow container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </main>
  );
}

function ProductCard({ product, onAddToCart }) {
  const [button, setButton] = useState({
    buttonColor: "bg-gray-300",
    buttonText: "text-gray-500",
  });
  const handleMouseEnter = () => {
    setButton({
      buttonColor: "bg-blue-600",
      buttonText: "text-white",
    });
  };

  const handleMouseLeave = () => {
    setButton({
      buttonColor: "bg-gray-300",
      buttonText: "text-gray-500",
    });
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover mb-4 rounded"
      />
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-2">
        Price: ${parseFloat(product.price).toFixed(2)}
      </p>
      <p className="text-gray-600 mb-2">Category: {product.category}</p>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-gray-600 mb-2">Quantity: {product.quantity}</p>
      <p
        className={`font-semibold ${
          product.inStock ? "text-green-600" : "text-red-600"
        }`}
      >
        {product.inStock ? "In Stock" : "Out of Stock"}
      </p>
      <button
        className={`w-full py-2 px-4 rounded ${
          product.inStock
            ? `${button.buttonColor} ${button.buttonText}`
            : `${button.buttonColor} text-gray-500 cursor-not-allowed`
        } transition-colors duration-200`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onAddToCart}
        disabled={!product.inStock}
      >
        Add to Cart
      </button>
    </div>
  );
}
