import react,{useState, useEffect} from "react";
import { useDebounce } from 'use-debounce';


const TextSearch = ()=>{
  const [wordNumber, setWordNumber ] = useState();
  const [searchInput, setSeatchInput] = useState("");
  const [input] = useDebounce(searchInput, 5000);

useEffect(()=>{
  let shouldUpdate = true;
     
   fetch("/api",{body:JSON.stringify({searchInput})}).then(res=>{
     return res.json();
   }).then(n=> {
    if(shouldUpdate) setWordNumber(n.wordNumber);
   })

   return ()=>{
    shouldUpdate = false;
   }
},[input])

  const onChangeInput = (e) =>{
    setSeatchInput(e.target.value);
  }

  return <div>
   <p>Result: {wordNumber}</p>
   <input value={searchInput} onChange={onChangeInput}/>
  </div>
}