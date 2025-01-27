import axios from 'axios';

const API_URL = 'http://lcims-backend-2.onrender.com/api/v1/admin'



export const fetchRoles = async () => {
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await axios.get(`${API_URL}/roles`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token for authorization
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      throw new Error(error.response?.data?.message || 'Error fetching roles');
    } else if (error instanceof Error) {
      console.error('General error:', error.message);
      throw new Error(error.message || 'Error fetching roles');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unknown error occurred while fetching roles');
    }
  }
};


export const createRole = async (roleData: { role_name: string; description: string }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authorization token not found");
    }

    const response = await axios.post(
      `${API_URL}/roles`,
      roleData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error creating role");
  }
};

export const updateRole = async (
  roleId: string,
  roleData: { description: string }
) => {
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication token not found. Please log in.");
    }

    const response = await axios.put(
      `${API_URL}/roles/${roleId}`,
      roleData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error updating role");
  }
};


export const deleteRole = async (roleId: string): Promise<any> => {
  try {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.delete(`${API_URL}/roles/${roleId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    });

    return response.data; // Return the API response data
  } catch (error: any) {
    console.error('Error deleting role:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};




const API_URL_Six = "http://lcims-backend-2.onrender.com/api/v1/tax";



export const fetchTaxBill = async (propertyId: string): Promise<any> => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found in localStorage');
      }
  
      // Make the API request
      const response = await axios.get(`${API_URL_Six}/property/${propertyId}/bill`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });
  
      // Return the response data
      return response.data;
    } catch (error: any) {
      console.error('Error fetching tax bill:', error.response?.data || error.message);
      throw error;
    }
  };


  export const processPropertyPayment = async (propertyId: string, amountPaid: number): Promise<any> => {
    try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Authentication token not found');
        }

        // Make the POST request to process the payment
        const response = await axios.post(
            `${API_URL_Six}/property/${propertyId}/payment`,
            { amount_paid: amountPaid },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data; // Return the response data
    } catch (error) {
        // Assert or narrow the type of error
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            console.error('Axios error:', error.response?.data || error.message);
            throw error.response?.data?.message || 'Failed to process property payment';
        } else {
            // Handle non-Axios errors
            console.error('Unexpected error:', error);
            throw 'An unexpected error occurred. Please try again.';
        }
    }
};


export const getPropertyPaymentHistory = async (propertyId: string): Promise<any> => {
  try {
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
          throw new Error('Authentication token not found');
      }

      // Make the GET request to fetch the payment history
      const response = await axios.get(`/property/${propertyId}/payments`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      return response.data; // Return the payment history
  } catch (error) {
      // Assert or narrow the type of error
      if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data || error.message);
          throw error.response?.data?.message || 'Failed to fetch payment history';
      } else {
          console.error('Unexpected error:', error);
          throw 'An unexpected error occurred. Please try again.';
      }
  }
};



  
  const API_URL_Three = 'http://lcims-backend-2.onrender.com/api/v1/streets';


  export const createStreet = async (streetData: {
    street_name: string;
    zone_code: string;
    description?: string;
  }): Promise<any> => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("Authentication token not found");
      }
  
      // Make the POST request to create a new street
      const response = await axios.post(
        API_URL_Three,
        streetData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error creating street:", error);
      throw error; 
    }
  };



  export const updateStreet = async (
    streetId: string,
    data: {
      street_name?: string;
      zone_code?: string;
      description?: string;
    }
  ) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
  
      const response = await fetch(`${API_URL_Three}/${streetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update street');
      }
  
      const result = await response.json();
      console.log('Street updated successfully:', result);
      return result; // Return the updated street data
    } catch (error) {
      // Check if the error is an instance of Error to access message
      if (error instanceof Error) {
        console.error('Error updating street:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  };
  
  

  export const deleteStreet = async (streetId: number): Promise<any> => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No token found');
      }
  
      // Send the delete request with token authorization
      const response = await axios.delete(
        `${API_URL_Three}/${streetId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
  
    return response.data; // Return the response data from the API

  } catch (error: any) {
    console.error('Error deleting street:', error);
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};



const API_URL_four = 'http://lcims-backend-2.onrender.com/api/v1/categories';

export const fetchCategories = async (page: number = 1, limit: number = 10, search?: string, status?: string, sort_by: string = 'category_name', sort_order: string = 'ASC') => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No token found');
    }

    // Prepare the query parameters
    const params = {
      page,
      limit,
      search,
      status,
      sort_by,
      sort_order
    };

    // Send the GET request with token authorization and query parameters
    const response = await axios.get(API_URL_four, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      params: params, // Attach query params (pagination, filtering, etc.)
    });

    // Handle the response (categories data)
    return response.data;
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};


export const createCategory = async (data: { category_name: string; description?: string }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.post(`${API_URL_four}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // API response, including the created category
  } catch (error: any) {
    console.error('Error creating category:', error.response?.data || error.message);
    throw error.response?.data || { message: 'An error occurred while creating the category' };
  }
};

export const updateCategory = async (categoryId: number, categoryData: Record<string, any>) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Set up headers with the token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make the PUT request
    const response = await axios.put(
      `${API_URL_four}/${categoryId}`,
      categoryData,
      { headers }
    );

    return response.data; // Return the response data
  } catch (error: any) {
    console.error('Error updating category:', error.response || error.message);
    throw error.response?.data || error.message;
  }
};



export const deleteCategory = async (categoryId: number): Promise<any> => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No token found');
    }

    // Send the delete request with token authorization
    const response = await axios.delete(
      `${API_URL_four}/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Return the response data from the API

  } catch (error: any) {
    console.error('Error deleting category:', error);
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};