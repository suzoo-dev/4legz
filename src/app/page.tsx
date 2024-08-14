import {
  SignInButton,
  SignedOut,
} from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <SignedOut>
        <SignInButton
          forceRedirectUrl="/feed"
        />
      </SignedOut>
    </div>
  )
}