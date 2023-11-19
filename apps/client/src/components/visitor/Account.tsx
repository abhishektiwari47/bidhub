import { useRecoilState } from "recoil";
import { userData } from "../../data/ComponentData";

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
    return <span ><img style={{height:`${props.dimention}vh`, width:`${props.dimention}vh`, borderRadius:"50%",objectFit:"cover", backgroundColor:"red"}} src={props.user.imageLink.toString()} alt="" /></span>
 }

function Account(){
    const [user,setUser] = useRecoilState(userData)
    return < div>
    <div  style={{width:"100%", height:"35vh",display:"inline-grid",gridTemplateColumns:"1fr 2fr"}}>
    <div style={{width:"100%",backgroundColor:"green"}}><ProfilePhoto user={user} dimention={25}/></div>
    <div style={{width:"100%",backgroundColor:"orange"}}>
        <h1>{user.fullName}</h1>
        <h4>{user.username}</h4>
        <h4>{user.userId}</h4>
        {/* <h4>{user.userId}</h4> */}
        <h4>Hostel : {user.hostelName}</h4>
        <h4>Room : {user.hostelRoom}</h4>
    </div>
    </div>
    <hr style={{margin:"0px" }} />
    <div style={{width:"100%", height:"44vh",display:"inline-grid",gridTemplateColumns:"95fr 1fr 95fr"}}>
    <div style={{width:"100%",backgroundColor:"blue"}}><div>Products</div>
    <div style={{height:"250px" ,overflow:"auto"}}>{user.productId.map((element)=>
    {
        return <div>"{element}"</div>
    })}</div>
    </div>
    <div  style={{width:"100%", height:"100%", border:"solid 0px grey",backgroundColor:"grey"}}></div>
    <div style={{width:"100%",backgroundColor:"yellow"}}><div>
        Achievement
        </div>
        <div style={{fontSize: "35px",height:"250px" ,overflow:"auto"}}>
        😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋
        </div>
        </div>
    </div>
    </div>
}

export default {Account,ProfilePhoto};