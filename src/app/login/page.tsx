'use client';

import { Button } from '~/components/ui/button';
import { client } from '~/server/supabase/client';

const testAccounts = [{ email: 'j.roos@hotmail.com', password: '1234' }];

const Page = () => {
  return (
    <div>
      {process.env.NODE_ENV === 'development' && (
        <div>
          {testAccounts.map((account, index) => (
            <div key={index}>
              <Button
                onClick={() => {
                  void client.auth.signInWithPassword(account);
                }}
              >
                Login {account.email}
              </Button>
              <Button
                onClick={() => {
                  void client.auth.signUp(account);
                }}
              >
                Register {account.email}
              </Button>
              <Button
                onClick={() => {
                  void client.auth.signOut();
                }}
              >
                Signout {account.email}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
