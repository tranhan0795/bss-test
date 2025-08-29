import fs from "fs";
import readline from "readline"

const filePath = "/";


const getNumberOfWord = async(text:string)=>{
 let res = 0;
 
 for (let i =1; i<=100;i++){
    res+= (await processFile(`${filePath}/F${i}.txt`,text));
 }

 return res;
}

const processFile = async (path:string, text:string)=>{
  let res = 0;
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });


  for await (const line of rl) {
     const words = line.split(",");
     for(const word of words){
      if(word === text) res++;
     }
  }

  return res;
}