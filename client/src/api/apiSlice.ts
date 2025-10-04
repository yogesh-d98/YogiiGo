import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/url';
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Product', 'Cart', 'Order'],
  endpoints: (builder) => ({
    getProducts: builder.query<any[], void>({
      query: () => '/products',
      providesTags: ['Product'],
    }),
    addToCart: builder.mutation({
      query: (payload) => ({ url: '/cart', method: 'POST', body: payload }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const { useGetProductsQuery, useAddToCartMutation } = apiSlice;
