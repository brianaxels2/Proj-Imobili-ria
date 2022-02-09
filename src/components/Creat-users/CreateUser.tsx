import { useState } from 'react'
import {Navigate} from 'react-router-dom';

export const CreateUser = () => {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Status, setStatus] = useState('active')
    const [Gender, setGenero] = useState('male')
    const [StatusApi, setStatusApi] = useState(0)
    const [Atualizar, setAtualizar] = useState(false)

    type api = {
        token: string,
        baseURL: string
    }
    
    const CreatNewUsers = () => {
        let url: RequestInfo = api.baseURL
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${api.token}`
            },
            body: JSON.stringify(
                {"name": Name,
                "gender": Gender,
                "email": Email,
                "status": Status}
            )
        })
        .then(response => {
            let resp = response.status
            if(resp === 201){
                setAtualizar(true)
            }
            setStatusApi(resp)
        })
        .catch(err => {
            setStatusApi(422)
        })
    }

    if(Atualizar){
        return <Navigate replace to='/listusers'/>
    } else {
        return (
            <div className="formulario">
                <form action="">
                    <h1>Preencha os campos para cadastrar novo usuário!</h1>
                    <label htmlFor="">nome:</label>
                    <input type="text" placeholder="Digite o nome..." onChange={(e) => setName(e.target.value)}/>
                    <label htmlFor="">Email:</label>
                    <input type="email" name="Email" id="" placeholder="Digite o Email..." onChange={(e) => setEmail(e.target.value)}/>
                    <div className='d-flex'>
                        <label htmlFor="" className="me-3">status:</label>
                        <div>
                            <input type="radio" value={'active'} name='status' checked={Status==="active"} onClick={ () => {setStatus('active')}}/> <label htmlFor="" className="me-3 px-1">Ativo</label>
                            <input type="radio" value={'inactive'} name='status' onClick={ () => {setStatus('inactive')}}/> <label htmlFor="" className="me-3 px-1">Inativo</label>
                        </div>
                    </div>
                    <label htmlFor="">Gênero:</label>
                    <select 
                        onChange={(event) => setGenero(event.target.value)}
                        value={Gender}>
                        <option value="male">Homem</option>
                        <option value="female">Mulher</option>
                    </select>
    
                    
                    <button type="button" className="btn btn-success" onClick={CreatNewUsers} disabled={Name === '' || Email === '' ? true : false}
                    >Cadastrar Usuário</button>
    
                    <div>
                        {StatusApi === 422 && <h5 className="text-danger text-center m-4">Preencha todos os campos corretemente!</h5>}
                    </div>
                </form>
                
    
                <div className="image-login"></div>
            </div>
        )
    }
}
