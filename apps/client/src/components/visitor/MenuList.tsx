import { useRecoilState } from "recoil"
import { activeListItemstate, logoutState } from "../../data/RelatedStates"
import { VerticalLine } from "../common"
import { useState } from "react";

function MenuList(){
    const [isDialogOpen, setDialogOpen] = useRecoilState(logoutState);
    
    const openDialog = () => {
        setDialogOpen(true);
      };

    const [activeListItem,setActiveListItem]=useRecoilState(activeListItemstate)
    return <div className="part" style={{width:"20%",display:"inline-block",verticalAlign:"top"}}>
    <ul style={{listStyle: "none", display:"block",padding:"0px",cursor:"pointer"}}>
     <li onClick={()=>{setActiveListItem(0)}} style={{ color: (activeListItem==0) ? '#ff6b00' : 'black' }}>Explore Product</li>
     <li onClick={()=>{setActiveListItem(1)}} style={{ color: (activeListItem==1) ? '#ff6b00' : 'black' }}>All Active Bids</li>
     <li onClick={()=>{setActiveListItem(2)}} style={{ color: (activeListItem==2) ? '#ff6b00' : 'black' }}>Buy History</li>
     <li onClick={()=>{setActiveListItem(3)}} style={{ color: (activeListItem==3) ? '#ff6b00' : 'black' }}>Your Products</li>
     <li onClick={()=>{setActiveListItem(4)}} style={{ color: (activeListItem==4) ? '#ff6b00' : 'black' }}>Your Profile</li>
     <li onClick={()=>{setActiveListItem(5)}} style={{ color: (activeListItem==5) ? '#ff6b00' : 'black' }}>Add Money To Wallet</li>
     <li onClick={()=>openDialog()} style={{ color: (activeListItem==6) ? '#ff6b00' : 'black' }}>Logout</li>
    </ul>
 </div>


}

export default MenuList;