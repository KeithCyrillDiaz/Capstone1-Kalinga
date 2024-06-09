import React, { useState, useEffect } from "react";
import { WebHost } from "../../MyConstantAdmin";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getToken } from "../functions/Authentication";

export default function BarangayGraph({ name }) {
  const [barangaysData, setBarangaysData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      try {
        const response = await axios.get(`${WebHost}/kalinga/getTotalUsersPerBarangay`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { totalRequestorsPerBarangay, totalDonorsPerBarangay } = response.data;

        // Create a map of all barangays
        const barangayMap = {};

     
        totalRequestorsPerBarangay.forEach((requestor) => {
          barangayMap[requestor._id] = {
            barangay: requestor._id,
            totalRequestors: requestor.totalRequestors,
            totalDonors: 0, 
          };
        });

        
        totalDonorsPerBarangay.forEach((donor) => {
          if (barangayMap[donor._id]) {
            barangayMap[donor._id].totalDonors = donor.totalDonors;
          } else {
            barangayMap[donor._id] = {
              barangay: donor._id,
              totalRequestors: 0, 
              totalDonors: donor.totalDonors,
            };
          }
        });

        const mergedData = Object.values(barangayMap);

        setBarangaysData(mergedData);
        console.log("Barangays Data:", mergedData);
        console.log("response Data:", response.data);
      } catch (error) {
        console.error("Error fetching total users per barangay:", error);
      }
    };

    fetchData();
  }, []);
  
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setTextColor("#000000");
    doc.setFontSize(16);
    doc.text("KALINGA OVERALL DONATION REPORT", 105, 15, { align: "center" });

    const tableColumn = ["Barangay", "Total Requestors", "Total Donors"];
    const tableRows = [];

    barangaysData.forEach((item) => {
      const rowData = [item._id, item.totalRequestors, item.totalDonors];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      headStyles: { fillColor: [255, 105, 180], halign: "center" },
      didDrawCell: (data) => {
        if (data.section === "body" && data.column.index === 0) {
          doc.setTextColor("#ED5077");
        }
      },
      columnStyles: {
        0: { halign: "center" },
        1: { halign: "center" },
        2: { halign: "center" },
      },
    });

    doc.save("Kalinga_Barangay_Report.pdf");
};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center text-primary-default">{name}</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={barangaysData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="totalRequestors"
            stackId="a"
            fill="#ED5077"
            name="Total Requestors"
            barSize={50}
          />
          <Bar
            dataKey="totalDonors"
            stackId="a"
            fill="#007AFF"
            name="Total Donors"
            barSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="text-center mt-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
}
