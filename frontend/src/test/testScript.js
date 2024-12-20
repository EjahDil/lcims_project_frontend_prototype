 // Ensure jwt-decode is installed
import { isTokenExpired } from '../contexts/permContext';

const testIsTokenExpired = () => {
  // const expiredToken = 'YOUR_EXPIRED_JWT_TOKEN_HERE'; // Replace with an expired token
  const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Im1pY2hlbCIsImVtYWlsIjoibWljaGVsQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwicGVybWlzc2lvbnMiOlsiY2F0ZWdvcmllczpjcmVhdGUiLCJjYXRlZ29yaWVzOmRlbGV0ZSIsImNhdGVnb3JpZXM6cmVhZCIsImNhdGVnb3JpZXM6dXBkYXRlIiwicHJvcGVydGllczpjcmVhdGUiLCJwcm9wZXJ0aWVzOmRlbGV0ZSIsInByb3BlcnRpZXM6cmVhZCIsInByb3BlcnRpZXM6dXBkYXRlIiwicm9sZXM6Y3JlYXRlIiwicm9sZXM6ZGVsZXRlIiwicm9sZXM6cmVhZCIsInJvbGVzOnVwZGF0ZSIsInN0cmVldHM6Y3JlYXRlIiwic3RyZWV0czpkZWxldGUiLCJzdHJlZXRzOnJlYWQiLCJzdHJlZXRzOnVwZGF0ZSIsInVzZXJzOmNyZWF0ZSIsInVzZXJzOmRlbGV0ZSIsInVzZXJzOnJlYWQiLCJ1c2Vyczp1cGRhdGUiXSwiaWF0IjoxNzMxOTE0MjUzLCJleHAiOjE3MzIwMDA2NTN9.OI-hlbxsqgF3hob1UGdtJqIFJElZzt_CSt6Rv_wRUwo";

//   console.log("Testing with expired token...");
//   const isExpired = isTokenExpired(expiredToken);
//   console.log("Is expired token expired?", isExpired); // Expected: true

  console.log("Testing with valid token...");
  const isValid = isTokenExpired(validToken);
  console.log("Is valid token expired?", isValid); // Expected: false

  console.log("Testing with invalid token...");
  const isInvalid = isTokenExpired('INVALID_TOKEN');
  console.log("Is invalid token expired?", isInvalid); // Expected: true
};

testIsTokenExpired();
