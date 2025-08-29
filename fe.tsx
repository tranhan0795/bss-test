import react,{useState, useEffect} from "react";
import { useDebouncedCallback } from 'use-debounce';


const TextSearch = ()=>{
  const [wordNumber, setWordNumber ] = useState();
  const [searchInput, setSeatchInput] = useState("");


const search = (input: string)=>{
   fetch("/api",{body:JSON.stringify({searchInput: input})}).then(res=>{
     return res.json();
   }).then(n=> {
    setWordNumber(n.wordNumber);
   })
}

  const onChangeInput = (e) =>{
    setSeatchInput(e.target.value);
  }

  const debouncedSearch = useDebouncedCallback((input: string) => {
    search(input);
  }, 5000);


  const onSearch = () => {
    debouncedSearch(searchInput);
  };

  return <div>
   <p>Result: {wordNumber}</p>
   <input value={searchInput} onChange={onChangeInput}/>
   <button onClick={onSearch} >search</button>
  </div>
}