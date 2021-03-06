import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import {
  deleteGarden,
  Garden,
  getGarden,
  getGardenById,
} from "~/models/garden.server";

import type { Note } from "~/models/note.server";
import { deleteNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  garden: Garden;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.gardenId, "gardenId not found");

  const garden = await getGarden({ userId, id: params.gardenId });
  if (!garden) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ garden });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.gardenId, "gardenId not found");

  await deleteGarden({ userId, id: params.noteId });

  return redirect("/gardens");
};

export default function NoteDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.garden.name}</h3>

      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Garden not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
