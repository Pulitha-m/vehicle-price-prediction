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
      // In a real application, this would be an actual API call
      // For demo purposes, we'll simulate a delay and a response
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Mock response - in a real app this would come from the API
      const mockPrice = Math.floor(Math.random() * 5000000) + 1000000
      const mockRange = {
        min: mockPrice - mockPrice * 0.1,
        max: mockPrice + mockPrice * 0.1,
      }
      setPredictedPrice(mockPrice)
      setConfidenceRange(mockRange)
    } catch (error) {
      console.error('Error predicting price:', error)
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