import axios from "axios";

// const apiEndpoint = 'http://localhost:5005/v1/';

//dev
// const apiEndpoint = "http://api.pps-dev.czrml.com/v1/";
// preProd
const apiEndpoint = "http://api.pps-pprd.czrml.com/v1/";

// const apiEndpoint = "http://34.48.15.58:8080/v1/";
// const apiEndpoint = 'http://35.221.18.232/v1/';

const axiosInstance = axios.create({
  baseURL: apiEndpoint,
});

const get = async (path: any, params = {}, headers = {}) => {
  const Authorization = localStorage.getItem("sessionToken");
  try {
    const response = await axiosInstance.get(path, {
      params: params,
      headers: { ...headers, Authorization },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const post = async (path: any, data: any = null, headers: any = {}) => {
  const Authorization = localStorage.getItem("sessionToken");
  try {
    const response = await axiosInstance.post(path, data, {
      headers: { ...headers, Authorization },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const put = async (path: any, data: any = null, headers = {}) => {
  const Authorization = localStorage.getItem("sessionToken");

  try {
    const response = await axiosInstance.put(path, data, {
      headers: { ...headers, Authorization },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const patch = async (path: any, data: any = null, headers = {}) => {
  const Authorization = localStorage.getItem("sessionToken");
  try {
    const response = await axiosInstance.patch(path, data, {
      headers: { ...headers, Authorization },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const del = async (path: any, data: any = null, headers = {}) => {
  const Authorization = localStorage.getItem("sessionToken");
  try {
    const response = await axiosInstance.delete(path, {
      headers: { ...headers, Authorization },
      data: data,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export { get, post, put, patch, del };
