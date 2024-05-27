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

export default function BarDonationOverAll({ name }) {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const responseComplete = await axios.get(`${WebHost}/kalinga/getTotalCompleteDonationsAllMonths?year=${selectedYear}`);
        const responseDecline = await axios.get(`${WebHost}/kalinga/getTotalDeclineDonationsAllMonths?year=${selectedYear}`);
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
  }, [selectedYear]); // Fetch data when selectedYear changes

  const mergeData = (completeData, declineData) => {
    return completeData.map(completeItem => ({
      month: completeItem.month,
      totalCompleteDonations: completeItem.totalCompleteDonations,
      totalDeclineDonations: declineData.find(item => item.month === completeItem.month)?.totalDeclineDonations || 0
    }));
  };

  const calculateTotals = (data) => {
    let totalCompleteDonations = 0;
    let totalDeclineDonations = 0;

    data.forEach(item => {
      totalCompleteDonations += item.totalCompleteDonations;
      totalDeclineDonations += item.totalDeclineDonations;
    });

    return { totalCompleteDonations, totalDeclineDonations };
  };

  const COLORS = ["#ED5077", "#007AFF"];

  const handleDownloadPDF = () => {
    const { totalCompleteDonations, totalDeclineDonations } = calculateTotals(monthlyData);

    const doc = new jsPDF();
    doc.setTextColor("#000000");
    doc.setFontSize(16);
    doc.text("KALINGA OVERALL DONATION REPORT", 105, 15, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Year: ${selectedYear}`, 20, 30);
    doc.text(`Total Complete Donations: ${totalCompleteDonations}`, 20, 40);
    doc.text(`Total Decline Donations: ${totalDeclineDonations}`, 20, 50);

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

    // Adding the total row at the end of the table
    tableRows.push(["Total", totalCompleteDonations, totalDeclineDonations]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      headStyles: { fillColor: "#ED5077" },
      bodyStyles: { textColor: "#000000" },
      footStyles: { fillColor: "#ED5077", textColor: "#FFFFFF" },
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 0) {
          doc.setTextColor("#000000"); // reset to black for table content
        }
      }
    });

    doc.save("KALINGA_OVERALL_DONATION_REPORT.pdf");
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center text-primary-default mb-4">{name}</h1>
      <div className="text-center mb-4">
        <div className="inline-block relative w-64">
          <select
            id="yearSelect"
            value={selectedYear}
            onChange={handleYearChange}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            {/* Add more options for other years */}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10 12l-5-5h10l-5 5z" />
            </svg>
          </div>
        </div>
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
          <YAxis domain={[0, 'auto']} />
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
