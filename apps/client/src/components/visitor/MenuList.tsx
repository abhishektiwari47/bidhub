import { useRecoilState } from "recoil"
import { activeListItemstate, logoutState, menuState } from "../../data/RelatedStates"
import { VerticalLine } from "../common"
import { useState } from "react";

function MenuList(){
    const [isDialogOpen, setDialogOpen] = useRecoilState(logoutState);
    const [menuOpen,setMenuOpen] = useRecoilState(menuState)
    const openDialog = () => {
        setDialogOpen(true);
      };
      
      let menuListStyle = `part w-[80%] sm:w-[15%] m-auto hidden sm:inline-flex text-center`;
      if(menuOpen){
        menuListStyle = `part m-auto sm:inline-flex text-center`;
      }

    const [activeListItem,setActiveListItem]=useRecoilState(activeListItemstate)
    return <div className={menuListStyle} style={{verticalAlign:"top"}}>
    <ul className="flex flex-col space-y-9 my-9 "  style={{listStyle: "none",padding:"0px",cursor:"pointer"}}>
     <li onClick={()=>{setActiveListItem(0);setMenuOpen(prev=>!prev)}} style={{ color: (activeListItem==0) ? '#ff6b00' : 'black' }}>Explore Product</li>
     <li onClick={()=>{setActiveListItem(1);setMenuOpen(prev=>!prev)}} style={{ color: (activeListItem==1) ? '#ff6b00' : 'black' }}>All Active Bids</li>
     <li onClick={()=>{setActiveListItem(2);setMenuOpen(prev=>!prev)}} style={{ color: (activeListItem==2) ? '#ff6b00' : 'black' }}>Buy History</li>
     <li onClick={()=>{setActiveListItem(3);setMenuOpen(prev=>!prev)}} style={{ color: (activeListItem==3) ? '#ff6b00' : 'black' }}>Your Products</li>
     <li onClick={()=>{setActiveListItem(4);setMenuOpen(prev=>!prev)}} style={{ color: (activeListItem==4) ? '#ff6b00' : 'black' }}>Your Profile</li>
     <li onClick={()=>{setActiveListItem(5);setMenuOpen(prev=>!prev)}} style={{ color: (activeListItem==5) ? '#ff6b00' : 'black' }}>Add Money To Wallet</li>
     <li onClick={()=>openDialog()} style={{ color: (activeListItem==6) ? '#ff6b00' : 'black' }}>Logout</li>
    </ul>
 </div>


}

export default MenuList;