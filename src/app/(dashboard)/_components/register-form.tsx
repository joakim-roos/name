'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  type AuthError,
  type SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { Button } from '@ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Icons } from '@ui/icons';
import { Input } from '@ui/input';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { client } from '~/server/supabase/client';

const formSchema = z
  .object({
    email: z.string().email('Email is required.'),
    firstName: z.string().min(1, 'First name is required.'),
    lastName: z.string().min(1, 'Last name is required.'),
    password: z.string().min(1, 'Password is required').min(6, 'Minimum 6 characters.'),
    repeatPassword: z
      .string()
      .min(1, 'This field is required')
      .min(6, 'Minimum 6 characters.'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords must match',
    path: ['repeatPassword'], // specify the field the error is attached to
  });

function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<AuthError | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: '',
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const registerParams: SignUpWithPasswordCredentials = {
        email: values.email,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
          },
        },
        password: values.password,
      };

      const result = await client.auth.signUp(registerParams);
      if (result.data) {
        router.push('/dashboard');
      }
      // Check if the result contains an error
      if (result?.error) {
        setError(result.error);
        return;
      }
    });
  }

  return (
    <Card className='px-6 pb-6'>
      <CardHeader className='px-0'>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Create an account & join our loyalty program.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your email</FormLabel>
                <FormControl>
                  <Input placeholder='John' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your email</FormLabel>
                <FormControl>
                  <Input placeholder='Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your email</FormLabel>
                <FormControl>
                  <Input placeholder='john.doe@acme.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='repeatPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-full' disabled={isPending} type='submit'>
            {isPending && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
            Join us
          </Button>
        </form>
      </Form>
      {error && (
        <p className='text-center text-sm font-medium text-destructive'>
          {error.message}
        </p>
      )}
    </Card>
  );
}

export { RegisterForm };
