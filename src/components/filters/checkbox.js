import React from 'react';

const CheckboxFilter = ({ label, options, selectedValues, onChange }) => {
  const handleChange = (option) => {
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];
    onChange(newSelectedValues);
  };

  return (
    <div className='checkbox'>
      <label>{label}:</label>
      <div>
        {options.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              checked={selectedValues.length === 0 || selectedValues.includes(option)}
              onChange={() => handleChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxFilter;
