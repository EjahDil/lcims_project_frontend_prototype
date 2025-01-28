import axios from 'axios';
import { Property } from '../tables/propertiesTable';

const API_URL = 'https://lcims-backend-2.onrender.com/api/v1/admin';

export const fetchUsers = async (params: Record<string, any>) => {
  try {
    // Retrieve the token from localStorage (or another secure storage method)
    const token = localStorage.getItem('token'); // Adjust this based on your token storage method

    const response = await axios.get(`${API_URL}/users`, {
      params, // Attach query parameters
      headers: {
        Authorization: `Bearer ${token}`, // Include the authorization token
      },
    });

    return response.data; // This includes total, page, limit, and data
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Throw error to handle it in the calling code
  }
};


// Function to create a new user
export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
  role: string;
  digital_address?: string;
}) => {
  try {
    // Retrieve the token from localStorage or other secure storage
    const token = localStorage.getItem('token'); // Adjust based on your token storage method

    if (!token) {
      throw new Error('No authentication token found');
    }

    // Make the POST request to create the user
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the auth token in headers
        'Content-Type': 'application/json', // Set the content type
      },
    });

    return response.data; // Return the created user data from the response

  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Rethrow the error so it can be handled by the calling code
  }
};


// Function to update a user
export const updateUser = async (
  userId: string,
  updateData: {
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    status?: string;
    digital_address?: string;
  }
) => {
  try {
    // Retrieve the token from localStorage or other secure storage
    const token = localStorage.getItem('token'); // Adjust based on your token storage method

    if (!token) {
      throw new Error('No authentication token found');
    }

    // Make the PUT request to update the user
    const response = await axios.put(`${API_URL}/users/${userId}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the auth token in headers
        'Content-Type': 'application/json', // Set the content type
      },
    });

    return response.data; // Return the updated user data from the response

  } catch (error) {
    console.error('Error updating user:', error);
    throw error; // Rethrow the error so it can be handled by the calling code
  }
};

// Function to delete (deactivate) a user
export const deleteUser = async (userId: string) => {
  try {
    // Retrieve the token from localStorage or other secure storage
    const token = localStorage.getItem('token'); // Adjust based on your token storage method

    if (!token) {
      throw new Error('No authentication token found');
    }

    // Make the DELETE request to deactivate the user
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the auth token in headers
      },
    });

    return response.data; // Return the response data from the API
  } catch (error) {
    console.error('Error deactivating user:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};


const API_URL_One = 'https://lcims-backend-2.onrender.com/api/v1/properties';

// Fetch properties with advanced filtering, sorting, and pagination
export const fetchProperties = async (params: Record<string, any>): Promise<{ total: number; data: Property[] }> => {
  try {
    // Retrieve the token from localStorage (or another secure storage method)
    const token = localStorage.getItem('token'); // Adjust this based on your token storage method

    const response = await axios.get(`${API_URL_One}`, {
      params, 
      headers: {
        Authorization: `Bearer ${token}`, // Include the authorization token
      },
    });

    return response.data; // Includes total, page, limit, and data
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error; // Throw error to handle it in the calling code
  }
}

export const fetchPropertyDetails = async (propertyId: string): Promise<any> => {
  try {
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    // Make the API request with the token in the Authorization header
    const response = await axios.get(`${API_URL_One}/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the header
      },
    });

    return response.data; // Return the property details
  } catch (err: any) {
    throw new Error(err.message || 'Failed to fetch property details');
  }
};


// Create a new property
export const createProperty = async (propertyData: {
  street_name: string;
  zone_code?: string;
  category_name: string;
  house_number: string;
  latitude?: number;
  longitude?: number;
  total_area?: number;
  owner_details?: {
    full_name: string;
    contact_number: string;
    email?: string;
    identification_type?: string;
    identification_number?: string;
  };
}): Promise<{ message: string; property: Property }> => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found. Please log in again.');
    }

    const response = await axios.post(
      `${API_URL_One}`, 
      propertyData, 
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the authorization token
          'Content-Type': 'application/json', // Specify JSON content type
        },
      }
    );

    return response.data; // Returns success message and property details
  } catch (error) {
    console.error('Error creating property:', error);
    throw error; // Throw error to handle it in the calling code
  }
};




// Define the expected shape of property data if possible
interface PropertyData {
  street_name?: string;
  zone_code?: string;
  category_name?: string;
  house_number?: string;
  latitude?: number;
  longitude?: number;
  total_area?: number;
  status?: string;
  owner_details?: {
    full_name: string;
    contact_number: string;
    email: string;
    identification_type: string;
    identification_number: string;
  };
}

export const updateProperty = async (
  propertyId: string,
  propertyData: PropertyData
): Promise<any> => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    // Make the API request
    const response = await axios.put(
      `${API_URL_One}/${propertyId}`,
      propertyData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data; // Return the response data
  } catch (error) {
    // Narrow the type of error
    if (axios.isAxiosError(error)) {
      console.error('Error updating property:', error.response?.data || error.message);
      throw error.response?.data || { message: error.message };
    } else {
      console.error('Unexpected error:', error);
      throw { message: 'An unexpected error occurred' };
    }
  }
};



// Function to delete a property
export const deleteProperty = async (propertyId: string | number): Promise<any> => {
  try {
    
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    // Send DELETE request
    const response = await axios.delete(`${API_URL_One}/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error; 
  }
};





const API_URL_Three = 'https://lcims-backend-2.onrender.com/api/v1/streets';

interface Street {
  street_id: number;
  street_name: string;
  zone_code: string;
  description?: string;
  created_at: string;
  updated_at: string;
  property_count: number;
  house_numbers: string[];
}

interface FetchStreetsResponse {
  total: number;
  page: number;
  limit: number;
  data: Street[];
}

export const fetchStreets = async (params: Record<string, any>): Promise<FetchStreetsResponse> => {
  try {
    // Retrieve the token from localStorage (or another secure storage method)
    const token = localStorage.getItem('token'); // Adjust this based on your token storage method

    // Send a GET request to the API with query parameters and authorization header
    const response = await axios.get<FetchStreetsResponse>(API_URL_Three, {
      params,
      headers: {
        Authorization: `Bearer ${token}`, // Include the authorization token
      },
    });

    return response.data; // Parsed response with total count, current page, and data
  } catch (error: any) {
    console.error('Error fetching streets:', error.response?.data || error.message);
    throw error; // Re-throw the error to handle in calling code
  }
};


const API_URL_four = 'https://lcims-backend-2.onrender.com/api/v1/categories';

interface Category {
  category_id: string;
  category_name: string;
  description?: string;
  status: string;
  created_at: string;
  updated_at: string;
  property_count: number;
  current_rate: number;
}

interface FetchCategoriesResponse {
  total: number;
  page: number;
  limit: number;
  data: Category[];
}

// export const fetchCategories = async (params: Record<string, any>): Promise<FetchCategoriesResponse> => {
//   try {
//     // Retrieve the token from localStorage (or another secure storage method)
//     const token = localStorage.getItem('token'); // Adjust this based on your token storage method

//     // Send a GET request to the API with query parameters and authorization header
//     const response = await axios.get<FetchCategoriesResponse>(API_URL_four, {
//       params,
//       headers: {
//         Authorization: `Bearer ${token}`, // Include the authorization token
//       },
//     });

//     return response.data; // Return the API response
//   } catch (error: any) {
//     console.error('Error fetching categories:', error.response?.data || error.message);
//     throw error; // Re-throw the error to handle in calling code
//   }
// }

export const fetchCategories = async (params: Record<string, any> = {}): Promise<FetchCategoriesResponse> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<FetchCategoriesResponse>(API_URL_four, {
      params, // Use default empty object if none is provided
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error fetching categories:', error.response?.data || error.message);
    throw error;
  }
};


const API_URL_five = "https://lcims-backend-2.onrender.com/api/v1/tax";

// Fetch all category rates
export const fetchCategoryRates = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await axios.get(`${API_URL_five}/rates`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching category rates:", error);
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};




export interface CategoryRateData {
  rate_id: number;
  fixed_amount: number;
  effective_date: string;
  end_date: string;
  status: string;
  category_name: string;
  created_by_user: string;
}

export const updateCategoryRate = async (
  categoryId: number,
  data: CategoryRateData
): Promise<any> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const response = await axios.put(`${API_URL_five}/rates/${categoryId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating category rate:', error);
    throw error;
  }
};
