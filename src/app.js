import './app.css';

import * as React from 'react'
// import {useUser} from './context/auth'
import axios from './axiosConfig'
import AuthenticatedApp from './authenticated-app'
import UnauthenticatedApp from './unauthenticated-app'

// const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
// const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  // const user = useUser()
  const user = true;
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}
export default App;

