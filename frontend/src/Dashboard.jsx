import React, { useState } from 'react'
import { Header } from './components/Header'
import { PredictionForm } from './components/PredictionForm'
import { Results } from './components/Results'
import { Footer } from './components/Footer'

export function Dashboard() {
  const [predictedPrice, setPredictedPrice] = useState(null)
  const [confidenceRange, setConfidenceRange] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePrediction = async (formData) => {
    setIsLoading(true)
    try {
      // ✅ Directly use formData (already aligned with backend schema)
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const price = data["Predicted Price"]

      // Create ±10% confidence interval
      const range = {
        min: Math.round(price * 0.9),
        max: Math.round(price * 1.1),
      }

      setPredictedPrice(price)
      setConfidenceRange(range)
    } catch (error) {
      console.error('Error predicting price:', error)
      alert('Failed to fetch prediction. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md overflow-hidden">
          <PredictionForm onSubmit={handlePrediction} isLoading={isLoading} />
          {predictedPrice !== null && (
            <Results
              predictedPrice={predictedPrice}
              confidenceRange={confidenceRange}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}