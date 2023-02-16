import { useState, useEffect } from 'react'
import './style.css'
import randomcolor from "randomcolor";

type User = {
    login: string,
    avatar_url: string,
    followers: Number,
    following: Number,
    public_repos: Number,
    company: string,
    location: string
}

function Home() {
    const[user, setUser] = useState({} as User)
    const [backgroundColor, setBackgroundColor] = useState("#000000");
    var i = 0;
    useEffect(() => {
        getUser()
      } , []) 
    
    async function getUser():Promise<void>{
        const username = document.getElementById('inputName') as HTMLInputElement;
        if (username?.value==="")
        {   
            const response = await fetch('https://api.github.com/users/MaykBrito');
            const data = await response.json();
            const user:User = {
                login: data.login,
                avatar_url: data.avatar_url,
                followers: data.followers,
                following: data.following,
                public_repos: data.public_repos,
                company: data.company,
                location: data.location            
            }
            setUser(user);
        }else{
            const response = await fetch(`https://api.github.com/users/${username?.value}`);
            const data = await response.json();
            const user:User = {
                login: data.login,
                avatar_url: data.avatar_url,
                followers: data.followers,
                following: data.following,
                public_repos: data.public_repos,
                company: data.company,
                location: data.location            
            }
            setUser(user);
        }
    }

    const changeBackgroundColor = () => {
        setBackgroundColor(randomcolor());
    }

    return (
        <div className='container'>
            <div className='childrenContainer'>
                <div className='card'>
                    <span className='headerTitle'>
                        Compartilhe seu #rocketcard
                    </span>
                    
                    <div style={{ backgroundColor: backgroundColor }} id='backgroundBlack'>
                        <div  className='backgroundChildren'>
                            <div className='iconWithText'>
                                <div className='whiteCicle'>
                                    <img className='imgRocketSeat' src="../src/assets/logo.svg" alt="img-rocketseat"/>
                                </div>
                                <span className='textUser'>{user.login}</span>
                            </div>

                            <div>
                                <img className='avatarMain' src={user.avatar_url} alt=""/>
                            </div>  
                            
                            <Info user={user}> </Info>

                            <div className='divFooter'>
                                <img src="../src/assets/logo.svg" alt="icon-rocketseat" />
                                <span >ROCKETCARD </span>
                            </div> 
                            
                        </div>

                    </div>
                </div>
                
                <div className='containerSide'>
                    <span>Customizar Rocketcard</span>
                    <Button change={changeBackgroundColor} />

                    <span>Descubra seu RocketCard</span>
                    <input type="text" id='inputName' placeholder='GitHub Username' />
                    <button onClick={getUser} className='buttonDiscover'>Descobrir</button>
                </div>

            </div>
            

        </div>
    )

    
}


function Button(props:any)
{
    return(
        <button onClick={props.change} id='buttonChangeBackground'>Mudar cor de fundo</button>
    )
}


function Info(props:any){
    return(
        <div className='info'>
            <ul className='ulList'>
                <li className='textList'>
                    <img src="../src/assets/followers.svg" alt="iconFollowers"/>
                    <span id='seguidores'>{props.user.followers} Seguidores</span>
                </li>

                <li className='textList'>
                    <img src="../src/assets/followers.svg" alt="iconFollowers"/>
                    <span id='seguindo'>{props.user.following} Seguindo</span>
                </li>
                <li className='textList'>
                        <img src="../src/assets/repository.svg" alt="iconFollowers"/>
                        <span id='repositorios'>{props.user.public_repos} Repositórios</span>
                </li>
                <li className='textList'>
                    <img src="../src/assets/company.svg" alt="" />
                    <span id='company'>{props.user.company}</span>
                </li>
                <li className='textList'>
                    <img src="../src/assets/location.svg" alt="" />
                    <span id='location'>{props.user.location}</span>
                </li>            

            </ul>   
        </div>
    ) 
}

export default Home
