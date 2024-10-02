import baseURL from "./apiSlugs";

const apiService = {
  get: async (url: string, public_key = "") => {
    try {
      const response = await fetch(baseURL + url, {
        headers: {
          "Content-Type": "application/json",
          public_key: public_key,
          // Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        return 401;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  postFormData: async (url: string, formdata: any, public_key = "") => {
    try {
      const response = await fetch(baseURL + url, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          public_key: public_key,
          // Authorization: `Bearer ${token}`,
        },
        body: formdata,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  },
  getFormData: async (url: string, payload: any) => {
    try {
      const response = await fetch(baseURL + url, {
        method: "GET",
        body: payload,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  post: async (url: string, payload: any, public_key = "") => {
    try {
      const response = await fetch(baseURL + url, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          public_key: public_key,
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  },
  delete: async (url: string, public_key = "") => {
    try {
      const response = await fetch(baseURL + url, {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          public_key: public_key,
          // Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error Deleting data:", error);
      throw error;
    }
  },
  put: async (url: string, payload: any, public_key = "") => {
    try {
      const response = await fetch(baseURL + url, {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          public_key: public_key,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  },
  putFormData: async (url: string, formdata: any, public_key = "") => {
    try {
      const response = await fetch(baseURL + url, {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          // "Content-Type": "x-www-form-urlencoded",
          public_key: public_key,
        },
        body: formdata,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  },
};
export default apiService;
