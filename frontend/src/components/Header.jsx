import React from 'react'

export function Header() {
  return (
    <header className="bg-blue-600 text-white py-6 shadow-md">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold">
          Sri Lankan Vehicle Price Prediction
        </h1>
        <p className="mt-2 text-blue-100">
          Get accurate market value estimates for your vehicle
        </p>
      </div>
    </header>
  )
}