
import { useRecoilState } from "recoil"
import { isFloatingState } from "../../data/RelatedStates"
import { useNavigate } from "react-router-dom"

function FloatingButton(){
    const [isFloating,setIsFloating] = useRecoilState(isFloatingState)
    console.log("the value after rebuild");
    const navigate = useNavigate();
    console.log(isFloating);
    
    return <div className="fixed z-10 right-0 text-center justify-center items-start bottom-0 p-4">
        <div className="rounded-xl px-2 my-1" style={{backgroundColor:"black"}}>
       <div className="hover:cursor-pointer" style={{color:"white", display:(isFloating)?"block":"none"}}  id="Support" onClick={()=>navigate("/contactUs")}>Contact</div>
       <div className="hover:cursor-pointer" style={{color:"white", display:(isFloating)?"block":"none"}}  id="TermsOfService" onClick={()=>navigate("/termsOfService")}>Terms</div>
       <div className="hover:cursor-pointer" style={{color:"white", display:(isFloating)?"block":"none"}}  id="PrivacyPolicy" onClick={()=>navigate("/privacyPolicy")}>Privacy</div>
       <div className="hover:cursor-pointer" style={{color:"white", display:(isFloating)?"block":"none"}}  id="Cencellation" onClick={()=>navigate("/refundPolicy")}>Refund</div>
       </div>
       
       <div onClick={()=>{setIsFloating(prev=>!prev);console.log(isFloating);
       }} className="bg-[#FF6B00] w-7 h-7 text-center justify-center items-center align-middle hover:cursor-pointer flex  rounded-full mx-7 text-white shadow shadow-gray-950"><p>#</p></div>
    </div>
}

export default FloatingButton;