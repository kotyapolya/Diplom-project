import React from 'react';

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => (
  <div>
    <p>
      Код підтвердження: <h2>{code}</h2>
    </p>

    <p>
      <a href={`https://yummyfood-three.vercel.app/api/auth/verify?code=${code}`}>Підтвердити реєстрацію</a>
    </p>
  </div>
);
