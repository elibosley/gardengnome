import { Link } from "@remix-run/react";

export default function GardenIndexPage() {
  return (
    <p>
      No garden selected. Select a garden on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new garden.
      </Link>
    </p>
  );
}
