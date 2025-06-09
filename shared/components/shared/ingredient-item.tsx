import { cn } from '@/shared/lib/utils';
import { CircleCheck } from 'lucide-react';
import React from 'react';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const IngredientItem: React.FC<Props> = ({
  className,
  active,
  price,
  name,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-between items-center p-2 rounded-md w-32 h-48 text-center relative cursor-pointer shadow-md bg-white',
        { 'border border-primary': active },
        className,
      )}
      onClick={onClick}
    >
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}

      {/* Блок зображення + назви */}
      <div className="flex flex-col items-center">
        <img
          className="object-contain mb-1"
          width={90}
          height={90}
          src={imageUrl}
          alt={name}
        />
       
      </div>

      {/* Ціна завжди внизу */}
       <span className="text-xs mb-1">
          {name}
        </span>
      <span className="font-bold">{price} грн</span>
    </div>
  );
};
