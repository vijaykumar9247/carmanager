import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../AddCar.css';
const AddCar = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dealer: '',
    company: '',
    car_type: '',
    images: []
  });

  // Handle input changes for text fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Create preview URLs for selected images
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
    
    setFormData({
      ...formData,
      images: files
    });
  };

  // Remove preview image and corresponding file
  const removeImage = (index) => {
    const newPreviews = previewImages.filter((_, i) => i !== index);
    const newFiles = Array.from(formData.images).filter((_, i) => i !== index);
    
    setPreviewImages(newPreviews);
    setFormData({
      ...formData,
      images: newFiles
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      
      // Append text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('dealer', formData.dealer);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('car_type', formData.car_type);
      
      // Append each image
      formData.images.forEach(image => {
        formDataToSend.append('images', image);
      });

      const response = await fetch('https://carmanagment.onrender.com/api/cars/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/');
      } else {
        setError(data.message || 'Failed to add car');
      }
    } catch (err) {
      setError('An error occurred while adding the car');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Car</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Dealer Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Dealer
          </label>
          <input
            type="text"
            name="dealer"
            value={formData.dealer}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Company Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Company
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Car Type Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Car Type
          </label>
          <select
            name="car_type"
            value={formData.car_type}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select car type</option>
            <option value="Four Wheeler">Four Wheeler</option>
            <option value="Two Wheeler">Two Wheeler</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-200 font-medium mb-2">
            Images
          </label>
          <div className="mt-2">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          
          {/* Image Previews */}
          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {previewImages.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Adding...' : 'Adding Car'}
            Addcar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;