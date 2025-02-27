import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";
import {
  removeFromCart,
  updateCartItem,
  toggleCartItemCheck,
} from "../store/actions/shoppingCartActions";
import { toast } from "react-toastify";

export default function ShoppingCartPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cart } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.client);

  const calculateSubtotal = () => {
    return cart
      .filter((item) => item.checked)
      .reduce((total, item) => total + item.product.price * item.count, 0);
  };

  const shippingCost = 14.99;
  const discount = 10.0; // Sabit bir indirim tutarı

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + shippingCost - discount;
  };

  const handleQuantityChange = (productId, newCount) => {
    if (newCount >= 1) {
      dispatch(updateCartItem(productId, newCount));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleToggleCheck = (productId) => {
    dispatch(toggleCartItemCheck(productId));
  };

  const handleCreateOrder = () => {
    if (!user) {
      history.push("/login");
      toast.info("Please login to continue");
      return;
    }
    history.push("/create-order");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Table - Now with flex-1 to take remaining space */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={cart.every((item) => item.checked)}
                        onChange={() => {
                          const allChecked = cart.every((item) => item.checked);
                          cart.forEach((item) =>
                            dispatch(
                              toggleCartItemCheck(item.product.id, !allChecked)
                            )
                          );
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map((item) => (
                    <tr key={item.product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleToggleCheck(item.product.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 object-cover rounded"
                            src={item.product.images[0].url}
                            alt={item.product.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product.id,
                                item.count - 1
                              )
                            }
                            disabled={item.count <= 1}
                            className="p-1 rounded border disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.count}</span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product.id,
                                item.count + 1
                              )
                            }
                            className="p-1 rounded border"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${(item.product.price * item.count).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              {/* Summary Items */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    ${shippingCost.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-green-600">
                    -${discount.toFixed(2)}
                  </span>
                </div>

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <div className="text-right">
                      <span className="text-xl font-bold">
                        ${calculateTotal().toFixed(2)}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Including VAT
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Items Count */}
              <div className="text-sm text-gray-600 mb-4">
                Selected Items:{" "}
                {cart
                  .filter((item) => item.checked)
                  .reduce((sum, item) => sum + item.count, 0)}
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCreateOrder}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
