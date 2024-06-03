import React, { useState, useEffect } from "react";
import axios from "axios";
import { WebHost } from "../../MyConstantAdmin";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getToken } from "../functions/Authentication";

export default function DonatePerMonthBarangay({ name, selectedMonth, selectedYear, selectedBarangay }) {
  const [totalCompleteDonations, setTotalCompleteDonations] = useState(0);
  const [totalDeclinedDonations, setTotalDeclinedDonations] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const token = getToken()
      const monthValue = isNaN(parseInt(selectedMonth))
        ? getMonthValue(selectedMonth)
        : parseInt(selectedMonth);

      try {
        const responseComplete = await axios.get(
          `${WebHost}/kalinga/getTotalCompleteDonationPerBarangay`,
          {
            params: {
              selectedMonth: monthValue,
              selectedYear: parseInt(selectedYear),
              selectedBarangay: selectedBarangay,
            },
            headers: {Authorization: `Bearer ${token}`}
          }
        );

        const completeData = responseComplete.data.totalCompleteAppointments;
        setTotalCompleteDonations(completeData);

        const responseDecline = await axios.get(
          `${WebHost}/kalinga/getTotalDeclineDonationPerBarangay`,
          {
            params: {
              selectedMonth: monthValue,
              selectedYear: parseInt(selectedYear),
              selectedBarangay: selectedBarangay,
            },
            headers: {Authorization: `Bearer ${token}`}
            
          }
        );

        const declineData = responseDecline.data.totalDeclineAppointments;
        setTotalDeclinedDonations(declineData);
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
      width: 300,
    },
    title: {
      text: name,
      style: {
        color: "#ED5077",
        fontSize: "16px",
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
        data: [
          { name: "Successful", y: totalCompleteDonations, color: "#ED5077" },
          { name: "Unsuccessful", y: totalDeclinedDonations, color: "#007AFF" },
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
