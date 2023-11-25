import { useRecoilState } from "recoil";
import { userData } from "../../data/ComponentData";
import Profile from '../../assets/svg/Profile.svg';
import Link from '../../assets/svg/Link.svg';
const arr= ["😋","😋","😋","😋","😋","😋","😋","😋","😋","😋","😋","😋","😋","😋","😋","😋","😋","😋","😋","😋","😋","😋",]
type userType = {
    userId: string;
    username: string;
    password: string;
    balance: number;
    fullName: string;
    hostelName: string;
    hostelRoom: string;
    imageLink: string;
    productId: never[];}
  
  type propsType = {
    user:userType;
    dimention:number;
  }
  
function ProfilePhoto(props:propsType){
    return <span ><img
     className=""
     style={{height:`${props.dimention}vh`, width:`${props.dimention}vh`, borderRadius:"50%",objectFit:"cover", }} src={(props.user.imageLink.toString()==="")?Profile:props.user.imageLink.toString()} alt="" /></span>
 }

function Account(){
    const [user,setUser] = useRecoilState(userData)
    return < div >
    <div className="block lg:inline-grid lg:h-[35vh]" style={{width:"100%",gridTemplateColumns:"1fr 2fr"}}>
    <div className="flex  p-5 justify-center items-center" style={{width:"100%",}}><ProfilePhoto user={user} dimention={25}/></div>
    <div className="p-5 flex flex-col text-center lg:text-left justify-between" style={{width:"100%"}}>
        <div><h1 className="text-[#6363FF]  text-[30px]">{user.fullName}</h1>
        <h4  className="text-[#3F3F3F] italic  text-[22px]">{user.username}</h4>
        <h4 className="text-[#3F3F3F]  text-[22px]">{user.userId}</h4></div>
        <div>{/* <h4>{user.userId}</h4> */}
        <h4 className="  text-[22px]">Hostel : {user.hostelName}</h4>
        <h4 className=" text-[22px]">Room : {user.hostelRoom}</h4></div>
    </div>
    </div>
    <hr style={{margin:"0px" }} />
    <div  style={{width:"100%", height:"44vh",display:"inline-grid",gridTemplateColumns:"95fr 1fr 95fr"}}>
    <div className="p-5" style={{width:"100%"}}><div className="text-[22px]">Bought Product Ids</div>
    <div style={{height:"25vh",marginTop:"10px",overflow:"auto"}}>{user.productId.map((element)=>
    {
        return <div onClick={()=>{}} className="text-[20px] cursor-pointer  font-medium p-1"><img className="inline" src={Link} alt="" /> {element}</div>
    })}</div>
    </div>
    <div  style={{width:"100%", height:"100%", border:"solid 0px grey",backgroundColor:"grey"}}></div>
    <div  className="p-5" style={{width:"100%"}}>
        <div className="text-[22px]">
        Achievement
        </div>
        <div style={{height:"25vh",marginTop:"10px",overflow:"auto"}}>
        {arr.map((element)=>{
            return <div className="inline-block">
               {element}
            </div>
        })}
        </div>
        </div>
    </div>
    </div>
}

export default {Account,ProfilePhoto};