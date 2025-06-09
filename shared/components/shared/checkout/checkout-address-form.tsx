'use client';

import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormTextarea } from '../form';
import { AdressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';


interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адреса доставки" className={className}>
      <div className="flex flex-col gap-5">
     <Controller
  name="address"
  control={control}
  render={({ field }) => (
    <AdressInput value={field.value} onChange={field.onChange} />
  )}
/>


        
<div className="text-sm text-muted-foreground italic">
        *звертайте увагу на оновленні назви ваших вулиць
      </div>
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Коментар до замовлення"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
