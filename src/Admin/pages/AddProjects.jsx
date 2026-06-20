import React from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import { TextInput, Button, FileInput, Label } from "flowbite-react";
import { addProjectAPI } from "../../services/allAPIs";

function AddProjects() {

  const [projectDetails,setProjectDetails]=React.useState({
    projectname:"",
    location:"",
    type:"",
    plotsize:"",
    direction:"",
    price:"",
    imageUrl:"",
    uploadedImages:[]
  })

  const [preview,setPreview] = React.useState("")

  const [previewList,setPreviewList] = React.useState([])

  const handleUpload=(e)=>{
    console.log(e.target.files[0]);
    let imgArray = projectDetails.uploadedImages
    if(imgArray.length<3){
      imgArray.push(e.target.files[0])
    }
    
    setProjectDetails({...projectDetails,uploadedImages:imgArray})

    let imgUrl = URL.createObjectURL(e.target.files[0])
    console.log(imgUrl);
    setPreview(imgUrl)

    let imageListArray = previewList
   if(imageListArray.length<3){
     imageListArray.push(imgUrl)
   }
    setPreviewList(imageListArray)
    console.log(previewList);
  }

  const handleAddProject=async()=>{
    console.log(projectDetails);   

     const {projectname,location,type,plotsize,direction,price,imageUrl,uploadedImages} = projectDetails

     if(projectname && location && type && plotsize && direction && price && imageUrl && uploadedImages){
      try{
        let token = sessionStorage.getItem("token")
        const reqHeader = {
          Authorization : `Bearer ${token}`
        }
        const reqBody = new FormData()
        
        for(let key in projectDetails){
          if(key!="uploadedImages"){
            reqBody.append(key,projectDetails[key])
          }
          else{
            projectDetails.uploadedImages.forEach(item=>(
              reqBody.append("uploadedImages",item)
            ))
          }
        }

        const response = await addProjectAPI(reqBody, reqHeader)
        console.log(response);
        if(response.status===200){
          alert(response.data.message)
          setProjectDetails({
            projectname:"",
            location:"",
            type:"",
            plotsize:"",
            direction:"",
            price:"",
            imageUrl:"",
            uploadedImages:[]
          })
          setPreview("");      
          setPreviewList([]); 
        }
       }
      catch(err){
        console.log(err);
        alert("Error while adding Project")
      }
     }
    else{
      alert("Please fill the form")
    }
  }

  return (
    <div>
      <AdminHeader/>
      <h1 className="text-3xl font-bold text-[#660000] m-6">
          Add New Project
        </h1>
      <div className="flex justify-center items-center mb-10">
      <form className="w-[50%] bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        

        <div className="mb-4">
          <TextInput onChange={e=>setProjectDetails({...projectDetails,projectname:e.target.value})} value={projectDetails.projectname} id="projectname" placeholder="Enter Project name" required />
        </div>

        <div className="mb-4">
          <TextInput onChange={e=>setProjectDetails({...projectDetails,location:e.target.value})} value={projectDetails.location} id="location" placeholder="Enter location" required />
        </div>

        <div className="mb-4">
          <TextInput onChange={e=>setProjectDetails({...projectDetails,type:e.target.value})} value={projectDetails.type} id="type" placeholder="Enter Type" />
        </div>

        <div className="mb-4">
          <TextInput onChange={e=>setProjectDetails({...projectDetails,plotsize:e.target.value})} value={projectDetails.plotsize} id="plotsize" placeholder="Enter Plot size in sq.ft" />
        </div>

        <div className="mb-4">
          <TextInput onChange={e=>setProjectDetails({...projectDetails,direction:e.target.value})} value={projectDetails.direction} id="direction" placeholder="Enter Facing Direction" />
        </div>

        <div className="mb-4">
          <TextInput onChange={e=>setProjectDetails({...projectDetails,price:e.target.value})} value={projectDetails.price} id="price" placeholder="Enter Price Range" />
        </div>
        <div className="mb-4">
          <TextInput onChange={e=>setProjectDetails({...projectDetails,imageUrl:e.target.value})} value={projectDetails.imageUrl} id="imageUrl" placeholder="Enter imageUrl" />
        </div>
        <div className="mb-4">
          <Label>
            <TextInput onChange={(e)=>handleUpload(e)} id="image" type="file" hidden />
          {
          preview ?
          <div className='flex justify-evenly items-center'> 
           {previewList.length <3 ?  <div className='flex justify-evenly items-center mb-5'>
            <img src={preview} className='h-50 m-5' alt="" width={'100px'}/> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF_M4I1GvoDwTHIIbgczZxaoygQQrK6fRcuQ&s" alt=""  width={'50px'}/>
           </div> : "" }
          
          </div>
          :  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyHlhRBUevbh8DcWe7o5epTHj3PS0o7vsV1A&s" className='h-50' alt="" />
         }

         {
          preview &&  previewList.length<=3 ? 
             <div className='flex justify-evenly items-center'>
             { previewList.map(item=> <img src={item} width={'100px'}/>)}
            </div>:""
           
         }
          </Label>
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleAddProject} className="bg-[#660000] text-white px-6">
            Add Project
          </Button>
        </div>
      </form>
    </div>
      <Footer/>
    </div>
  )
}

export default AddProjects
