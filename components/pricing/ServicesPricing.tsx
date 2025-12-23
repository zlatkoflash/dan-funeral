import React, { useState } from 'react';
import TextInput from '../forms/Input';
import ZButtonDeleteSmall from '../forms/ZButtonDeleteSmall';
// import { MinusCircle, Plus } from 'lucide-react';
import iconDollar from './../../assets/images/icon-dollar-gray.svg';

interface ServiceRow {
  id: string;
  description: string;
  price: string;
}

interface ServicesPricingProps {
  initialData?: ServiceRow[];
  onUpdate?: (data: ServiceRow[]) => void;
}

const ServicesPricing: React.FC<ServicesPricingProps> = ({ initialData = [], onUpdate }) => {
  const [rows, setRows] = useState<ServiceRow[]>(
    initialData.length > 0
      ? initialData
      : [{ id: crypto.randomUUID(), description: '', price: '' }]
  );

  const handleAddRow = () => {
    const newRows = [...rows, { id: crypto.randomUUID(), description: '', price: '' }];
    setRows(newRows);
    onUpdate?.(newRows);
  };

  const handleRemoveRow = (id: string) => {
    const newRows = rows.filter(row => row.id !== id);
    setRows(newRows);
    onUpdate?.(newRows);
  };

  const handleChange = (id: string, field: keyof ServiceRow, value: string) => {
    const newRows = rows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(newRows);
    onUpdate?.(newRows);
  };

  return (
    <div className="services-pricing">
      <div className="services-pricing-wrap">
        {rows.map((row, index) => (
          <div key={row.id} className="services-row">
            {/* Description Input */}
            <div className="services-row-description">
              {/*<input
                type="text"
                placeholder="Description"
                value={row.description}
                onChange={(e) => handleChange(row.id, 'description', e.target.value)}
                className="services-row-description-input"
              />*/}
              <TextInput
                placeholder="Description"
                value={row.description}
                onChange={(e) => handleChange(row.id, 'description', e.target.value)}
                id="description"
                type='text'
              />
            </div>

            {/* Price Input & Delete Button Container */}
            <div className="services-row-price">
              {
                // <span className="services-row-price-sign">$</span>
              }
              {/*<input
                type="text"
                placeholder="0"
                value={row.price}
                onChange={(e) => handleChange(row.id, 'price', e.target.value)}
                className="services-row-price-input"
              />*/}
              <TextInput
                placeholder="Price"
                value={row.price}
                onChange={(e) => handleChange(row.id, 'price', e.target.value)}
                id="price"
                type='text'
                icon={iconDollar}
              />

              {/* Delete Button (Hidden for the first row if only one exists) */}
              {rows.length > 1 && (
                /*<button
                  type='button'
                  onClick={() => handleRemoveRow(row.id)}
                  className="services-row-price-delete"
                  aria-label="Remove row"
                >
                  (minus)
                </button>*/

                <ZButtonDeleteSmall onClick={() => {
                  handleRemoveRow(row.id)
                }} />

              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Row Button */}
      <button
        type='button'
        onClick={handleAddRow}
        className="btn-services-row-add"
      >
        + Add Row
      </button>

    </div>
  );
};

export default ServicesPricing;