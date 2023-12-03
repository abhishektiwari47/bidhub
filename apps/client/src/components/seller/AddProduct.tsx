import { useNavigate} from "react-router-dom";
import BackButton from "../../assets/svg/BackButton.svg";
import BackButton2 from "../../assets/svg/BackButton2.svg";
// import mongoose from "mongoose";
import { useRecoilState } from "recoil";
import { imageState } from "../../data/ComponentData";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {activeListItemstate, isDarkModeState} from '../../data/RelatedStates';
import Folder from '../../assets/svg/Folder.svg';
import Camera from '../../assets/svg/Camera.svg';


// interface Bid {
//     amount: number,
//     userId: mongoose.Types.ObjectId,
// }

function AddProduct(){
   
  const [isDarkMode]= useRecoilState(isDarkModeState)
    const navigate = useNavigate();

    return <div className="p-[1px]" style={{backgroundColor:(isDarkMode)?"black":"white"}}>
    {/* Back Button */}
    <nav><img className="h-6 mx-6 my-6" src={(isDarkMode)?BackButton2:BackButton} onClick={() => navigate(-1)} alt="" /></nav>
    {/* main big block */}
     <div className=" px-4 flex flex-col lg:flex-row lg:space-x-20 mx-5" style={{  gridTemplateColumns:"1fr 1fr"}}>
      {/* camera side */}
     <div className="m-auto flex items-center " style={{width:"75%" }}>
         <div className=" flex flex-col items-center " style={{width:"100%",}}>
          {/* camera */}
          <h2 style={{color:(isDarkMode)?"white":"gray"}} className="mb-5 text-center ">
      We recommend you to take picture of the item from your webcam.
          </h2>
           <CameraView/>
         </div>
       
       </div>
      {/* form side */}
       <div className="m-auto flex justify-center items-center my-3"  style={{height:"85vh",  width:"75%" }}>
           {/* form */}
     <AddProductCard/>
       </div>
        
     </div>
    </div>
}
import Webcam from 'react-webcam'
import { base_url } from "../../store/constants";
// const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 500,
  height: 400,
  facingMode: 'environment',
}

// function downloadFile(file) {
//     const url = URL.createObjectURL(file);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = file.name;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     // Revoke the Object URL to free up resources
//     URL.revokeObjectURL(url);
//   }
  


const CameraView = () => {
  const [image,setImage]=useRecoilState(imageState)
console.log(image);
  
  const [picture, setPicture] = useState<string | null>(null);
  const webcamRef = React.useRef<Webcam>(null);

  function dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = Buffer.from(arr[arr.length - 1], 'base64');
    const n = bstr.length;
    const u8arr = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr[i];
    }

    return new File([u8arr], filename, { type: mime });
  }

  const capture = React.useCallback(() => {
    const currentWebcamRef = webcamRef.current;

    if (currentWebcamRef) {
      // Capture picture
      const pictureSrc = currentWebcamRef.getScreenshot();
      console.log(pictureSrc);

      // Ensure pictureSrc is either a string or null before setting state
      setPicture(pictureSrc || null);

      // Convert to File and set state
      const file = dataURLtoFile(pictureSrc?pictureSrc:"", 'image.jpeg');
      setPicture(pictureSrc || null);
      if(pictureSrc!=null){
      setImage(pictureSrc)}
     
      return file;
    } else {
      console.error("Webcam reference is null.");
      return null; // or handle the case where the webcamRef is null
    }
  }, []); // Empty dependency array

  // const handleFileChange = (e:any) => {
  //   const selectedFile = e.target.files[0];

  //   if (selectedFile) {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       const dataURL = reader.result;
  //       if(dataURL!=null)
  //       setImage(dataURL.toString());
  //     if(dataURL!=null)
  //     setPicture(dataURL.toString())
  //     console.log("this is image");
      
  //       console.log(image);
        
  //     };

  //     reader.readAsDataURL(selectedFile);
  //   }
  // };

  return (
    <div  >
  
    <div className=" border-2 overflow-clip rounded-lg">
      {picture == null ? (
        <Webcam
          audio={false}
          height={400}
          ref={webcamRef}
          width={400}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          mirrored={true}
        />
      ) : (
        <img src={picture} />
      )}
    </div>
    <div className="my-3 ">
    <div className="inline-block h-[100%]">
      
      {picture != null ? (
        <button
         
          onClick={(e) => {
            e.preventDefault()
            setPicture(null)

          }}
         className="bg-white border-2 border-[#4D94FF] text-[#4D94FF] rounded hover:bg-white px-20 py-2 my-auto"
        >
          Retake
        </button>
      ) : (
        <button
          

          onClick={(e) => {
            e.preventDefault()
            capture()
           
          }}
          className="bg-[#4D94FF] text-white rounded hover:bg-[#4479c7] px-28 py-2 "
        >
          Click
        </button>
      )}
      {/* here */}
      {/* <div className="text-center mt-3">
        <input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} />
      </div> */}
     {/* <div onClick={()=>{}} className="inline-block  px-8 cursor-pointer rounded-lg  mx-5 bg-[#D9D9D9]"><img className="inline-block h-10" src={Folder} alt="" /></div> */}
     </div>
    </div>
  </div>
  );
};







const AddProductCard= ()=>{
  const [activeListItem,setActiveListItem]=useRecoilState(activeListItemstate);
  console.log(activeListItem);
  
  const [name,setName]=useState('');
  const [description,setDescription]=useState('');
  const [originalPrice,setOriginalPrice]=useState(0);
  const [maxBid,setMaxBid]=useState(0);
  const [minBid,setMinBid]=useState(0);
  const [image,setImage] = useRecoilState(imageState)
  
  
  const navigate = useNavigate();
  useEffect(()=>{
    console.log("image set");
    
    setImage(Camera)
  },[])


  const handleAddProduct = async () => {
     let body = {name,description,originalPrice,image,maxBid,minBid,}
      const authorization = "Bearer "+localStorage.getItem('token')
      console.log(authorization);
      console.log(body);
      
      const response = await axios.post(`${base_url}/general/addProduct`, body,{
        headers:{
          Authorization:authorization
        }
      });
     
      if (response.status==201) {
          console.log(response.data);
          navigate("/home")
          setActiveListItem(3);

      } else {
          console.log(response);
          
          alert("invalid credentials");
      }
  };
  // const [isDarkMode]= useRecoilState(isDarkModeState)

  return <div   className="bg-white border-[1px] px-10 py-3 rounded border-[#8D8D8D]">
    <h2 className="text-center text-[22px] ">Product Details</h2>
    <h4 className="text-[#808080] text-[14px]">Name</h4>
    <input className="input1" type="text" onChange={(e)=>setName(e.target.value)} />
    <h4  className="text-[#808080] text-[14px]">Description</h4>
    <textarea className="input1 focus:border-2" onChange={(e)=>setDescription(e.target.value)} />
    <h4 className="text-[#808080] text-[14px]">Original Price</h4>
    <div className="border-[#808080] border-b-2"><input className="input2" type="number" onChange={(e)=>setOriginalPrice(Number(e.target.value))} /><span>INR</span></div>
    <h4 className="text-[#808080] text-[14px]">Max Bid Price</h4>
    <div className="border-[#808080] border-b-2"><input className="input2" type="number" onChange={(e)=>setMaxBid(Number(e.target.value))} /><span>INR</span></div>
    <h4 className="text-[#808080] text-[14px]">Min Bid Price</h4>
    <div className="border-[#808080] border-b-2"><input className="input2" type="number" onChange={(e)=>setMinBid(Number(e.target.value))} /><span>INR</span></div>
    <div className="text-center rounded bg-[#FF6B00] px-3 py-2 my-5"><button className="text-white text-medium" onClick={handleAddProduct}>AddProduct</button></div>
  </div>
}

export default AddProduct;