import axios from 'axios';

const API_URL = 'https://lcims-backend.onrender.com/api/v1/admin';

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

