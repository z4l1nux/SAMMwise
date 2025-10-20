import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GaugeChart = ({ percent, nrOfLevels = 4, colors = ["#ff6384", "#ff9f40", "#ffcd56", "#4bc0c0"], textColor = "#000000", className = "" }) => {
  // Convert percent (0-1) to angle for needle
  const percentValue = typeof percent === 'number' ? percent : parseFloat(percent) || 0;
  const angle = Math.min(Math.max(percentValue, 0), 1) * 180 - 90; // -90 to 90 degrees
  
  // Create data for the gauge (semi-circle)
  const data = {
    datasets: [{
      data: [25, 25, 25, 25, 100], // 4 sections + empty bottom half
      backgroundColor: [...colors, 'transparent'],
      borderWidth: 0,
      circumference: 180,
      rotation: 270,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  };

  const percentageText = (percentValue * 100).toFixed(0) + '%';
  const scoreText = `${(percentValue * 3).toFixed(2)}/3`;

  return (
    <div className={className} style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <Doughnut data={data} options={options} />
      <div style={{
        position: 'absolute',
        top: '70%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: textColor,
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        <div>{percentageText}</div>
        <div style={{ fontSize: '18px', marginTop: '5px' }}>{scoreText}</div>
      </div>
    </div>
  );
};

export default GaugeChart;

