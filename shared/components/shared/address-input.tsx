'use client';

import React, { useState } from 'react';

interface Props {
  value?: string;
  onChange?: (value?: string) => void;
}


export const AdressInput: React.FC<Props> = ({ value = '', onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
  };

  return (
    <input
      type="text"
      placeholder="Введіть адресу"
      value={value}
      onChange={handleChange}
      className="border rounded px-3 py-2 w-full"
    />
  );
};


