// biome-ignore lint/style/useImportType: <explanation>
import React, { useState } from 'react';
import { Button, TextField, Grid, Container, Typography } from '@mui/material';

interface MatrixInputProps {
  onSubmit: (matrix: number[][]) => void;
}

const MatrixInput: React.FC<MatrixInputProps> = ({ onSubmit }) => {
  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);
  const [matrix, setMatrix] = useState<number[][] | null>(null);

  const handleMatrixChange = (row: number, col: number, value: string) => {
    if (matrix) {
      const newMatrix = matrix.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? Number.parseFloat(value) : c))
      );
      setMatrix(newMatrix);
    }
  };

  const handleMatrixSubmit = () => {
    if (matrix) {
      onSubmit(matrix);
    }
  };

  const handleDimensionsSubmit = () => {
    setMatrix(Array.from({ length: rows }, () => Array(columns).fill(0)));
  };

  return (
    <Container>
      {!matrix ? (
        <>
          <Typography variant="h4" gutterBottom>
            Enter Matrix Dimensions
          </Typography>
          <TextField
            label="Rows"
            type="number"
            value={rows}
            onChange={(e) => setRows(Number.parseInt(e.target.value))}
            style={{ marginRight: '10px' }}
          />
          <TextField
            label="Columns"
            type="number"
            value={columns}
            onChange={(e) => setColumns(Number.parseInt(e.target.value))}
          />
          <p> </p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDimensionsSubmit}
            style={{ marginTop: '20px' }}
          >
            Set Dimensions
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Enter Matrix Values
          </Typography>
          <Grid container spacing={2}>
            {matrix.map((row, rowIndex) => (
              <Grid container item spacing={2} key={`row-${rowIndex}-${Math.random()}`}>
                {row.map((value, colIndex) => (
                  <Grid item key={`col-${rowIndex}-${colIndex}-${Math.random()}`}>
                    <TextField
                      type="number"
                      value={value}
                      onChange={(e) => handleMatrixChange(rowIndex, colIndex, e.target.value)}
                    />
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleMatrixSubmit}
            style={{ marginTop: '20px' }}
          >
            Submit
          </Button>
        </>
      )}
    </Container>
  );
};

export default MatrixInput;