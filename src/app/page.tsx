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
      <SignInButton mode='modal' />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
    </>
  );
}
