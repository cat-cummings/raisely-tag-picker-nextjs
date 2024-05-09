import { UserProfile } from "../components/UserProfile";

export default function Home() {
  // Let's pretend we're getting this from the route
  // e.g. `get /users/:uuid`
  const params = {
    uuid: "1111-2222-3333-4444"
  };

  return (
    <main>
      <UserProfile userId={params.uuid} />
    </main>);
}
