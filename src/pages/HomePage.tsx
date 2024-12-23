// biome-ignore lint/style/useImportType: <explanation>
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'

const HomePage: React.FC = () => {
  const navigate = useNavigate()

  const handleMatrixMultiplication = () => {
    navigate('/matrix/multiply')
  }

  const handleMatrixFactorization = () => {
    navigate('/matrix/factorization')
  }

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Matrix Operations
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleMatrixMultiplication}
        style={{ marginRight: '10px' }}
      >
        Matrix Multiplication
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleMatrixFactorization}
      >
        Matrix Factorization
      </Button>
    </Container>
  )
}

export default HomePage