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
        <div>
          <Typography variant="h6">U Matrix:</Typography>
          <pre>{JSON.stringify(result.U, null, 2)}</pre>
          <Typography variant="h6">S Vector:</Typography>
          <pre>{JSON.stringify(result.S, null, 2)}</pre>
          <Typography variant="h6">VT Matrix:</Typography>
          <pre>{JSON.stringify(result.VT, null, 2)}</pre>
        </div>
      )}
    </Container>
  );
};

export default MatrixFactorization;