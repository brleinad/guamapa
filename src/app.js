import './app.css';
import React, { Suspense, useContext } from 'react'
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
// } from 'react-dom-router';

import { AuthProvider, AuthContext } from './context/auth-context';
import { FetchProvider } from './context/fetch-context';
import Login from './pages/login';
import AppShell from './app-shell';
import AddTown from './pages/add-town';
import AddMayor from './pages/add-mayor'
import Mayors from './pages/mayors'
import Home from './pages/home'

// import {useUser} from './context/auth'
// import axios from './axiosConfig'
// import AuthenticatedApp from './authenticated-app'
// import UnauthenticatedApp from './unauthenticated-app'

// const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
// const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

const LoadingFallback = () => (
  <AppShell>
    <div>
      Loading...
    </div>
  </AppShell>
)

const UnauthenticatedRoutes = () => (
  // TODO: 404
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/">
      <AppShell>
        <Home />
      </AppShell>
    </Route>
  </Switch>
)

const AuthenticatedRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() => 
        auth.isAuthenticated() ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to="/" />
        )
      }
      ></Route>
  );
};

const StaffRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() => 
        auth.isStaff() ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to="/" />
        )
      }
      ></Route>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <AuthenticatedRoute path="/alcaldes-auxiliares">
            <Mayors />
          </AuthenticatedRoute>
          <StaffRoute path="/agregar-comunidad">
              <AddTown />
          </StaffRoute>
          <StaffRoute path="/agregar-alcalde-auxiliar">
              <AddMayor />
          </StaffRoute>
          <UnauthenticatedRoutes />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  // const user = useUser()
//   const user = true;
//   return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <AppRoutes />
        </FetchProvider>
      </AuthProvider>

    </Router>
  )

}
export default App;

