import React, { useState, useEffect } from "react";
import axios from "axios";
import { WebHost } from "../../MyConstantAdmin";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function DonatePerMonth({ name, selectedMonth, selectedYear }) {
  const [totalCompleteDonations, setTotalCompleteDonations] = useState(0);
  const [totalDeclinedDonations, setTotalDeclinedDonations] = useState(0);
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
        const responseComplete = await axios.get(
          `${WebHost}/kalinga/getTotalCompleteDonationPerMonth`,
          {
            params: {
              selectedMonth: monthValue,
              selectedYear: parseInt(selectedYear),
            },
          }
        );
        const completeData = responseComplete.data;
        setTotalCompleteDonations(completeData.totalCompleteAppointments);

        const responseDecline = await axios.get(
          `${WebHost}/kalinga/getTotalDeclineDonationPerMonth`,
          {
            params: {
              selectedMonth: monthValue,
              selectedYear: parseInt(selectedYear),
            },
          }
        );
        const declineData = responseDecline.data;
        setTotalDeclinedDonations(declineData.totalDeclineAppointments);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, selectedYear]);

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
    },
    title: {
      text: name,
      style: {
        color: "#ED5077", 
        fontSize: "20px", 
      },
    },
    credits: {
      enabled: false, 
    },
  
    series: [
      {
        name: "Donations",
        data: [
          { name: "Successful", y: totalCompleteDonations, color: "#ED5077", dataLabels: { style: { fontSize: "20px" } } }, // Pink color for Successful
          { name: "Unsuccessful", y: totalDeclinedDonations, color: "#007AFF", dataLabels: { style: { fontSize: "20px" } } }, // Blue color for Unsuccessful
        ],
        dataLabels: {
          style: {
            fontSize: "16px", 
          },
          
          allowOverlap: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f}%',
          formatter: function () {
            return '<b style="font-size:18px">' + this.point.name + '</b>: ' + this.point.percentage.toFixed(1) + '%';
          },
          useHTML: true,
        },
        innerSize: "50%", 
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
