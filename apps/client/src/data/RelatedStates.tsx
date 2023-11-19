import { atom,selector } from "recoil";

const fontSizeState = atom({
    key: 'fontSizeState',
    default: 14,
  });
const buyProductState = atom({
  key:'buyProductState',
  default:""
})
  
  const activeListItemstate= atom({
    key: 'activeListIemState',
    default: 0,
  });

  const logoutState = atom({
    key:'logoutState',
    default:false
  })
  const buyState = atom({
    key:'buyState',
    default:false
  })
const fontSizeLabelState = selector({
    key: 'fontSizeLabelState',
    get: ({get}) => {
      const fontSize = get(fontSizeState);
      const unit = 'px';
  
      return `${fontSize}${unit}`;
    },
  });
export {fontSizeState,fontSizeLabelState,activeListItemstate,logoutState,buyState,buyProductState};