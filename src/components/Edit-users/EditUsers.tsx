import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigate} from 'react-router-dom';

export const EditUsersPage = () => {
    const {id} = useParams()
    const [Name, setName] = useState('')
    const [Gender, setGenero] = useState('')
    const [Email, setEmail] = useState('')
    const [Status, setStatus] = useState('')
    const [StatusApi, setStatusApi] = useState(0)
    const [Atualizar, setAtualizar] = useState(false)

    type api = {
        token: string,
        baseURL: string
    }

    useEffect(()=>{
        GetUsers()
    },[GetUsers])
    
    const GetUsers = async () => {
        let url: RequestInfo = api.baseURL
        let response = await fetch(`${url}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${api.token}`
            }
        })
        let json = await response.json()
        let data = json.data
        setName(data.name)
        setGenero(data.gender)
        setEmail(data.email)
        setStatus(data.status)
    }

    const UpdateUsers = () => {
        let url: RequestInfo = api.baseURL
        fetch(`${url}/${id}`, {
            method: 'PATCH',
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
            if(resp === 200){
                setAtualizar(true)
            }
        })
        .catch(err => {
            setStatusApi(402)
        })
    }

    if(Atualizar){
        return <Navigate replace to='/listusers'/>
    } else {
        return (
            <div className="edit-users">
                <div className="form-data">
                    <div>
                        <h1>Selecione os elementos que deseja editar:</h1>
                    </div>
                    <form action="">
                        <label htmlFor="">nome:</label>
                        <input type="text" placeholder="Digite seu nome..." value={Name} onChange={(e) => setName(e.target.value)}/>
                        <label htmlFor="">Email:</label>
                        <input type="email" name="" id="" value={Email} placeholder="Digite seu Email..." onChange={(e) => setEmail(e.target.value)}/>
                        <div className="d-flex">
                            <label className="me-3">status:</label>
                            <div>
                                <input type="radio" value={Status} name='status' checked={Status==="active"} onClick={ () => {setStatus('active')}}/> <label htmlFor="" className="me-3 px-1">Ativo</label>
                                <input type="radio" value={Status} name='status' checked={Status==="inactive"} onClick={ () => {setStatus('inactive')}}/> <label htmlFor="" className="me-3 px-1">Inativo</label>
                            </div>
                        </div>
                        <label htmlFor="">Gênero:</label>
                        <select 
                            onChange={(event) => setGenero(event.target.value)}
                            value={Gender}>
                            <option value="male">Homem</option>
                            <option value="female">Mulher</option>
                        </select>
                        <div className="btn edit-button">
                            <button type="button" className="btn btn-success" onClick={() => UpdateUsers()}>Salvar Edição</button>
                        </div>
                        <div>
                            {StatusApi === 402 && <h5 className="text-danger text-center">Preencha todos os campos corretemente!</h5>}
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    
}
