"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const RatingChart = ({ averageRatings }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (averageRatings) {
      const labels = [
        "Overall Satisfaction",
        "Reasonably Priced",
        "Quality Rating",
        "Effectiveness Rating",
        "Packaging Rating",
        "Skin Match Rating",
      ];

      const ratingsData = [
        averageRatings.overallSatisfaction,
        averageRatings.reasonablyPriced,
        averageRatings.qualityRating,
        averageRatings.effectivenessRating,
        averageRatings.packagingRating,
        averageRatings.skinMatchRating,
      ];

      const chartConfig = {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Average Ratings",
              data: ratingsData,
              backgroundColor: "#EE009D", // Adjust color as needed
              borderColor: "#000", // Adjust color as needed
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 5, // Assuming ratings are on a scale of 0-5
            },
          },
        },
      };

      const ctx = chartRef.current.getContext("2d");
      const ratingChart = new Chart(ctx, chartConfig);

      return () => {
        ratingChart.destroy();
      };
    }
  }, [averageRatings]);

  return <canvas ref={chartRef} width={400} height={300} />;
};

export default RatingChart;
