import Onboarding from "./Onboarding";

function page() {
  const isOnboarded = false;

  if (!isOnboarded) {
    return <Onboarding />;
  }
  return <div>page</div>;
}

export default page;
