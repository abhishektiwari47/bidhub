import { useRecoilState } from "recoil";
import { userData } from "../../data/ComponentData";
import Profile from '../../assets/svg/Profile.svg';
import Link from '../../assets/svg/Link.svg';
import Emoji1 from '../../assets/svg/AchievementsIcons/Emoji1.svg';
import Emoji2 from '../../assets/svg/AchievementsIcons/Emoji2.svg';
import Emoji3 from '../../assets/svg/AchievementsIcons/Emoji3.svg';
import Emoji4 from '../../assets/svg/AchievementsIcons/Emoji4.svg';
import Emoji5 from '../../assets/svg/AchievementsIcons/Emoji5.svg';
import Emoji6 from '../../assets/svg/AchievementsIcons/Emoji6.svg';
import Emoji7 from '../../assets/svg/AchievementsIcons/Emoji7.svg';
import Emoji8 from '../../assets/svg/AchievementsIcons/Emoji8.svg';
import Emoji9 from '../../assets/svg/AchievementsIcons/Emoji9.svg';
import Emoji10 from '../../assets/svg/AchievementsIcons/Emoji10.svg';
import Emoji11 from '../../assets/svg/AchievementsIcons/Emoji11.svg';
import Emoji12 from '../../assets/svg/AchievementsIcons/Emoji12.svg';
import Emoji13 from '../../assets/svg/AchievementsIcons/Emoji13.svg';
import Emoji14 from '../../assets/svg/AchievementsIcons/Emoji14.svg';
import Emoji15 from '../../assets/svg/AchievementsIcons/Emoji15.svg';
import Emoji16 from '../../assets/svg/AchievementsIcons/Emoji16.svg';
import Emoji17 from '../../assets/svg/AchievementsIcons/Emoji17.svg';
import Emoji18 from '../../assets/svg/AchievementsIcons/Emoji18.svg';
import Emoji19 from '../../assets/svg/AchievementsIcons/Emoji19.svg';
import Emoji20 from '../../assets/svg/AchievementsIcons/Emoji20.svg';
import Emoji21 from '../../assets/svg/AchievementsIcons/Emoji21.svg';
import Emoji22 from '../../assets/svg/AchievementsIcons/Emoji22.svg';
import Emoji23 from '../../assets/svg/AchievementsIcons/Emoji23.svg';
import Emoji24 from '../../assets/svg/AchievementsIcons/Emoji24.svg';
import Emoji25 from '../../assets/svg/AchievementsIcons/Emoji25.svg';
import Emoji26 from '../../assets/svg/AchievementsIcons/Emoji26.svg';
import Emoji27 from '../../assets/svg/AchievementsIcons/Emoji27.svg';
import Emoji28 from '../../assets/svg/AchievementsIcons/Emoji28.svg';
import Emoji29 from '../../assets/svg/AchievementsIcons/Emoji29.svg';
import Emoji30 from '../../assets/svg/AchievementsIcons/Emoji30.svg';
import Emoji31 from '../../assets/svg/AchievementsIcons/Emoji31.svg';
import Emoji32 from '../../assets/svg/AchievementsIcons/Emoji32.svg';
import Emoji33 from '../../assets/svg/AchievementsIcons/Emoji33.svg';
import Emoji34 from '../../assets/svg/AchievementsIcons/Emoji34.svg';
import Emoji35 from '../../assets/svg/AchievementsIcons/Emoji35.svg';
import Emoji36 from '../../assets/svg/AchievementsIcons/Emoji36.svg';
import Emoji37 from '../../assets/svg/AchievementsIcons/Emoji37.svg';
import Emoji38 from '../../assets/svg/AchievementsIcons/Emoji38.svg';
import Emoji39 from '../../assets/svg/AchievementsIcons/Emoji39.svg';
import Emoji40 from '../../assets/svg/AchievementsIcons/Emoji40.svg';

const emojiArr = [
    Emoji1, Emoji2, Emoji3, Emoji4, Emoji5, Emoji6, Emoji7, Emoji8, Emoji9, Emoji10,
    Emoji11, Emoji12, Emoji13, Emoji14, Emoji15, Emoji16, Emoji17, Emoji18, Emoji19, Emoji20,
    Emoji21, Emoji22, Emoji23, Emoji24, Emoji25, Emoji26, Emoji27, Emoji28, Emoji29, Emoji30,
    Emoji31, Emoji32, Emoji33, Emoji34, Emoji35, Emoji36, Emoji37, Emoji38, Emoji39, Emoji40
  ];
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
    let renderEmoji:string[]=[];
    let count =40;
   

    // if (user.productId.length === 1) {
    //   count = 1;
    // } else if (user.productId.length === 2) {
    //   count = 2;
    // } else if (user.productId.length >= 3 && user.productId.length < 5) {
    //   count = 3;
    // } else if (user.productId.length >= 5 && user.productId.length < 8) {
    //   count = 4;
    // } else if (user.productId.length >= 8 && user.productId.length < 13) {
    //   count = 5;
    // } else if (user.productId.length >= 13 && user.productId.length < 21) {
    //   count = 6;
    // } else if (user.productId.length >= 21 && user.productId.length < 34) {
    //   count = 7;
    // } else if (user.productId.length >= 34 && user.productId.length < 55) {
    //   count = 8;
    // } else if (user.productId.length >= 55 && user.productId.length < 89) {
    //   count = 9;
    // } else if (user.productId.length >= 89 && user.productId.length < 144) {
    //   count = 10;
    // } else if (user.productId.length >= 144 && user.productId.length < 233) {
    //   count = 11;
    // } else if (user.productId.length >= 233 && user.productId.length < 377) {
    //   count = 12;
    // } else if (user.productId.length >= 377 && user.productId.length < 610) {
    //   count = 13;
    // } else if (user.productId.length >= 610 && user.productId.length < 987) {
    //   count = 14;
    // } else if (user.productId.length >= 987 && user.productId.length < 1597) {
    //   count = 15;
    // } else if (user.productId.length >= 1597 && user.productId.length < 2584) {
    //   count = 16;
    // } else if (user.productId.length >= 2584 && user.productId.length < 4181) {
    //   count = 17;
    // } else if (user.productId.length >= 4181 && user.productId.length < 6765) {
    //   count = 18;
    // } else if (user.productId.length >= 6765 && user.productId.length < 10946) {
    //   count = 19;
    // } else if (user.productId.length >= 10946 && user.productId.length < 17711) {
    //   count = 20;
    // } else if (user.productId.length >= 17711 && user.productId.length < 28657) {
    //   count = 21;
    // } else if (user.productId.length >= 28657 && user.productId.length < 46368) {
    //   count = 22;
    // } else if (user.productId.length >= 46368 && user.productId.length < 75025) {
    //   count = 23;
    // } else if (user.productId.length >= 75025 && user.productId.length < 121393) {
    //   count = 24;
    // } else if (user.productId.length >= 121393 && user.productId.length < 196418) {
    //   count = 25;
    // } else if (user.productId.length >= 196418 && user.productId.length < 317811) {
    //   count = 26;
    // } else if (user.productId.length >= 317811 && user.productId.length < 514229) {
    //   count = 27;
    // } else if (user.productId.length >= 514229 && user.productId.length < 832040) {
    //   count = 28;
    // } else if (user.productId.length >= 832040 && user.productId.length < 1346269) {
    //   count = 29;
    // } else if (user.productId.length >= 1346269 && user.productId.length < 2178309) {
    //   count = 30;
    // } else if (user.productId.length >= 2178309 && user.productId.length < 3524578) {
    //   count = 31;
    // } else if (user.productId.length >= 3524578 && user.productId.length < 5702887) {
    //   count = 32;
    // } else if (user.productId.length >= 5702887 && user.productId.length < 9227465) {
    //   count = 33;
    // } else if (user.productId.length >= 9227465 && user.productId.length < 14930352) {
    //   count = 34;
    // } else if (user.productId.length >= 14930352 && user.productId.length < 24157817) {
    //   count = 35;
    // } else if (user.productId.length >= 24157817 && user.productId.length < 39088169) {
    //   count = 36;
    // } else if (user.productId.length >= 39088169 && user.productId.length < 63245986) {
    //   count = 37;
    // } else if (user.productId.length >= 63245986 && user.productId.length < 102334155) {
    //   count = 38;
    // } else if(user.productId.length>=102334155&&user.productId.length<202334155) {
    //   count = 39;
    // }
    // else if(user.productId.length>=202334155){
    //     count=40;
    // }

    
for (let i = 0; i < count && i < emojiArr.length; i++) {
    renderEmoji.push(emojiArr[i]);
  }
    
      


    return < div >
    <div className="block lg:inline-grid lg:h-[35vh]" style={{width:"100%",gridTemplateColumns:"1fr 2fr"}}>
    <div className="flex p-5 justify-center items-center" style={{width:"100%",}}><ProfilePhoto user={user} dimention={25}/></div>
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
    <div className="lg:inline-grid" style={{width:"100%", height:"44vh",gridTemplateColumns:"95fr 1fr 95fr"}}>
    <div className="p-5" style={{width:"100%"}}><div className="text-[22px]">Bought Product Ids</div>
    <div style={{height:"25vh",marginTop:"10px",overflow:"auto"}}>{user.productId.map((element)=>
    {
        return <div onClick={()=>{}} className="text-[20px] cursor-pointer  font-medium p-1"><img className="inline" src={Link} alt="" /> {element}</div>
    })}</div>
    </div>
    <div className="lg:h-[100%] my-6 bg-[#a9a9a9] "  style={{width:"10%"}}></div>
    <div  className="p-5" style={{width:"100%"}}>
        <div className="text-[22px]">
        Achievement
        </div>
        <div style={{height:"25vh",marginTop:"10px",overflow:"auto"}}>
        {
          
        
        
          renderEmoji.map((element)=>{
            return <div className="mx-2 inline-block">
               <img src={element} alt="" />
            </div>
        })}
        </div>
        </div>
    </div>
    </div>
}

export default {Account,ProfilePhoto};