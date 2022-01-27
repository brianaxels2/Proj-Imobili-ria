import { CreateUser } from './components/Creat-users/CreateUser';
import { EditUsersPage } from './components/Edit-users/EditUsers'
import { ListUsers } from './components/list-users/listUsers'
import { PageLogin } from './components/Page-login/Page-login';
import './App.css';
import  'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  
  return (
    <div className='body'>
      <Routes>
        <Route
          path='/'
          element={<PageLogin/>}
        />
        <Route
          path='/createusers'
          element={<CreateUser/>}
        />
        <Route
          path='/listusers'
          element={<ListUsers/>}
        />
        <Route
          path='/editusers/:id'
          element={<EditUsersPage/>}
        />
        <Route
          path='/editusers'
          element={<EditUsersPage/>}
        />
      </Routes>
    </div>
    
  );
}

export default App;