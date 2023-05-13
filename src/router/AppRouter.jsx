import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';

import { useCheckAuth } from '../hooks';
import { JournalRoutes } from '../journal/routes/JournalRoutes';

import {ChekingAuth} from '../ui/'


export const AppRouter = () => {
  
  const {status} = useCheckAuth();

  if (status === 'checking'){
    return <ChekingAuth></ChekingAuth>
  }
  return (
    <Routes>
      {
        (status=== 'authenticated')
        
        ? <Route path="/*" element={ <JournalRoutes /> } />/* Login y Registro */
        :<Route path="/auth/*" element={ <AuthRoutes /> } />/* JournalApp */
      }

      <Route path='/*' element={<Navigate to='/auth/login'/>}/>

    </Routes>
  )
}
