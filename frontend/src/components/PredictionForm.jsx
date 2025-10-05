import React, { useState } from "react";

export function PredictionForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    yom: new Date().getFullYear(),
    mileage: "",
    engine: "",
    fuel: "",
    gear: "",
    condition: "",
    leasing: "0",
    aircon: "0",
    ps: "0",
    pm: "0",
    pw: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
        model: formData.model.toUpperCase(),
      yom: parseInt(formData.yom),
      mileage: parseFloat(formData.mileage),
      engine: parseFloat(formData.engine),
      leasing: parseInt(formData.leasing),
      aircon: parseInt(formData.aircon),
      ps: parseInt(formData.ps),
      pm: parseInt(formData.pm),
      pw: parseInt(formData.pw),
    });
  };

  const carBrands = [
    "TOYOTA", "NISSAN", "HONDA", "SUZUKI", "MITSUBISHI",
    "MAZDA", "BMW", "MERCEDES", "AUDI", "HYUNDAI",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="brand">Brand</label>
          <select
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Brand</option>
            {carBrands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            placeholder="e.g. Corolla"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="yom">Year</label>
          <select
            id="yom"
            name="yom"
            value={formData.yom}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Mileage */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="mileage">Mileage (km)</label>
          <input
            type="number"
            id="mileage"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Engine */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="engine">Engine (cc)</label>
          <input
            type="number"
            id="engine"
            name="engine"
            value={formData.engine}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Fuel */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="fuel">Fuel</label>
          <select
            id="fuel"
            name="fuel"
            value={formData.fuel}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Fuel</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        {/* Gear */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="gear">Gear</label>
          <select
            id="gear"
            name="gear"
            value={formData.gear}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Gear</option>
            <option value="Manual">Manual</option>
            <option value="Auto">Auto</option>
          </select>
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="condition">Condition</label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Condition</option>
            <option value="NEW">New</option>
            <option value="USED">Used</option>
          </select>
        </div>

        {/* Leasing */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="leasing">Leasing</label>
          <select
            id="leasing"
            name="leasing"
            value={formData.leasing}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="0">No Leasing</option>
            <option value="1">Ongoing Lease</option>
          </select>
        </div>

        {/* Features */}
        {[
          { id: "aircon", label: "Air Condition" },
          { id: "ps", label: "Power Steering" },
          { id: "pm", label: "Power Mirror" },
          { id: "pw", label: "Power Window" },
        ].map((f) => (
          <div key={f.id}>
            <label className="block text-sm font-medium mb-1" htmlFor={f.id}>{f.label}</label>
            <select
              id={f.id}
              name={f.id}
              value={formData[f.id]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="0">Not Available</option>
              <option value="1">Available</option>
            </select>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm"
        >
          {isLoading ? "Processing..." : "Predict Price"}
        </button>
      </div>
    </form>
  );
}