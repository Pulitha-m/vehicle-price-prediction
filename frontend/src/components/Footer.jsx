import React from 'react'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 text-center text-sm">
      <div className="container mx-auto px-4">
        <p>Powered by Machine Learning</p>
        <p className="text-xs mt-1 text-gray-400">
          © {new Date().getFullYear()} Sri Lankan Vehicle Price Prediction
        </p>
      </div>
    </footer>
  )
}