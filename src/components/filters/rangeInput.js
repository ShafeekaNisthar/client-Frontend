import React from 'react';

const RangeInput = ({ label, value, onChange }) => {
  return (
    <div className='range'>
    <label>
      {label} : 
      <input
        type='number'
        placeholder='Min'
        value={value[0]}
        onChange={(e) => onChange([parseInt(e.target.value), value[1]])}
      />
      <input
        type='number'
        placeholder='Max'
        value={value[1]}
        onChange={(e) => onChange([value[0], parseInt(e.target.value)])}
      />
    </label>
    </div>
  );
};

export default RangeInput;
