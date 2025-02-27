import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { api } from "../api/axios";
import { toast } from "react-toastify";

// Boş form state'i için initial değer
const initialFormState = {
  title: "",
  name: "",
  surname: "",
  phone: "",
  city: "",
  district: "",
  neighborhood: "",
  address: "",
};

export default function CreateOrderPage() {
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: Adres, 2: Ödeme
  const history = useHistory();
  const { user } = useSelector((state) => state.client);
  const { cart } = useSelector((state) => state.shoppingCart);

  // Sepet hesaplamaları
  const calculateSubtotal = () => {
    return cart
      .filter((item) => item.checked)
      .reduce((total, item) => total + item.product.price * item.count, 0);
  };

  const shippingCost = 14.99;
  const discount = 10.0;

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + shippingCost - discount;
  };

  // Form state'i
  const [formData, setFormData] = useState(initialFormState);

  // Kullanıcı kontrolü ve adres getirme
  useEffect(() => {
    if (!user?.name) {
      history.push("/login");
      return;
    }
    fetchAddresses();
  }, [user, history]);

  // Adresleri getir
  const fetchAddresses = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await api.get("/user/address", {
        headers: { Authorization: token },
      });
      setAddresses(response.data);
    } catch (error) {
      toast.error("Addresses could not be loaded");
    }
  };

  // Yeni adres ekle
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await api.post("/user/address", formData, {
        headers: { Authorization: token },
      });
      toast.success("Address added successfully");
      fetchAddresses();
      setShowAddressForm(false);
      setFormData(initialFormState);
    } catch (error) {
      toast.error("Address could not be added");
    }
  };

  // Adres güncelle
  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await api.put(
        "/user/address",
        { ...formData, id: editingAddress.id },
        {
          headers: { Authorization: token },
        }
      );
      toast.success("Address updated successfully");
      fetchAddresses();
      setEditingAddress(null);
      setShowAddressForm(false);
    } catch (error) {
      toast.error("Address could not be updated");
    }
  };

  // Adres sil
  const handleDeleteAddress = async (addressId) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await api.delete(`/user/address/${addressId}`, {
        headers: { Authorization: token },
      });
      toast.success("Address deleted successfully");
      fetchAddresses();
    } catch (error) {
      toast.error("Address could not be deleted");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sol Taraf - Adres ve Ödeme Bölümü */}
        <div className="flex-1">
          {/* Adımlar */}
          <div className="mb-8">
            <div className="flex items-center">
              <div
                className={`flex-1 ${
                  currentStep === 1
                    ? "text-blue-600 font-bold"
                    : "text-gray-400"
                }`}
              >
                1. Delivery Address
              </div>
              <div
                className={`flex-1 ${
                  currentStep === 2
                    ? "text-blue-600 font-bold"
                    : "text-gray-400"
                }`}
              >
                2. Payment
              </div>
            </div>
          </div>

          {currentStep === 1 && (
            <>
              {/* Kayıtlı Adresler */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Saved Addresses</h2>
                  <button
                    onClick={() => {
                      setShowAddressForm(true);
                      setEditingAddress(null);
                      setFormData(initialFormState); // Form state'ini sıfırla
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Add New Address
                  </button>
                </div>

                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{address.title}</h3>
                          <p className="text-sm text-gray-600">
                            {address.name} {address.surname}
                          </p>
                          <p className="text-sm text-gray-600">
                            {address.phone}
                          </p>
                          <p className="text-sm text-gray-600">
                            {address.neighborhood}, {address.district},{" "}
                            {address.city}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingAddress(address);
                              setShowAddressForm(true);
                              setFormData(address);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="deliveryAddress"
                            checked={selectedDeliveryAddress?.id === address.id}
                            onChange={() => setSelectedDeliveryAddress(address)}
                          />
                          Use as Delivery Address
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="billingAddress"
                            checked={selectedBillingAddress?.id === address.id}
                            onChange={() => setSelectedBillingAddress(address)}
                          />
                          Use as Billing Address
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Adres Formu */}
              {showAddressForm && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </h2>
                  <form
                    onSubmit={
                      editingAddress ? handleUpdateAddress : handleAddAddress
                    }
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Address Title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="p-2 border rounded"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="p-2 border rounded"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Surname"
                        value={formData.surname}
                        onChange={(e) =>
                          setFormData({ ...formData, surname: e.target.value })
                        }
                        className="p-2 border rounded"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="p-2 border rounded"
                        required
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="p-2 border rounded"
                        required
                      />
                      <input
                        type="text"
                        placeholder="District"
                        value={formData.district}
                        onChange={(e) =>
                          setFormData({ ...formData, district: e.target.value })
                        }
                        className="p-2 border rounded"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Neighborhood"
                        value={formData.neighborhood}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            neighborhood: e.target.value,
                          })
                        }
                        className="p-2 border rounded"
                        required
                      />
                      <textarea
                        placeholder="Address Details"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="p-2 border rounded col-span-2"
                        rows="3"
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddress(null);
                        }}
                        className="px-4 py-2 border rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                      >
                        {editingAddress ? "Update" : "Save"} Address
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* İleri Butonu */}
              <div className="mt-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedDeliveryAddress || !selectedBillingAddress}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:bg-gray-400"
                >
                  Continue to Payment
                </button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              {/* Ödeme seçenekleri buraya eklenecek */}
              <button
                onClick={() => setCurrentStep(1)}
                className="mt-4 px-4 py-2 border rounded"
              >
                Back to Addresses
              </button>
            </div>
          )}
        </div>

        {/* Sağ Taraf - Sipariş Özeti */}
        <div className="lg:w-80">
          <div className="bg-white rounded-lg shadow p-6 sticky top-8">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ${calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${shippingCost.toFixed(2)}</span>
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
                    <p className="text-xs text-gray-500 mt-1">Including VAT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
