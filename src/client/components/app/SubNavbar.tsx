export default function SubNavbar() {
  return (
    <div className="flex gap-4 text-lg">
      <div className="border-b-2 border-blue-950 border-solid hover:cursor-pointer">
        Your Quiz
      </div>
      <div className="border-b-1 border-black border-solid hover:cursor-pointer">
        Solve Quiz
      </div>
    </div>
  );
}
