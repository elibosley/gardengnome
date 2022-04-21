import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { getGardenListItems } from "~/models/garden.server";
import { Heading } from "./heading";

type LoaderData = {
  gardenListItems: Awaited<ReturnType<typeof getGardenListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const gardenListItems = await getGardenListItems({ userId });
  return json<LoaderData>({ gardenListItems });
};

export default function GardenPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Heading />

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Garden
          </Link>

          <hr />

          {data.gardenListItems.length === 0 ? (
            <p className="p-4">No gardens yet</p>
          ) : (
            <ol>
              {data.gardenListItems.map((garden) => (
                <li key={garden.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={garden.id}
                  >
                    {garden.name}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
