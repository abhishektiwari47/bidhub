import { useRecoilState } from "recoil"
import { lazy } from "react";
import { activeListItemstate } from "../../data/RelatedStates"
import AllProduct from "./AllProducts";
import AllYourBid from "../buyer/AllYourBids";
import AllYourBoughtProducts from "../buyer/YourBoughtProducts";
import ProductForSell from "../seller/ProductForSell";
import Account from "./Account";
import AddMoney from "./AddMoney";
// const AllProduct = lazy(() => import('./AllProducts'));
// const AllYourBid = lazy(() => import('../buyer/AllYourBids'));
// const AllYourBoughtProducts = lazy(() => import('../buyer/YourBoughtProducts'));
// const ProductForSell = lazy(() => import('../seller/ProductForSell'));
// const Account = lazy(() => import('./Account'));
// const AddMoney = lazy(() => import('./AddMoney'));

export function DisplayArea(){
    const [activeListItem] = useRecoilState(activeListItemstate)
    const renderPage = ()=>{
        switch(activeListItem){
            case 0:
                return <AllProduct/>
            case 1:
                return <AllYourBid/>
            case 2:
                return <AllYourBoughtProducts/>
            case 3:
                return <ProductForSell/>
            case 4:
                return <Account/>
            case 5:
                return <AddMoney/>
           
        }
    }
    
    return <div className="part" style={{width:"75%",display:"inline-grid",gridTemplateColumns:"repeat(2, 1fr)",maxHeight:"80vh",overflow:(activeListItem==0||activeListItem==1||activeListItem==2||activeListItem==3)?"auto":"hidden",verticalAlign:"top", backgroundColor:"red"}}>
     {renderPage()}
   </div>
}