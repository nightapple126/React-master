/*
Project : Cryptotrades
FileName :  config.js
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which maintain globl variable for the application
*/
const config = {
    app: {
      port: 3000
    },
    db: {
      host: 'localhost',
      port: 27017,
      username: '',
      password: '',
      name: 'metamask',
      prefix:'linkwell_'
    },
    mail: {
      type:"",
      smtp: {
        host:"smtp.sendgrid.net",
        secure:false,
        port:587,
        username:'',
        password:''
      }
    },
    site_name:'Cryptotrades',
    site_link:'#',
    site_email: '',
    secret_key:'jfVRtwN7xBl7LjRucIUdPnrh1UVUhzhZ',
    public_key:'6gluXXunc77uukLJbSmlQ31ckSlLq8Qi',
    converstion_url: "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
    rpcurl: "https://rinkeby.infura.io/v3/64fa77a39b9a4c31b186fb2148edff70",
    owner: {
      address: "0xaCeEF0453dE61B48CF0159749f192F5fc6a77298",
      key: "a8f617ed9d45404af91bdacaf901fb9bb60669f6c57bc969597301277725faf3"
    }
   };
   
   
module.exports = config;