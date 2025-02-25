import React from 'react';
import { ShoppingBag, Search, Filter, ShoppingCart } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { Card } from '../components/Card';
import { CartDrawer } from '../components/CartDrawer';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useCart } from '../contexts/CartContext';
import { useArtist } from '../hooks/useArtist';
import { containerStyles, buttonStyles, textStyles } from '../styles/common';

export const Shop: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [category, setCategory] = React.useState('all');
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const { merchandise, isLoading, error } = useArtist('default');
  const { state, dispatch } = useCart();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load shop items" />;

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'music', name: 'Music' },
    { id: 'limited', name: 'Limited Edition' },
  ];

  const handleAddToCart = (item: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.name, // Using name as ID for demo
        name: item.name,
        price: item.price,
        image: item.image
      }
    });
    setIsCartOpen(true);
  };

  return (
    <div className={containerStyles.content}>
      <div className="flex items-center justify-between mb-8">
        <SectionTitle icon={ShoppingBag} title="OFFICIAL SHOP" />
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
          {state.itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
              {state.itemCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search merchandise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${textStyles.input} pl-10 w-full`}
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`${
                category === cat.id
                  ? buttonStyles.primary
                  : buttonStyles.secondary
              } px-4 py-2 rounded-full flex items-center gap-2`}
            >
              <Filter className="w-4 h-4" />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {merchandise?.map((item, index) => (
          <Card key={index} className="overflow-hidden group">
            <div className="relative aspect-square">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  New
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{item.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-purple-600">{item.price}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`${buttonStyles.primary} px-4 py-2 rounded-full flex items-center gap-2`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};