import { apiClient } from "./api";
import { BASE_URL, GET_METHOD, TRANSFER_EARNING, USER_SUBSCRIPTION_LIST } from "./url";

export const getUserSubscriptionList = (query) => {
  return apiClient({
    baseURL: BASE_URL,
    method: GET_METHOD,
    url: `${USER_SUBSCRIPTION_LIST}${query ? query : ""}`,
  });
};


export const transferCommissionAdvisor = (query) => {
  return apiClient({
    baseURL: BASE_URL,
    method: GET_METHOD,
    url: `${TRANSFER_EARNING}${query ? query : ""}`,
  });
};





