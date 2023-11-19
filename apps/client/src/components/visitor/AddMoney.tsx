import { useRecoilState,atom } from "recoil";
import { userData } from "../../data/ComponentData";
import { useState } from "react";
import axios from "axios";

const inputAmountState = atom({
    key:"inputAmountState",
    default:100}
);

function AddMoney(){
    const [user] = useRecoilState(userData);
    const [inputAmount,setInputAmount] = useRecoilState(inputAmountState);
    let body = {
        amount:inputAmount*100,
        userId:user.userId
    }
    const authorization = "bearer "+localStorage.getItem('token');
    const pay= async ()=>{
      const response =   await axios.post("http://localhost:4242/pay/create-checkout-session",body,{
        headers:{
            Authorization:authorization
        }
      })
      
      if(response.status==200)
      {
        window.location=response.data.url;
      }
      else{
        console.log(response.status)
      }
    }

    return <div>
    <div style={{height:"100%", backgroundColor:"yellow" ,verticalAlign:"top"}}>
    <p>Your current Bidhub wallet balance is</p>
    <p>{user.balance} INR</p>
    </div>
    <div style={{height:"70%",backgroundColor:"#ffffff",}}>
    <p>Add money to Bidhub Wallet</p>
    <p style={{border:"solid 1px #717171",borderRadius:"2px"}}>INR <input value={inputAmount} placeholder="100" type="number" style={{border:"none",outline:"none", borderBottom: '0px'} } onChange={(event)=>{setInputAmount(Number(event.target.value))}}/></p>
    </div>
    <span><SelectAmount value={100} /></span>
    <span><SelectAmount value={200} /></span>
    <span><SelectAmount value={500} /></span>
    <span><SelectAmount value={1000} /></span>
    <span><SelectAmount value={10000} /></span>
    <div><button onClick={()=>{console.log(inputAmount);pay();}}>Proceed</button></div>
    </div>
}

function SelectAmount(props:{value:number})
{
    const [inputAmount,setInputAmount] = useRecoilState(inputAmountState)
    return <span onClick={()=>setInputAmount(props.value+inputAmount)} style={{width:"10%", backgroundColor:"grey" ,color:"#515151"}}>
      +{props.value}
    </span>
}

export default AddMoney;

