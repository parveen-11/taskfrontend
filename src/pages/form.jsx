import React, { useState } from "react";
import Footer from "../layout/footer";
import Header from "../layout/header";
import "./form.css";
import Select from "react-select";
import { toast } from "react-toastify";

export default function Form() {
  const [selectedFile, setSelectedFile] = useState("Select file *Pdf only");
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [placeofbirth, setPlaceOfBirth] = useState("")
  const [jobrole, setJobRole] = useState("")
  const [file, setFile] = useState();

  function handleChange(e) {
    const fileName = e.target.files[0].name;
    const fileType = e.target.files[0].type;

    if (fileType === "application/pdf") {
      setFile(e.target.files[0]);
      setSelectedFile(fileName);

      toast.info("File selected successfully");
    } else {
     return toast.error("PDF file only.");
    }
  }

  const handleSubmission = async(e) => {
    e.preventDefault();
    if(name == '' || email == '' || date == '' || jobrole == '' || !file){
      return toast.error("All Filled Required")
    }
    var formdata = new FormData();
    formdata.append("name",name)
    formdata.append("email",email)
    formdata.append("date",date)
    formdata.append("jobRole",jobrole)
    formdata.append("placeofbirth",placeofbirth)
    formdata.append("file",file)
    var formSubmit = await fetch(`http://localhost:4013/api/create`,{
      method: 'POST',
      body: formdata
    })
    formSubmit = await formSubmit.json();
    if(formSubmit.status === "success"){
      return toast.success("Job Application Applied")
    }
  };

  return (
    <>
      <Header />
      <section className="ap-frm">
        <div className="container">
          <div className="fm">
            <form onSubmit = {handleSubmission}>
              <div className="form-group">
                <label htmlfor="exampleInputEmail1">Full Name</label>
                <input
                  type="text"
                  name = "name"
                  value = {name}
                  className="form-control"
                  placeholder="Name"
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlfor="exampleInputEmail1">Email</label>
                <input
                  type="email"
                  name = "email"
                  value = {email}
                  className="form-control"
                  placeholder="Enter Email Address"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlfor="exampleInputEmail1">Date</label>
                <input
                  type="date"
                  name= "date"
                  value = {date}
                  className="form-control"
                  placeholder="Enter Address here"
                  onChange={(e)=>setDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlfor="exampleInputEmail1">Place of birth</label>
                <input
                  type="text"
                  className="form-control"
                  value = {placeofbirth}
                  placeholder="Enter your place of birth"
                  onChange={handleChange}
                  onChange={(e)=>setPlaceOfBirth(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="jj" htmlfor="exampleInputEmail1">
                  Select Your Job
                </label>
                <select className="selection" onChange = {(e)=>setJobRole(e.target.value)}>
                <option value = {null} >Select Job Profile</option>
                <option value = "React JS Developer">React JS Developer</option>
                <option value = "Node JS Developer">Node JS Developer</option>
                <option value = "MERN Stack Developer">MERN Stack Developer</option>
                </select>
              </div>
              <div className="form-group file file--upload">
                <span className="sf">Upload Your CV</span>
                <label htmlFor="input-file">{selectedFile}</label>
                <input
                  id="input-file"
                  onChange={handleChange}
                  type="file"

                />
              </div>
              <div className="butoo">
                <button
                  type="submit"
                  
                  className="pst-btn2 btn btn-primary mb-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
