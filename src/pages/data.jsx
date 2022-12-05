import React, { useState,useEffect } from "react";
import Footer from "../layout/footer";
import Header from "../layout/header";
import DataTable from "react-data-table-component";
import "./data.css";
import {Button,Modal} from "react-bootstrap";
import { toast } from "react-toastify";


export default function Data() {
  const [id,setId] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (_id) => {setShow(true)
    setId(_id)
  };

  const [data,setData] = useState([])
  async function dataGet(){
  let getList = await fetch(`http://localhost:4013/api/getlist`,{
    method: "Get",
    // mode: 'no-cors',
   });
    getList = await getList.json();
    setData(getList.resopnse)
  }
  // console.log(data)
  useEffect(()=>{
   dataGet()
  },[data])
  /*delete cv api*/
  async function deleteApplication(_id){
    var deleteCv = await fetch(`http://localhost:4013/api/deletecv`,{
      method: 'Post',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        _id: id
      })
     })
    deleteCv = await deleteCv.json() 
    if(deleteCv.status === true){
       setShow(false);
       toast.success("Application Delete Successfully")
    }
    else{
      setShow(false);
    }
  }

  /*resume download*/
  const columns = [
    {
      name: "S-no.",
      selector: (row,index) => index + 1,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Place of Birth",
      selector: (row) => row.placeofbirth,
    },
    {
      name: "Job Role",
      selector: (row) => row.jobRole,
    },
    {
      name: "Download Resume",
      selector: (row,cv) => (
        <a href={"http://localhost:4013/download/"+row.cv} target="blank">
        <button className="download-btn">
          <i  className="fa-solid fa-download"></i>
        </button></a>
      ),
    },
    {
      name: "Delete Resume",
      selector: (row,id) => (
        <button className="delete-btn" onClick={()=>handleShow(row._id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      ),
    },
  ];
  return (
    <>
      <Header />
      <div>
        <div className="data_box ">
          <DataTable pagination columns={columns} data={data} />
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete !</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={deleteApplication}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
