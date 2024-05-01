import { getAuth } from "../auth";


export interface RequestBuildArguments{
  headers?: any,
  method: string,
  path: string,
  body?: any,
  params?: any,
}

export async function buildRequest({...data}:RequestBuildArguments) {
  return {
    method: data.method,
    url: process.env.NEXT_PUBLIC_APP_URLAPI + data?.path,
    headers: data.headers,
    data: JSON.stringify(data?.body || ""),
  };
}

export async function buildRequestAuth({params, headers, ...data}:RequestBuildArguments) {
  const headersAuth = {
    "Authorization": `${getAuth()?.token}`,
    "Content-Type": "application/json",
  };
  const options = {
    method: data.method,
    url: process.env.NEXT_PUBLIC_APP_URLAPI + data?.path,
    headers: {...headersAuth, headers},
    params: {...params},
    data: JSON.stringify(data?.body || ""),
  };
  return options;
}
