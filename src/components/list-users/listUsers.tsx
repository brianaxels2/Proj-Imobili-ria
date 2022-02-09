import { useState, useEffect } from 'react'; 
import { allUsers } from '../../types/Users';
import { FaTrash, FaEdit, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const ListUsers = () => {
    const [users, setUsers] = useState<allUsers[]>([]);
    const [loadUsers, setLoadUsers] = useState(false);
    const [nextUsers, setNextUsers] = useState(1)
    const [StatusApi, setStatusApi] = useState(0)

    type api = {
        token: string,
        baseURL: string
    }

    useEffect( () => {
        apiUsers()
    },[apiUsers]);

    //  Result-users
    const apiUsers = async () => {
        setLoadUsers(true)
        let response = await fetch(`https://gorest.co.in/public/v1/users?page=${nextUsers}`);
        let json = await response.json();
        setLoadUsers(false)
        setUsers(json.data);
    }

    // Remove users
    const RemoveUsers = async (id: number) => {
      let url: RequestInfo = api.baseURL
      let response = await fetch(`${url}/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${api.token}`
          }
      })
      let json = await response.status
      setStatusApi(json)
      apiUsers()
    }

    // pagination next
    const next = () => {
        setNextUsers(nextUsers +1)
        apiUsers()
    }

    // pagination exit
    const exit = () => {
        setNextUsers(nextUsers -1)
        apiUsers()
    }

    return (
        <div>
            <>
            {loadUsers &&
                <div className='carregamento'>Carregando Usuários...</div>
                }
                
                {!loadUsers && users.length > 0 &&
                <>
                <div className='return-users'>
                    <div className='header'>
                        <h1 className='title-principal'>Olá, sejam bem vindos a nossa lista de cadastro!</h1>
                        <button><Link to={'/createusers'} style={{color:'#ffffff', textDecorationLine:'none'}}>Criar novo usuário <FaUserPlus style={{marginBottom: '4px'}}/></Link></button>
                    </div>
                    <h2 className='title-sec'>Total de usuários cadastrados: {users.length}</h2>

                    {users.map( (item, index) => (
                    <div key={index}className='users'>
                        <div>
                          <h1>Nome:</h1>
                          <p>{item.name}</p>
                        </div>
                        <div>
                          <h1>Email:</h1>
                          <p>{item.email}</p>
                        </div>
                        <div>
                          <h1>Sexo:</h1>
                          <p>{item.gender}</p>
                        </div>
                        <div>
                          <h1>Id: {item.id} - {item.status}</h1>
                        </div>
                      
                        <div className= 'btn w-70 d-flex justify-content-around'>
                          <button type="button" className="btn btn-primary text-capitalize secondstyle"><Link to={`/editusers/${item.id}`} style={{color:'#ffffff', textDecorationLine:'none'}}>editar usuário </Link><FaEdit style={{marginBottom: '5px'}}/></button>
                          <button type="button" className="btn btn-danger text-capitalize float-rigth secondstyle" onClick={() => RemoveUsers(item.id)}>Remover usuário <FaTrash style={{marginBottom: '5px'}}/></button>
                        </div>
                    </div>
                    ))}

                  <div className='btn'>
                    <button className='btna' disabled={nextUsers === 1 ? true : false} onClick={exit}>Volta Página</button>
                    <button className='btna' onClick={next}>Próxima Página</button>
                  </div>
                </div>
                </>
                }
                {!loadUsers && users.length === 0 &&
                <div>Não há usuários para exibir!</div>
                }
            </>
        </div>
    )
}
