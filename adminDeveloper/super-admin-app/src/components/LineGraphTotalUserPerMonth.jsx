import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { WebHost } from "../../MyConstantSuperAdmin";

const LineGraphTotalUserPerMonth = () => {
    const [graphData, setGraphData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${WebHost}/kalinga/getTotalUserPerMonth`);
                console.log('Response data User:', response.data); // Log the response data to check its structure
                const data = response.data.data;
                console.log('Data:', data); // Log the extracted data to check its structure

                const labels = data.map((item) => {
                    const date = new Date(0, item.month - 1);
                    return date.toLocaleString('default', { month: 'long' });
                });
                const donorCounts = data.map((item) => item.donorCount);
                const requestorCounts = data.map((item) => item.requestorCount);

                setGraphData({
                    labels,
                    datasets: [
                        {
                            label: 'Donors',
                            data: donorCounts,
                            borderColor: 'blue', 
                            backgroundColor: 'rgba(0, 0, 255, 0.1)', 
                            fill: true,
                        },
                        {
                            label: 'Requestors',
                            data: requestorCounts,
                            borderColor: '#ED5077', 
                            backgroundColor: 'rgba(255, 192, 203, 0.1)', 
                            fill: true,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {graphData && graphData.labels ? (
                <Line 
                    data={graphData} 
                    options={{
                        scales: {
                            xAxes: [{
                                ticks: {
                                    fontSize: 16, // Adjust font size for x-axis labels
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    fontSize: 16, // Adjust font size for y-axis labels
                                }
                            }]
                        },
                    }}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default LineGraphTotalUserPerMonth;
