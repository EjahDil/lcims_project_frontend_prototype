import React from 'react'
import Route from './routes';
import { PermissionsProvider } from './contexts/permContext';
// import { AuthProvider } from './contexts/authContext';




function App() {
  return (
    <React.Fragment>
      <PermissionsProvider>

          <Route />

      </PermissionsProvider>
        
    </React.Fragment>
  )
}

export default App;
