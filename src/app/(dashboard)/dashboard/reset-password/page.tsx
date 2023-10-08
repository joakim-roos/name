import { ResetPasswordForm } from '../../_components/reset-password-form';

export default function ResetPassword({}: {
  params: {
    handle: string[];
    locale: string;
  };
}) {
  return (
    <div className='m-auto max-w-sm'>
      <ResetPasswordForm />
    </div>
  );
}
