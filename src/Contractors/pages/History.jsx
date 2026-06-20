import React from 'react'
import ContractorHeader from '../components/ContractorHeader'
import Footer from '../../components/Footer'
import { Card, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { viewWorkHistoryAPI } from '../../services/allAPIs'
import { useEffect } from 'react'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function History() {
  const [workHistory, setWorkHistory] = React.useState([])

  useEffect(() => {
    getWorkHistory()
  }, [])

  const getWorkHistory = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await viewWorkHistoryAPI(reqHeader)
      console.log(response);
      setWorkHistory(response.data.history)
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleDownload = async () => {
    try {
      const element = document.getElementById("result");
      if (!element) {
        console.error("Element not found!");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,          
        allowTaint: false,      
        onclone: (clonedDoc) => {
          const target = clonedDoc.getElementById("result");
          if (target) {
            target.querySelectorAll("*").forEach(node => {
              node.style.color = "#000000";
              node.style.backgroundColor = "#ffffff";
              node.style.boxShadow = "none";
              node.style.borderColor = "#000000";
            });
          }
        }
      });

      const imgData = canvas.toDataURL("image/png");
      console.log(imgData);
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
   

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      pdf.save("work-history.pdf");
      const timezone = new Date()
      console.log(timezone);
      //formated date and time
      const formatedDate = `${timezone.toLocaleDateString()} ,  ${timezone.toLocaleTimeString()}`
      console.log(formatedDate);
 
    } 
    catch (err) {
      console.error("Error generating PDF:", err);
    }
  }

  return (
    <div>
      <ContractorHeader />
      <h1 className="text-3xl font-bold m-6" style={{ color: "#660000" }}>Work History</h1>
      <div className="flex justify-end me-12 mb-4">
        <Button
          onClick={handleDownload} style={{ backgroundColor: "#660000", color: "#ffffff" }}
        >
          Download All
        </Button>
      </div>
      <div id="result" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-5" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
        {
          workHistory.length > 0 ?
            workHistory.map(item => (
              <Card key={item._id}
                className="max-w-sm shadow-md"
                imgAlt="Afzal Khan Residence"
                imgSrc={`http://localhost:3000/uploads/${item.uploadedImage}`}
              >
                <h3 className="text-lg font-semibold" style={{ color: "#660000" }}>Project Name : {item.projectname}</h3>
                <p className="text-sm" style={{ color: "#333333" }}>Project Type : {item.type}</p>
                <p className="text-sm" style={{ color: "#333333" }}>Location :{item.location}</p>
                <p className="text-sm" style={{ color: "#333333" }}>Date :{item.date}</p>
                <p className="text-sm" style={{ color: "#333333" }}>Status :{item.status}</p>

              </Card>
            ))
            : "No Work History Found"
        }
      </div>
      <Footer />
    </div>

  )
}

export default History
