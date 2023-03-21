import { useState } from 'react';
import InputSearch from '../../components/Input';
import { Users }  from '../../types/users';
import instance from '../../utilities/axiosInstance';
import { MapPin, UsersThree } from 'phosphor-react';
import { Irepos } from '../../types/repos';


const Home = () =>{
  const [users,setUsers] = useState<Users<string> | null>(null);
  const [busca,setBusca] = useState<String>("");
  const [repos,setRepos] = useState<Irepos[] | null>(null);
  const [loading,setLoading] = useState(false);

  
  const getUsers = ()=>{
    
    instance.get(`users/${busca}`)
    .then((res)=> setUsers(res.data))
    .catch((error)=> console.log(error))
    
  }

  const handleBusca = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setBusca(event.target.value)
  }

  const getRepos = async () =>{
   try{
        setLoading(true);
         const resp = await instance.get(`users/${busca}/repos`)
            setRepos(resp.data)

   } catch(error){
       console.log(error)

   } finally{
     setLoading(false);
   }
  }


  const showRepos = () =>{
    return repos && repos.map((item)=>{
     return <div key={item.id}
     className="bg-white border-b-2 p-3 h-auto w-full m-4 text-left">
        <div >
           <h1 className="flex gap-2 w-full items-center font-bold">{item.name}</h1>
           <a className="text-blue-600 text-2xl" href={item.html_url}>{item.name}</a>
           <span className="text-gray-600 border-spacing-1 border-r-2 rounded-lg m-2 shadow-sm p-2">{item.private? 'Private':'Public'}</span>
        </div>
           <span>{item.description}</span>
           <span>{item.language}</span>
        </div>
     
   })
  }
  
  return(
    <div className="w-full min-h-screen grid items-start  text-center">
      <header className="grid gap-2 m-10">
        <h1 className="font-bold text-lg">
          Procure um usuario pelo nome
        </h1>
        <InputSearch onchange={handleBusca}  onclick={getUsers}/>
        <hr/>
        <img
        src={users ? users.avatar_url:"https://cdn-icons-png.flaticon.com/512/25/25231.png"}
        alt={'logo-person'}
        className=" w-1/6 absolute rounded-full" 
        sizes={'50px'}/>
      </header>
      
      {users && 
      <div className=" grid grid-flow-row grid-cols-12 w-full h-full p-2">
        <div className=" col-span-5 p-2">
          <h1 className="font-bold text-2xl">{users.name}</h1>
          <p>{users.bio}</p>
          <button className="bg-stone-300 w-full rounded">
            <a href={users.html_url}> Follow</a>
           
          </button>
          <div className=" flex items-center gap-2">
            <MapPin size={32}/>
            <p>{users.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <UsersThree  size={32}/>
            <span>{users.followers} followers</span>
            <span>{users.following } following</span>
          </div>
        </div>

        <div className="flex w-full gap-10">
          
          <button onClick={getRepos}> 
          repositórios
          </button>
          <div> {showRepos()}</div>
        
        </div>
        
      </div>
     }
    </div>
  )
}
export default Home;