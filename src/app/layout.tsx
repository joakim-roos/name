import { TailwindIndicator } from '~/components/TailwindIndicator';
import { Providers } from '~/providers';
import '~/styles/globals.css';

export const metadata = {
  description: 'Boilerplate for t3-app-dir-supabase.',
  title: 't3-app-dir-supabase',
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang='en'>
        <head />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta content='#000000' name='theme-color' />
        <body>
          <Providers>{children}</Providers>
          <TailwindIndicator />
        </body>
      </html>
    </>
  );
}
export default RootLayout;
