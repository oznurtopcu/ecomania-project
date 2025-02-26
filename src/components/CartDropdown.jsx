import React from "react";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItem,
} from "../store/actions/shoppingCartActions";
import { useHistory } from "react-router-dom";

export default function CartDropdown({ isOpen, onClose }) {
  const dispatch = useDispatch();
  let history = useHistory();
  const { cart } = useSelector((state) => state.shoppingCart);

  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.count,
    0
  );

  const handleGoToCart = () => {
    history.push("/cart");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-[350px] bg-white rounded-lg shadow-xl z-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-semibold">Cart ({totalItems})</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center py-6">
            <ShoppingBag className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-sm">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="max-h-80 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 py-3 border-b"
                >
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      ${item.product.price} x {item.count}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-0.5 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() =>
                        dispatch(
                          updateCartItem(item.product.id, item.count - 1)
                        )
                      }
                      disabled={item.count <= 1}
                    >
                      -
                    </button>
                    <span className="text-sm w-5 text-center">
                      {item.count}
                    </span>
                    <button
                      className="px-2 py-0.5 text-sm border rounded"
                      onClick={() =>
                        dispatch(
                          updateCartItem(item.product.id, item.count + 1)
                        )
                      }
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="text-red-500 ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t">
              <div className="flex justify-between mb-3">
                <span className="text-base font-medium">Total:</span>
                <span className="text-base font-medium">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleGoToCart}
                className="w-full bg-blue-500 text-white py-2 text-base rounded hover:bg-blue-600"
              >
                Go To Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
