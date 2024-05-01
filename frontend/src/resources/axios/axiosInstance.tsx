"use client";

import axiosProvider from "./axios";

const axiosInstance = axiosProvider;

const tratarCausaMessageErroHttp = (error: any) => {
  console.log(",myeraror", error);
  const objetoErro = error?.response?.data;
  var mensagemTratada: any = "";
  error.type = "ERROR";
  if (objetoErro?.message !== undefined) {
    mensagemTratada = objetoErro?.message;
    error.type = "ALERT";
  }
  error.message = mensagemTratada;
  error.cause = error?.cause;
  return error;
};

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      return (window.location.href = "/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
