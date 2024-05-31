import React, { useState, useEffect } from "react";
import { WebHost } from "../../MyConstantAdmin";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function BarangayGraph({ name }) {
  const [barangaysData, setBarangaysData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${WebHost}/kalinga/getTotalUsersPerBarangay`);
        console.log("Response from API:", response.data);

        const mergedData = response.data.totalRequestorsPerBarangay.map((requestor) => {
          const donor = response.data.totalDonorsPerBarangay.find((d) => d._id === requestor._id);
          return {
            _id: requestor._id,
            totalRequestors: requestor.totalRequestors,
            totalDonors: donor ? donor.totalDonors : 0,
          };
        });

        setBarangaysData(mergedData);
      } catch (error) {
        console.error("Error fetching total users per barangay:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setTextColor("#ED5077");
    doc.setFontSize(16);
    doc.text("KALINGA OVERALL DONATION REPORT", 105, 15, { align: "center" });

    const tableColumn = ["Barangay", "Total Requestors", "Total Donors"];
    const tableRows = [];

    barangaysData.forEach(item => {
      const rowData = [
        item._id,
        item.totalRequestors,
        item.totalDonors,
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      headStyles: { fillColor: "#ED5077" }, 
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 0) {
          doc.setTextColor("#ED5077"); 
        }
      }
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
