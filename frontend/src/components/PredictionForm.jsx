import React, { useState } from 'react'

export function PredictionForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: '',
    engineCapacity: '',
    fuelType: '',
    transmission: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const carBrands = [
    'Toyota',
    'Nissan',
    'Honda',
    'Suzuki',
    'Mitsubishi',
    'Mazda',
    'BMW',
    'Mercedes-Benz',
    'Audi',
    'Hyundai',
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: 30 },
    (_, i) => currentYear - i
  )

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="brand"
          >
            Brand / Make
          </label>
          <select
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Brand</option>
            {carBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="model"
          >
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            placeholder="e.g. Corolla, Civic"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="year"
          >
            Year of Manufacture
          </label>
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="mileage"
          >
            Mileage (km)
          </label>
          <input
            type="number"
            id="mileage"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            required
            min="0"
            placeholder="e.g. 45000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="engineCapacity"
          >
            Engine Capacity (cc)
          </label>
          <input
            type="number"
            id="engineCapacity"
            name="engineCapacity"
            value={formData.engineCapacity}
            onChange={handleChange}
            required
            min="0"
            placeholder="e.g. 1500"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="fuelType"
          >
            Fuel Type
          </label>
          <select
            id="fuelType"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <div className="col-span-1">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="transmission"
          >
            Transmission
          </label>
          <select
            id="transmission"
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Predict Price'
          )}
        </button>
      </div>
    </form>
  )
}