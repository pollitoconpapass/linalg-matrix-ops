// biome-ignore lint/style/useImportType: <explanation>
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import MatrixMultiplication from './components/MatrixMultiplication.tsx'
import MatrixFactorization from './components/MatrixFactorization.tsx'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/matrix/multiply" element={<MatrixMultiplication />} />
        <Route path="/matrix/factorization" element={<MatrixFactorization />} />
      </Routes>
    </Router>
  )
}

export default App