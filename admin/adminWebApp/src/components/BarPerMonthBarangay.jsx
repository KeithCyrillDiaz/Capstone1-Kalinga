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
import { getToken } from "../functions/Authentication";

export default function BarPerMonthBarangay({ name, selectedYear, selectedBarangay }) {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = getToken()
      try {
        const responseComplete = await axios.get(
          `${WebHost}/kalinga/getTotalCompleteDonationsAllMonthsBarangay`,
          { 
            params: { selectedYear: selectedYear, selectedBarangay: selectedBarangay},
            headers: {Authorization: `Bearer ${token}`} 
          },
        );
        const responseRequests = await axios.get(
          `${WebHost}/kalinga/getTotalCompleteRequestAllMonthsBarangay`,
          { 
            params: { selectedYear: selectedYear, selectedBarangay: selectedBarangay},
            headers: {Authorization: `Bearer ${token}`}
           },
        );
        const mergedData = mergeData(
          responseComplete.data,
          responseRequests.data
        );
        setMonthlyData(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear, selectedBarangay]);

  const mergeData = (donationData, requestData) => {
    return donationData.map((donationItem) => ({
      month: donationItem.month,
      totalCompleteDonations: donationItem.totalCompleteDonations,
      totalCompleteRequests:
        requestData.find((item) => item.month === donationItem.month)
          ?.totalCompleteRequests || 0,
    }));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setTextColor("#000000");
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("KALINGA REPORT", 105, 15, { align: "center" });
  
    doc.text(`Year: ${selectedYear} ${selectedBarangay}`, 105, 30, { align: "center" });
  
    doc.setTextColor("#000000");
    autoTable(doc, {
      headStyles: { fillColor: "#ED5077" },
      head: [["Month", "Total Complete Donations", "Total Complete Requests"]],
      body: monthlyData.map(({ month, totalCompleteDonations, totalCompleteRequests }) => [month, totalCompleteDonations, totalCompleteRequests]),
      startY: 40, 
    });
    doc.save(`Total Report_${selectedBarangay} report.pdf`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-end mb-4"> {/* Updated className */}
        <button
          onClick={handleDownloadPDF}
          className="bg-pink-500 text-white py-2 px-4 rounded-xl focus:outline-none hover:bg-pink-600"
        >
          Export as PDF
        </button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={monthlyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, "auto"]} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="totalCompleteDonations"
            fill="#ED5077"
            name="Total Complete Donations"
            stackId="stack"
          />
          <Bar
            dataKey="totalCompleteRequests"
            fill="#007AFF"
            name="Total Complete Requests"
            stackId="stack"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
