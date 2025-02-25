import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, ExternalLink } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { buttonStyles } from '../styles/common';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleRevolutCheckout = () => {
    setIsProcessing(true);
    try {
      // Open Revolut payment link in a new tab
      window.open('https://revolut.me/shadrak6yu', '_blank');
      // Clear cart after opening payment link
      dispatch({ type: 'CLEAR_CART' });
      onClose();
    } catch (error) {
      console.error('Payment redirect failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-50 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white dark:bg-gray-900 shadow-xl 
          transform transition-transform duration-300 z-50 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm">
                  {state.itemCount}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-purple-600 font-bold">{item.price}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-600 p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium">Total</span>
              <span className="text-2xl font-bold">€{state.total.toFixed(2)}</span>
            </div>
            
            {state.items.length > 0 && (
              <div className="space-y-4">
                {/* Temporary Payment Notice */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    ⚠️ We are temporarily using Revolut for payments. You will be redirected to complete your payment.
                  </p>
                </div>

                {/* Revolut Payment Button */}
                <button
                  onClick={handleRevolutCheckout}
                  disabled={isProcessing}
                  className={`${buttonStyles.primary} w-full py-3 rounded-lg flex items-center justify-center gap-2`}
                >
                  <ExternalLink className="w-5 h-5" />
                  Pay with Revolut
                </button>

                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  <p>After payment, please include your order number in the payment reference</p>
                  <p>All transactions are processed securely by Revolut</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};