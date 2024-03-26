import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length, setLength] = useState(8);
  const [numberallowed,setNumberAllowed]=useState(false);
  const [charactersallowed,setCharactersallowed]=useState(false);
  const [password,setpassword]=useState();
 
  const passwordgenerator=useCallback(()=>{
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if(numberallowed)str+="0123456789";
      if(charactersallowed)str+="!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

      for(let i=1;i<=length;i++){
          let index=Math.floor(Math.random()*str.length+1);
          pass+=str.charAt(index);

      }
      setpassword(pass);

  },[length,numberallowed,charactersallowed,setpassword]);

  useEffect(()=>{
    passwordgenerator();
  },[length,charactersallowed,numberallowed,passwordgenerator])


  const passwordref=useRef(null);

  const copyPasswordToClipboard=useCallback(()=>{
    passwordref.current?.select();
      window.navigator.clipboard.writeText(password);
  })

  return (
    <>
    <div className=" w-50% max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-400 bg-gray-700 h-36" >
      <h1 className='text-white text-center'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className='outline-none w-full py-1 px-3 mt-4 rounded-lg' placeholder='password' readOnly ref={passwordref} />
        <button className='bg-blue-400 px-3 py-0.5 text-white outline-none shrink-0 mt-4 rounded-lg' onClick={copyPasswordToClipboard}>copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" min={8} max={100} value={length} className='cursor-pointer' onChange={(e)=>{
            setLength(e.target.value)
          }} />     
          <label> Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
        <input type="checkbox" value={numberallowed} defaultValue={numberallowed} onChange={()=>{
            setNumberAllowed(!numberallowed);
          }} />
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
        <input type="checkbox" value={charactersallowed} defaultValue={charactersallowed} onChange={()=>{
            setCharactersallowed(!charactersallowed);
          }} />
          <label>Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
