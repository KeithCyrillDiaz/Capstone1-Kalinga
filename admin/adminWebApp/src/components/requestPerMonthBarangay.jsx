import React, { useState, useEffect } from "react";
import axios from "axios";
import { WebHost } from "../../MyConstantAdmin";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function RequestPerMonthBarangay({ name, selectedMonth, selectedYear, selectedBarangay }) {
  const [totalCompleteRequests, setTotalCompleteRequests] = useState(0);
  const [totalDeclinedRequests, setTotalDeclinedRequests] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const monthValue = isNaN(parseInt(selectedMonth))
        ? getMonthValue(selectedMonth)
        : parseInt(selectedMonth);

      try {
        const response = await axios.get(
          `${WebHost}/kalinga/getTotalCompleteRequestBarangay`,
          {
            params: {
              selectedMonth: monthValue,
              selectedYear: parseInt(selectedYear),
              selectedBarangay: selectedBarangay
            },
          }
        );
        const completeData = response.data;
        setTotalCompleteRequests(completeData.totalCompleteRequests);

        const Declineresponse = await axios.get(
          `${WebHost}/kalinga/getTotalDeclineRequestBarangay`,
          {
            params: {
              selectedMonth: monthValue,
              selectedYear: parseInt(selectedYear),
              selectedBarangay: selectedBarangay
            },
          }
        );
        const declineData = Declineresponse.data;
        setTotalDeclinedRequests(declineData.totalDeclineRequests);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, selectedYear, selectedBarangay]);

  const getMonthValue = (monthName) => {
    const monthsMap = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };
    return monthsMap[monthName] || null;
  };

  const chartOptions = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
      height: 300,
      width: 300
    },
    title: {
      text: name,
      style: {
        color: "#ED5077", // Pink color for the title
        fontSize: "20px", // Larger font size for the title
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
        },
        innerSize: "50%",
      },
    },
  
    series: [
      {
        name: "Donations",
        data: [
          { name: "Successful", y: totalCompleteRequests, color: "#ED5077", dataLabels: { style: { fontSize: "20px" } } }, // Pink color for Successful
          { name: "Unsuccessful", y: totalDeclinedRequests, color: "#007AFF", dataLabels: { style: { fontSize: "20px" } } }, // Blue color for Unsuccessful
        ],
        dataLabels: {
          style: {
            fontSize: "16px", // Default font size for data labels
          },
          // Increase font size when hovering
          allowOverlap: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f}%',
          formatter: function () {
            return '<b style="font-size:18px">' + this.point.name + '</b>: ' + this.point.percentage.toFixed(1) + '%';
          },
          useHTML: true,
        },
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}
