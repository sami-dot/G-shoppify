/* eslint-disable no-unused-vars */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  addProduct,
  getAllProducts,
  deleteProduct,
  createCart,
  getCartHistory,
  getCartHistoryById,
  getTopCategory,
  getTopProduct,
} from "../api";
import { QUERY_KEYS } from "./queryKeys";
// ============================================================
// AUTH QUERIES
// ============================================================
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (formData) => registerUser(formData),
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (formData) => loginUser(formData),
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: () => getCurrentUser(),
  });
};
// ============================================================
// PRODUCT QUERIES
// ============================================================
export const useGetProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
    queryFn: () => getAllProducts(),
  });
};
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => addProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
      });
    },
  });
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
      });
    },
  });
};
// ============================================================
// CART QUERIES
// ============================================================
export const useGetCartHistory = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CART_HISTORY],
    queryFn: () => getCartHistory(),
  });
};

export const useGetCartHistoryById = (cartId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CART_HISTORY, cartId],
    queryFn: () => getCartHistoryById(cartId),
    enabled: !!cartId,
  });
};

export const useCreateCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cartData) => createCart(cartData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CART_HISTORY],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_TOP_CATEGORY],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_TOP_PRODUCT],
      });
    },
  });
};
// ============================================================
// STATISTICS QUERIES
// ============================================================
export const useGetTopProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TOP_PRODUCT],
    queryFn: () => getTopProduct(),
  });
};

export const useGetTopCategory = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TOP_CATEGORY],
    queryFn: () => getTopCategory(),
  });
};
