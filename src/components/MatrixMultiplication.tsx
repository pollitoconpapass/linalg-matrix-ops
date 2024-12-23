// biome-ignore lint/style/useImportType: <explanation>
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';
import MatrixInput from './MatrixInput.tsx';

const MatrixMultiplication: React.FC = () => {
  const [matrix1, setMatrix1] = useState<number[][] | null>(null);
  const [matrix2, setMatrix2] = useState<number[][] | null>(null);
  const [result, setResult] = useState<number[][] | null>(null);

  const handleMatrix1Submit = (matrix: number[][]) => {
    setMatrix1(matrix);
  };

  const handleMatrix2Submit = (matrix: number[][]) => {
    setMatrix2(matrix);
  };

  const handleMultiply = async () => {
    if (matrix1 && matrix2) {
      try {
        const response = await axios.post('http://localhost:8000/matrix/multiply', { matrix1, matrix2 });
        setResult(response.data.result);
      } catch (error) {
        console.error('Error performing matrix multiplication:', error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Matrix Multiplication
      </Typography>
      <Typography variant="h6" gutterBottom>
        Enter values for Matrix 1:
      </Typography>
      <MatrixInput onSubmit={handleMatrix1Submit} />
      <Typography variant="h6" gutterBottom>
        Enter values for Matrix 2:
      </Typography>
      <MatrixInput onSubmit={handleMatrix2Submit} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleMultiply}
        style={{ marginTop: '20px' }}
        disabled={!matrix1 || !matrix2}
      >
        Multiply
      </Button>
      {result && (
        <div>
          <Typography variant="h6">Result Matrix:</Typography>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </Container>
  );
};

export default MatrixMultiplication;