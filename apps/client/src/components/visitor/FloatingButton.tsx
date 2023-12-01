import { useState } from "react"
import { useRecoilState } from "recoil"
import { isDarkModeState, isFloatingState } from "../../data/RelatedStates"

function FloatingButton(){
    const [isDark] = useRecoilState(isDarkModeState)
    const [isFloating,setIsFloating] = useRecoilState(isFloatingState)
    return <div>
       <div className="overlay" style={{color:(isDark)?"white":"black", display:(isFloating)?"block":"hidden"}}  id="Support">Support</div>
       <div style={{color:(isDark)?"white":"black", display:(isFloating)?"block":"hidden"}}  id="TermsOfService">Terms Of Service</div>
       <div style={{color:(isDark)?"white":"black", display:(isFloating)?"block":"hidden"}}  id="PrivacyPolicy">Privacy Policy</div>
       <div style={{color:(isDark)?"white":"black", display:(isFloating)?"block":"hidden"}}  id="Cencellation">Cencellation</div>
       <div onChange={()=>setIsFloating(prev=>!prev)} className="bg-[#FF6B00]">?</div>
    </div>
}

export default FloatingButton;