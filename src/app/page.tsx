import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
export default function Home() {
  return (
    <>
    <SignedOut>
      <SignInButton mode='modal'>
        <Button className='bg-emerald-700 hover:bg-emerald-400 ' >
          Sign In
        </Button>
      </SignInButton>
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
    <ModeToggle/>
    </>
  );
}
