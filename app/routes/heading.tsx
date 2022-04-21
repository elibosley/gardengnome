import { Form, Link } from "@remix-run/react";
import { useUser } from "~/utils";

export const Heading = () => {
  const user = useUser();
  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
      <h1 className="flex flex-col text-3xl font-bold">
        <Link to="/notes">Notes</Link>
        <Link to="/gardens">Gardens</Link>
      </h1>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Logout {user.email}
        </button>
      </Form>
    </header>
  );
};
