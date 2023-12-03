import { useRecoilState,atom } from "recoil";
import { userData } from "../../data/ComponentData";
import axios from "axios";
import { isDarkModeState } from "../../data/RelatedStates";
import { base_url } from "../../store/constants";

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
    // const pay= async ()=>{
    //   const response =   await axios.post(`${base_url}/pay/create-checkout-session`,body,{
    //     headers:{
    //         Authorization:authorization
    //     }
    //   })
      
    //   if(response.status==200)
    //   {
    //     window.location=response.data.url;
    //   }
    //   else{
    //     console.log(response.status)
    //   }
    // }

    const [isDarkMode]= useRecoilState(isDarkModeState)
    return <div >
    <div  className="p-5 lg:mx-10 my-2 border-solid rounded-lg border-[1px]" style={{height:"100%", backgroundColor:"" ,verticalAlign:"top",borderColor:(isDarkMode)?"white":"black"}}>
    <p style={{color:(isDarkMode)?"white":"black"}} className="lg:text-[30px]">Your current Bidhub wallet balance is</p>
    <p className="lg:text-[30px] text-[#FF6B00] font-medium">{user.balance} INR</p>
    </div>
    {/* second container */}
    <div className="p-5 h-[50vh] lg:h-[45vh] bg-[#EEEEEE] lg:mx-10 my-5 border-solid rounded-lg border-black border-[1px]">
    <div className="m-5">
    <p  className="text-[24px] my-2">Add money to Bidhub Wallet</p>
    <p className="bg-white p-2 text-[24px] text-[#808080] " style={{border:"solid 1px #717171",borderRadius:"2px"}}>INR <input className="text-[#515151] px-5 w-[90%]" value={inputAmount} type="text"  style={{border:"none",outline:"none", borderBottom: '0px'} }

    onChange={(event)=>{setInputAmount(Number(event.target.value))}}/></p>
    </div>
    <div className="m-5">
    <span ><SelectAmount value={100} /></span>
    <span><SelectAmount value={200} /></span>
    <span><SelectAmount value={500} /></span>
    <span className="hidden lg:inline-block"><SelectAmount value={1000} /></span>
    <div  className='flex my-5 justify-end  text-right ' ><button className="bg-green-600 p-2 text-white rounded shadow" onClick={()=>
    // {console.log(inputAmount);pay();}
    {alert("Sorry, Currently this feature is not working : (")}
  }>Proceed</button></div>
    </div></div></div>
}

function SelectAmount(props:{value:number})
{
    const [inputAmount,setInputAmount] = useRecoilState(inputAmountState)
    return <div className="bg-[#D9D9D9] inline-block text-[24px] mx-2 px-3" onClick={()=>setInputAmount(props.value+inputAmount)} style={{color:"#515151"}}>
      +{props.value}
    </div>
}

export default AddMoney;

