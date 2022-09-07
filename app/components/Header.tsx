import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <div className="h-24 bg-primary">
      <div className="flex justify-center items-center py-8">
        <Link
          to={"/"}
          className="whitespace-nowrap text-xl font-semibold text-light uppercase tracking-widest px-4 hover:bg-blue hover:text-light"
        >
          Home
        </Link>
      </div>
    </div>
  )
}
