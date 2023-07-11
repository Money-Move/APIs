import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { get } from 'lodash';

const HandleResponseError = (
  error: AxiosError,
  route: string,
  method: string,
) => {
  console.log({
    route,
    method,
    error: error.toString(),
  });
};

class AxiosRestService {
  async get<T>(route: string, configs?: AxiosRequestConfig): Promise<T> {
    return axios
      .get(route, configs)
      .then((data) => get(data, 'data'))
      .catch((error: AxiosError) => HandleResponseError(error, route, 'GET'));
  }

  async post<P, R>(
    route: string,
    payload?: P,
    configs?: AxiosRequestConfig,
  ): Promise<R> {
    return axios
      .post(route, payload, configs)
      .then((data) => get(data, 'data'))
      .catch((error: AxiosError) => HandleResponseError(error, route, 'POST'));
  }

  async patch<P, R>(
    route: string,
    payload?: P,
    configs?: AxiosRequestConfig,
  ): Promise<R> {
    return axios
      .patch(route, payload, configs)
      .then((data) => get(data, 'data'))
      .catch((error: AxiosError) => HandleResponseError(error, route, 'PATCH'));
  }

  async put<P, R>(
    route: string,
    payload?: P,
    configs?: AxiosRequestConfig,
  ): Promise<R> {
    return axios
      .put(route, payload, configs)
      .then((data) => get(data, 'data'))
      .catch((error: AxiosError) => HandleResponseError(error, route, 'PUT'));
  }

  async delete<R>(route: string, configs?: AxiosRequestConfig): Promise<R> {
    return axios
      .delete(route, configs)
      .then((data) => get(data, 'data'))
      .catch((error: AxiosError) =>
        HandleResponseError(error, route, 'DELETE'),
      );
  }
}

export const AxiosService = new AxiosRestService();
