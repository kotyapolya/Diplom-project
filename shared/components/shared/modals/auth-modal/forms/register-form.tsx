'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/actions';
import { TFormRegisterValues, formRegisterSchema } from './schemas';
import { FormInput } from '../../../form';
import { Button } from '@/shared/components/ui';

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

 const sendToCRM = async (data: TFormRegisterValues) => {
  const crmPayload = {
    full_name: data.fullName,
    email: [data.email],
    phone: [data.phone],
    note: 'Зареєстрований користувач із сайту',
    // можно добавить другие поля
  };

  await fetch('/api/crm-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(crmPayload),
  });
};



  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        phone: data.phone,
        password: data.password,
      });

      await sendToCRM(data);

      toast.error('На реєстраційний імейл було відправлено лист. Будь ласка, підтвердьте свою пошту🤝', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      return toast.error('Невірний E-Mail або пароль', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Повне ім'я" required />
        <FormInput name="phone" label="Номер телефону" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput name="confirmPassword" label="Введіть пароль" type="password" required />

        <Button disabled={form.formState.isSubmitting} className="h-12 text-base" type="submit">
        Зареєструватись
        </Button>
      </form>
    </FormProvider>
  );
};
