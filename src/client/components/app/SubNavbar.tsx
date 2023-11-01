"use client";

export default function SubNavbar({ page, onChange }: { page: "created" | "solve", onChange: (x: typeof page) => void }) {
  return (
    <div className="flex gap-4 text-lg">
      <div
        className={
          page === "created"
            ? "border-b-2 border-solid hover:cursor-pointer border-blue-950"
            : "border-b-2 border-solid hover:cursor-pointer"
        }
        onClick={() => onChange("created")}
      >
        Your Quiz
      </div>
      <div
        className={
          page === "solve"
            ? "border-b-2 border-solid hover:cursor-pointer border-blue-950"
            : "border-b-2 border-solid hover:cursor-pointer"
        }
        onClick={() => onChange("solve")}
      >
        Solve Quiz
      </div>
    </div>
  );
}
