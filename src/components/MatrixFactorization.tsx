// biome-ignore lint/style/useImportType: <explanation>
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import MatrixInput from './MatrixInput.tsx';

const MatrixFactorization: React.FC = () => {
  const [result, setResult] = useState<{ U: number[][]; S: number[]; VT: number[][] } | null>(null);

  const handleMatrixSubmit = async (matrix: number[][]) => {
    try {
      const response = await axios.post('http://localhost:8000/matrix/factorization', { matrix });
      setResult(response.data);
    } catch (error) {
      console.error('Error performing matrix factorization:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Matrix Factorization
      </Typography>
      <MatrixInput onSubmit={handleMatrixSubmit} />
      {result && (
        <div style={{
          position: 'absolute',
          top: '60%',
          left: '400px',
          backgroundColor: 'white',
          padding: '20px',
          fontSize: '24px',
          border: '1px solid black',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
        }}>

          <Typography variant="h6">U Matrix:</Typography>
          <pre>
            <code style={{ fontSize: '24px' }}> 
              {result.U.map((row) => (
                <div key={row.join('-')}>
                  [{row.join(', ')}]
                  <br />
                </div>
              ))} 
            </code>
          </pre>


          <Typography variant="h6">S Vector:</Typography>
          <pre>
            <code style={{ fontSize: '24px' }}> 
              {result.S.map((row) => (
                <div key={row}>
                  [{row}]
                  <br />
                </div>
              ))} 
            </code>
          </pre>


          <Typography variant="h6">VT Matrix:</Typography>
          <pre>
            <code style={{ fontSize: '24px' }}> 
              {result.VT.map((row) => (
                <div key={row.join('-')}>
                  [{row.join(', ')}]
                  <br />
                </div>
              ))} 
            </code>
          </pre>
        </div>
      )}
    </Container>
  );
};

export default MatrixFactorization;