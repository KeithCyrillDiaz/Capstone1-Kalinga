import React, { useState, useEffect } from "react";
import axios from "axios";
import { WebHost } from "../../MyConstantAdmin";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function BarDonatePerMonth({ name }) {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch total complete donations
        const responseComplete = await axios.get(`${WebHost}/kalinga/getTotalCompleteDonationsAllMonths`);
        // Fetch total decline donations
        const responseDecline = await axios.get(`${WebHost}/kalinga/getTotalDeclineDonationsAllMonths`);
        // Merge the data from both responses
        const mergedData = mergeData(responseComplete.data, responseDecline.data);
        setMonthlyData(mergedData);
      } catch (error) {
        console.error('Error fetching donations:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const mergeData = (completeData, declineData) => {
    return completeData.map(completeItem => ({
      month: completeItem.month,
      totalCompleteDonations: completeItem.totalCompleteDonations,
      totalDeclineDonations: declineData.find(item => item.month === completeItem.month)?.totalDeclineDonations || 0
    }));
  };

  
  const COLORS = ["#ED5077", "#007AFF"]; // Add blue color for decline donations

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setTextColor("#ED5077");
    doc.setFontSize(16);
    doc.text("KALINGA OVERALL DONATION REPORT", 105, 15, { align: "center" });

    const tableColumn = ["Month", "Total Complete Donations", "Total Decline Donations"];
    const tableRows = [];

    monthlyData.forEach(item => {
      const rowData = [
        item.month,
        item.totalCompleteDonations,
        item.totalDeclineDonations,
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      headStyles: { fillColor: "#ED5077" }, // Set the header background color to pink
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 0) {
          doc.setTextColor("#ED5077"); // Set the text color for the first column (Month) to pink
        }
      }
    });

    doc.save("KALINGA_OVERALL_DONATION_REPORT.pdf");
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
          data={monthlyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 'auto']} /> {/* Adjust the YAxis domain */}
          <Tooltip />
          <Legend />
          <Bar dataKey="totalCompleteDonations" fill={COLORS[0]} name="Total Complete Donations" stackId="a" />
          <Bar dataKey="totalDeclineDonations" fill={COLORS[1]} name="Total Decline Donations" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
      <div className="text-center mt-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Report as PDF
        </button>
      </div>
    </div>
  );
}
