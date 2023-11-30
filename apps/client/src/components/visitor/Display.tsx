import { useRecoilState } from "recoil"
import { activeListItemstate, menuState } from "../../data/RelatedStates"
import AllProduct from "./AllProducts";
import AllYourBid from "../buyer/AllYourBids";
import AllYourBoughtProducts from "../buyer/YourBoughtProducts";
import ProductForSell from "../seller/ProductForSell";
import AccountComponent from "./Account";
import AddMoney from "./AddMoney";

const {Account} = AccountComponent;
// const AllProduct = lazy(() => import('./AllProducts'));
// const AllYourBid = lazy(() => import('../buyer/AllYourBids'));
// const AllYourBoughtProducts = lazy(() => import('../buyer/YourBoughtProducts'));
// const ProductForSell = lazy(() => import('../seller/ProductForSell'));
// const Account = lazy(() => import('./Account'));
// const AddMoney = lazy(() => import('./AddMoney'));

export function DisplayArea(){
    const [activeListItem] = useRecoilState(activeListItemstate)
    const [menuOpen]=useRecoilState(menuState)
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
 
    const gridStyle= (activeListItem==0 || activeListItem==1)?"lg:inline-grid":"lg:inline-block";
    const overflowStyle = (activeListItem==0||activeListItem==1||activeListItem==2||activeListItem==3)?"overflow-auto":"overflow-scroll lg:overflow-hidden";
    
    const displayStyle =(menuOpen)?`hidden ${gridStyle} ${overflowStyle} lg:w-[80%] m-auto lg:max-h-[70vh] max-h-[80vh]`:`block ${gridStyle} ${overflowStyle}  m-auto w-[100%] lg:w-[80%] lg:max-h-[70vh] max-h-[80vh]`

    
    return <div className={displayStyle} style={{gridTemplateColumns:"repeat(2, 1fr)",verticalAlign:"top"}}>
     {renderPage()}
   </div>
}