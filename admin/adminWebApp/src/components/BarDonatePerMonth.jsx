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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch total complete donations
        const responseComplete = await axios.get(
          `${WebHost}/kalinga/getTotalCompleteDonationsAllMonths`, 
          { params: { year: selectedYear } }
        );
        // Fetch total complete requests
        const responseRequests = await axios.get(
          `${WebHost}/kalinga/getTotalCompleteRequestAllMonths`,
          { params: { year: selectedYear } }
        );
        // Merge the data from both responses
        const mergedData = mergeData(
          responseComplete.data,
          responseRequests.data
        );
        setMonthlyData(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

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
    doc.setTextColor("#FF69B4");
    doc.setFontSize(20);
    doc.text("KALINGA REPORT", 105, 15, { align: "center" });
    doc.setTextColor("#000000");
    autoTable(doc, {
      headStyles: { fillColor: [255, 105, 180] },
      head: [["Month", "Total Complete Donations", "Total Complete Requests"]],
      body: monthlyData.map(({ month, totalCompleteDonations, totalCompleteRequests }) => [month, totalCompleteDonations, totalCompleteRequests]),
      startY: 20,
    });
    doc.save(`${name}_report.pdf`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="year" className="mr-2">Select Year:</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="border-black border-solid border-1 rounded-md px-2 py-1"
          >
            <option value={new Date().getFullYear() - 1}>
              {new Date().getFullYear() - 1}
            </option>
            <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
            <option value={new Date().getFullYear() + 1}>
              {new Date().getFullYear() + 1}
            </option>
          </select>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="bg-pink-500 text-white py-2 px-4 rounded-xl focus:outline-none hover:bg-pink-600"
        >
          Download PDF
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
