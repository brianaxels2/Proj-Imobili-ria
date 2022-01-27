import { useState, ChangeEvent } from 'react'
import { Navigate} from 'react-router-dom';

export const PageLogin = () => {
    const [Atualizar, setAtualizar] = useState(false)
    const [Nome, setNome] = useState('')
    const [Senha, setSenha] = useState('')

    if(Atualizar){
        return <Navigate replace to='/listusers'/>
    } else {
        return (
            <div className="page-login d-flex">
                <div className="page-form">
                    <div>
                        <h1>Faça login para continuar</h1>
                    </div>
                    
                    <form action="">
                        <label htmlFor="">Nome:</label>
                        <input type="text" placeholder="Digite seu nome..." onChange={(e)=>{setNome(e.target.value)}}/>
                        <label htmlFor="">Senha:</label>
                        <input type="password" placeholder="Digite sua senha..." onChange={(e)=>{setSenha(e.target.value)}}/>
                    </form>
                    <div>
                        <button type="button" className="btn btn-success" disabled={Nome == '' || Senha == ''} onClick={()=>setAtualizar(true)}>Entrar</button>
                    </div>
                </div>
            </div>
        )
    } 
}