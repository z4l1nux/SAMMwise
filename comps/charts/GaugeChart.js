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
  
  // Create data for the gauge (semi-circle) based on actual score
  const scorePercentage = percentValue * 100;
  const filledSections = Math.floor(scorePercentage / 25); // How many sections should be filled
  const remainingPercentage = scorePercentage % 25; // Remaining percentage for partial fill
  
  // Create data array: filled sections + partial section + empty sections + bottom half
  const dataArray = [];
  const backgroundColors = [];
  
  // Add filled complete sections
  for (let i = 0; i < filledSections; i++) {
    dataArray.push(25);
    backgroundColors.push(colors[i]);
  }
  
  // Add partial section if needed
  if (remainingPercentage > 0 && filledSections < 4) {
    dataArray.push(remainingPercentage);
    backgroundColors.push(colors[filledSections]);
  }
  
  // Add empty sections
  for (let i = filledSections + (remainingPercentage > 0 ? 1 : 0); i < 4; i++) {
    dataArray.push(0);
    backgroundColors.push(colors[i]);
  }
  
  // Add bottom half (always empty)
  dataArray.push(100);
  backgroundColors.push('transparent');
  
  const data = {
    datasets: [{
      data: dataArray,
      backgroundColor: backgroundColors,
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

