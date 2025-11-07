import { useState } from 'react';
import { Header } from '../../components/Header';
import background from '../../assets/background.png';
import ItemList from '../../components/ItemList';
import './styles.css';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetUser = async () => {
    const userDataResponse = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userDataResponse.json();
    setCurrentUser(newUser);

    if (newUser.name) {
      const {avatar_url, name, login, bio} = newUser;
      setCurrentUser({avatar_url, name, login, bio});

      const userReposResponse = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await userReposResponse.json();
    
      if(newRepos.length){
        setRepos(newRepos);
      }
    }
  };

  
  return (
    <div className="App">
        <Header />
        <div className="conteudo">
            <img src= {background} className='background' alt="background app" />
            <div className='info'>
        <div>
          <input className="input" name="usuario" placeholder='@username' value={user}
          onChange={event => setUser(event.target.value)}/>
          <button className="button" onClick={handleGetUser}>Buscar</button>
        </div>
                {currentUser?.name.length ? ( 
                <>
                  <div className='user-info'>
                      <img src={currentUser.avatar_url} 
                      className= "profile" 
                      alt='profile user'/>
                      <div>
                        <h3>{currentUser.name}</h3>
                        <span>{currentUser.login}</span>
                        <p>{currentUser.bio}</p>
                      </div>
                  </div>   
                    <hr />  
                </>
                ) : null}
                {repos?.length ? (
                <>
                <div>
                    <h4 className='repositories'>Repositories</h4>
                    <hr />
                    {repos.map((repo) =>(
                    <ItemList title={repo.name} description={repo.description} url={repo.clone_url}/>))}
                </div>       
                </>
                ) : null}
            </div>
        </div>
    </div>
  
    
  );
}

export default App;