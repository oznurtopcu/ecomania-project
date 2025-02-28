import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { api } from "../api/axios";
import { toast } from "react-toastify";
import cities from "../cities";
import {
  fetchAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../store/actions/clientActions";
import { useForm } from "react-hook-form";

// Boş form state'i için initial değer
const initialFormState = {
  title: "",
  name: "",
  surname: "",
  phone: "",
  city: "",
  district: "",
  neighborhood: "",
};

// Boş kredi kartı form state'i için initial değer
const initialCardState = {
  card_no: "",
  expire_month: "",
  expire_year: "",
  name_on_card: "",
};

export default function CreateOrderPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, addressList } = useSelector((state) => state.client);
  const { cart } = useSelector((state) => state.shoppingCart);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const { creditCards } = useSelector((state) => state.client);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormState,
    mode: "onBlur",
  });

  const {
    register: registerCard,
    handleSubmit: handleSubmitCard,
    reset: resetCard,
    setValue: setCardValue,
    formState: { errors: cardErrors },
  } = useForm({
    defaultValues: initialCardState,
    mode: "onBlur",
  });

  // Form resetleme ve edit için kullanılacak
  const resetFormWithData = (data = initialFormState) => {
    Object.keys(data).forEach((key) => {
      setValue(key, data[key]);
    });
  };

  useEffect(() => {
    if (!user?.name) {
      history.push("/login");
      return;
    }
    dispatch(fetchAddresses());
  }, [dispatch, user, history]);

  //edit işlemi tamamlandıktan sonra form alanı sıfırlanır
  useEffect(() => {
    if (editingAddress) {
      resetFormWithData(editingAddress);
    }
  }, [editingAddress]);

  // Form handlers
  const onSubmitAddress = (data) => {
    if (editingAddress) {
      dispatch(updateAddress({ ...data, id: editingAddress.id })).then(
        (success) => {
          if (success) {
            toast.success("Address updated successfully");
            setEditingAddress(null);
            setShowAddressForm(false);
            reset();
          } else {
            toast.error("Address could not be updated");
          }
        }
      );
    } else {
      dispatch(addAddress(data)).then((success) => {
        if (success) {
          toast.success("Address added successfully");
          setShowAddressForm(false);
          reset();
        } else {
          toast.error("Address could not be added");
        }
      });
    }
  };

  const handleDeleteAddress = (addressId) => {
    dispatch(deleteAddress(addressId)).then((success) => {
      if (success) {
        toast.success("Address deleted successfully");
      } else {
        toast.error("Address could not be deleted");
      }
    });
  };

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
                      resetFormWithData(); // Form state'ini sıfırla
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Add New Address
                  </button>
                </div>

                <div className="space-y-4">
                  {addressList.map((address) => (
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
                              resetFormWithData(address);
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
                  <form onSubmit={handleSubmit(onSubmitAddress)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Address Title"
                          {...register("title", {
                            required: "Title is required",
                            minLength: {
                              value: 3,
                              message: "Title must be at least 3 characters",
                            },
                          })}
                          className="p-2 border rounded w-full"
                        />
                        {errors.title && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.title.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Name"
                          {...register("name", {
                            required: "Name is required",
                            pattern: {
                              value: /^[A-Za-z\s]+$/,
                              message: "Please enter a valid name",
                            },
                          })}
                          className="p-2 border rounded w-full"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Surname"
                          {...register("surname", {
                            required: "Surname is required",
                            pattern: {
                              value: /^[A-Za-z\s]+$/,
                              message: "Please enter a valid surname",
                            },
                          })}
                          className="p-2 border rounded w-full"
                        />
                        {errors.surname && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.surname.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <input
                          type="tel"
                          placeholder="Phone"
                          {...register("phone", {
                            required: "Phone is required",
                            pattern: {
                              value: /^[0-9]{10,11}$/,
                              message: "Please enter a valid phone number",
                            },
                          })}
                          className="p-2 border rounded w-full"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <select
                          {...register("city", {
                            required: "City is required",
                          })}
                          className="p-2 border rounded w-full"
                        >
                          <option value="">Select City</option>
                          {cities.map((city) => (
                            <option key={city} value={city.toLowerCase()}>
                              {city}
                            </option>
                          ))}
                        </select>
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="District"
                          {...register("district", {
                            required: "District is required",
                          })}
                          className="p-2 border rounded w-full"
                        />
                        {errors.district && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.district.message}
                          </p>
                        )}
                      </div>

                      <div className="col-span-2">
                        <textarea
                          placeholder="Neighborhood"
                          {...register("neighborhood", {
                            required: "Address details are required",
                          })}
                          className="p-2 border rounded w-full"
                          rows="3"
                        />
                        {errors.neighborhood && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.neighborhood.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddress(null);
                          reset();
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
