import { ProjectListScreen } from './screens/project-list';
import './App.css';
import React from 'react';

import { useAuth } from 'context/auth-context';
import { AuthenticatedApp } from 'authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app';
function App() {
  const { user } = useAuth();
  return <div className='App'>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>;
}
export default App;
