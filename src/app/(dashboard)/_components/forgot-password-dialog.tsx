import { zodResolver } from '@hookform/resolvers/zod';
import { type AuthError } from '@supabase/supabase-js';
import { Button } from '@ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Icons } from '@ui/icons';
import { Input } from '@ui/input';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { client } from '~/server/supabase/client';

const formSchema = z.object({
  email: z.string().email('Invalid email').min(2, {
    message: 'Email must be at least 2 characters.',
  }),
});

function ForgotPasswordDialog({ label }: { label: string }) {
  const [error, setError] = useState<AuthError | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const dialogClose = () => {
      document.getElementById('dialog-close')?.click();
    };
    startTransition(async () => {
      const emailParams = {
        email: values.email,
        redirectTo: 'http://localhost:3000/account/reset-password',
      };

      // Call the passwordResetEmail function with the defined parameters
      const result = await client.auth.resetPasswordForEmail(emailParams.email, {
        redirectTo: emailParams.redirectTo,
      });
      // Check if the result contains an error
      if (result?.error) {
        console.error(result.error);
        setError(result.error);
        return;
      }

      // If there was no error, close the dialog
      // Add some nice text before closing? "We've sent you an email with instructions.."
      dialogClose();
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='m-auto block' variant='link'>
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Forgot password</DialogTitle>
          <DialogDescription>
            Click here to reset your password, we&apos;ll send you an email with
            instructions.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <Form {...form}>
            <form className='space-y-4 px-6' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='john.doe@acme.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button disabled={isPending} type='submit'>
                  {isPending && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
                  Reset password
                </Button>
              </DialogFooter>
            </form>
          </Form>
          {error && (
            <p className='text-sm font-medium text-destructive'>{error.message}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { ForgotPasswordDialog };
