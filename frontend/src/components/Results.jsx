import React from 'react'

export function Results({ predictedPrice, confidenceRange }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="bg-blue-50 p-6 border-t border-blue-100">
      <h3 className="text-lg font-medium text-gray-900 mb-3">
        Predicted Price
      </h3>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Estimated Market Value</p>
          <p className="text-3xl font-bold text-blue-700">
            {formatCurrency(predictedPrice)}
          </p>
          {confidenceRange && (
            <div className="mt-3 text-sm text-gray-600">
              <p>Confidence Range</p>
              <p className="font-medium">
                {formatCurrency(confidenceRange.min)} -{' '}
                {formatCurrency(confidenceRange.max)}
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500 text-center">
        This prediction is based on current market trends and similar vehicle
        data.
      </p>
    </div>
  )
}