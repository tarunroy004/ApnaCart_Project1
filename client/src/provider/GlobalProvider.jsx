import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";

// ------------------------------
// FIXED CONTEXT DECLARATION (NO EXPORT HERE)
// ------------------------------
const GlobalContext = createContext(null);

// Hook can be exported safely
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state?.user);

  // ------------------------------
  // FETCH CART ITEMS
  // ------------------------------
  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------------------
  // UPDATE CART ITEM
  // ------------------------------
  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: { _id: id, qty },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        fetchCartItem();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  // ------------------------------
  // DELETE CART ITEM
  // ------------------------------
  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: { _id: cartId },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // ------------------------------
  // CALCULATE TOTALS
  // ------------------------------
  useEffect(() => {
    const qty = cartItem.reduce((pre, curr) => pre + curr.quantity, 0);
    setTotalQty(qty);

    const tPrice = cartItem.reduce((pre, curr) => {
      const priceAfterDiscount = pricewithDiscount(
        curr?.productId?.price,
        curr?.productId?.discount
      );
      return pre + priceAfterDiscount * curr.quantity;
    }, 0);
    setTotalPrice(tPrice);

    const notDiscountPrice = cartItem.reduce(
      (pre, curr) => pre + curr?.productId?.price * curr.quantity,
      0
    );
    setNotDiscountTotalPrice(notDiscountPrice);
  }, [cartItem]);

  // ------------------------------
  // LOGOUT
  // ------------------------------
  const handleLogoutOut = () => {
    localStorage.clear();
    dispatch(handleAddItemCart([]));
  };

  // ------------------------------
  // FETCH ADDRESS
  // ------------------------------
  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAddress,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data));
      }
    } catch (error) {}
  };

  // ------------------------------
  // FETCH ORDER HISTORY
  // ------------------------------
  const fetchOrder = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getOrderItems,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setOrder(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------------------
  // INITIAL FETCH ON LOGIN OR USER CHANGE
  // ------------------------------
  useEffect(() => {
    fetchCartItem();
    fetchAddress();
    fetchOrder();
  }, [user]);

  // ------------------------------
  // PROVIDER VALUE
  // ------------------------------
  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        totalPrice,
        totalQty,
        notDiscountTotalPrice,
        fetchOrder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
