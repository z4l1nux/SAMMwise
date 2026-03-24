import React from 'react';

interface DisplayResultsProps {
  data: any;
}

const DisplayResults: React.FC<DisplayResultsProps> = ({ data }) => {
  return (
    <>
      <h1>{data}</h1>
    </>
  );
};

export default DisplayResults;
