import '@rainbow-me/rainbowkit/styles.css';
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { useRouter} from 'next/router';

import { chain, createClient, WagmiProvider } from 'wagmi';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    apiProvider.alchemy(process.env.ALCHEMY_ID),
    apiProvider.fallback()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from "ethers";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect,useState } from 'react';
import Form from 'react-bootstrap/Form';

const Connect = () =>{
  return <ConnectButton/>
}

const YourApp = () => {
  const router = useRouter()
  let signature,provider,signer;
  let msg = "hello"
  let [address,setAddress] = useState(0)

  const [data,setData] = useState({
    address : "",
    name : "",
    symbol : ""
  })
  let connection;
  const sign = async() =>{
  provider = new ethers.providers.Web3Provider(window.ethereum)
  signer = provider.getSigner()
    

  const handleName = () => {
    console.log("hii")
  }

  
  try{
    let addr = await signer.getAddress()
    setAddress(addr)
    setData({...data, address : addr})
  }catch(err){
    console.log(err)}
  }
  useEffect(() => {
    sign()
  },[])

  const handleChange = (e) =>{
    const name = e.target.name
    console.log(name, e.target.value)
    setData({...data, [name] : e.target.value})
  }
  
  const insertData = async (newRecord) =>{
    // console.log(JSON.stringify(newRecord))
    try{
    let request = await fetch('/api',{
      method: 'POST',
      headers : {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body : JSON.stringify(newRecord) 
    })
    router.push("/")
    console.log(request)
  }catch(err){
    console.log(err)
  }
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    let newRecord = {...data}
    // newRecord = JSON.stringify(newRecord)
    console.log(newRecord)
    insertData(newRecord)
    // check for the conditions and add this record to the DB
    
  }

 return(
  <>
  <p>address {data.address}</p>
    <form action='' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>name</label>
        <input type= "text" autoComplete='off' name='name' id='name' value= {data.name} onChange={handleChange}/>
      </div>
      <br/>
      <div>
        <label htmlFor='symbol'>symbol</label>
        <input type= "text" autoComplete='off' name='symbol' id='symbol' value= {data.symbol} onChange={handleChange}/>
      </div>
      <br/>
      <button type='submit' className='btn btn-primary'>submit</button>
    </form>
  </>
 )
};

const App = () => {
  
  console.log("App")
  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <ConnectButton/>
      <br/>
      <YourApp/>
      </RainbowKitProvider>
    </WagmiProvider>
  );
};

export default App;