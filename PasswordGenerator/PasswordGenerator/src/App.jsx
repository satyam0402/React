import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(10)
  const [numsAllowed, setNumsAllowed] = useState(false)
  const [charsAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  
  
  const passwordRef = useRef(null)
  console.log("🔄 App rendered");


  // Password generator
  const passwordGenerator = useCallback(() => {
    console.log("🔐 Generating password...");

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // lOGIC for numbers
    if (numsAllowed) {
      console.log("✅ Numbers allowed");

      str += "0123456789";
    }
    // Logic for special characters
    if (charsAllowed) {
      console.log("✅ Special characters allowed");

      str += "!@#$%^&*()_+[]{}|;:,.<>?";
    }
    // how many times to loop over depends on length
    for (let i = 1; i <= length; i++) {
      let passChar = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(passChar); // get a random character from the string and passwords is storing 
    }

    // to read the password
    console.log("📦 New password:", pass);
    setPassword(pass);
   

  }, [length, numsAllowed, charsAllowed, setPassword])
  const copyPasswordToClipboard = useCallback(() => {
    console.log("📋 Copying password to clipboard...");

    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    console.log("⚙️ useEffect called due to change in dependencies");
    passwordGenerator()
  }, [length, numsAllowed, charsAllowed, passwordGenerator])


  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >Copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { 
              console.log("📏 Length changed to:", e.target.value);
              setLength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numsAllowed}
            id="numberInput"
            onChange={() => {
              console.log("🔢 Numbers toggled");
              setNumsAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charsAllowed}
            id="characterInput"
            onChange={() => {
              console.log("🔣 Special characters toggled");
              setCharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
