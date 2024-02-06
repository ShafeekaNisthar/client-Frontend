import React from 'react';

const RangeInput = ({ label, value, onChange }) => {
  return (
    <label>
      {label} Range:  
      <input
        type='number'
        placeholder='Min'
        value={value.min}
        onChange={(e) => onChange({ ...value, min: parseFloat(e.target.value) })}
      />
      <input
        type='number'
        placeholder='Max'
        value={value.max}
        onChange={(e) => onChange({ ...value, max: parseFloat(e.target.value) })}
      />
    </label>
  );
};

export default RangeInput;
