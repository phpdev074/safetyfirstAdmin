import { useState } from "react";

interface Subscription {
  name: string;
  price: number;
  duration: "monthly" | "yearly";
  features: string[];
  status: "active" | "inactive";
}

const SubscriptionModal = ({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (data: Subscription) => void }) => {
  const [formData, setFormData] = useState<Subscription>({
    name: "",
    price: 0,
    duration: "yearly",
    features: [],
    status: "active",
  });

  const [featureInput, setFeatureInput] = useState("");

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle feature addition

  // Handle form submission
  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      name: "",
      price: 0,
      duration: "yearly",
      features: [],
      status: "active",
    });
    setFeatureInput("");
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg w-96 p-6 relative">
        {/* Close Button */}
        <button className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" onClick={onClose}>
          &times;
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-semibold text-center mb-4">Add Subscription</h2>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Subscription Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />

        {/* Price Input */}
        <input
          type="number"
          name="price"
          placeholder="Price in $"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />

        {/* Duration Select */}
        <select name="duration" value={formData.duration} onChange={handleChange} className="w-full p-2 mb-3 border rounded">
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        {/* Features Input */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Feature"
            value={formData.features}
            name="features"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {/* <button onClick={addFeature} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
            Add Feature
          </button> */}
        </div>

        {/* Features List */}
        <ul className="mb-3">
          {/* {formData.features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
              • {feature}
            </li>
          ))} */}
        </ul>

        {/* Status Select */}
        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 mb-3 border rounded">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-[#A91D1D] text-white rounded hover:bg-opacity-90 dark:bg-[#A91D1D] dark:hover:bg-opacity-90 dark:text-white"
        >
          Submit
        </button>

      </div>
    </div>
  ) : null;
};

export default SubscriptionModal;
