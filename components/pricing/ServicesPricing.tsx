import React, { useState } from 'react';
import TextInput from '../forms/Input';
import ZButtonDeleteSmall from '../forms/ZButtonDeleteSmall';
import iconDollar from './../../assets/images/icon-dollar-gray.svg';

// 1. Updated Interface to support From and To
interface ServiceRow {
  id: string;
  description: string;
  priceFrom: string;
  priceTo: string;
}

interface ServicesPricingProps {
  initialData?: ServiceRow[];
  onUpdate?: (data: ServiceRow[]) => void;
}

const ServicesPricing: React.FC<ServicesPricingProps> = ({ initialData = [], onUpdate }) => {
  const [rows, setRows] = useState<ServiceRow[]>(() => {
    if (initialData && initialData.length > 0) {
      return initialData.map(row => ({
        id: row.id || crypto.randomUUID(),
        description: row.description || '',
        priceFrom: row.priceFrom || '', // Ensure no undefined/null
        priceTo: row.priceTo || '',     // Ensure no undefined/null
      }));
    }
    return [{ id: crypto.randomUUID(), description: '', priceFrom: '', priceTo: '' }];
  });

  const handleAddRow = () => {
    const newRows = [...rows, { id: crypto.randomUUID(), description: '', priceFrom: '', priceTo: '' }];
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
        {rows.map((row) => (
          <div key={row.id} className="services-row d-flex align-items-center gap-2 mb-3">

            {/* Description */}
            <div className="services-row-description flex-grow-1">
              <TextInput
                placeholder="Service Description"
                value={row.description}
                onChange={(e) => handleChange(row.id, 'description', e.target.value)}
                id={`desc-${row.id}`}
                type='text'
              />
            </div>

            {/* Price Range Container */}
            <div className="services-row-price-range d-flex align-items-center gap-2">
              <TextInput
                placeholder="From"
                value={row.priceFrom}
                onChange={(e) => handleChange(row.id, 'priceFrom', e.target.value)}
                id={`from-${row.id}`}
                type='text'
                icon={iconDollar}
              />

              {
                // <span className="text-muted">—</span>
                // <span className="text-muted">-</span>
              }

              <TextInput
                placeholder="To"
                value={row.priceTo}
                onChange={(e) => handleChange(row.id, 'priceTo', e.target.value)}
                id={`to-${row.id}`}
                type='text'
                icon={iconDollar}
              />

              {/* Delete Button */}
              {rows.length > 1 && (
                <ZButtonDeleteSmall onClick={() => handleRemoveRow(row.id)} />
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type='button'
        onClick={handleAddRow}
        className="btn-services-row-add mt-2"
      >
        + Add Service Row
      </button>
    </div>
  );
};

export default ServicesPricing;