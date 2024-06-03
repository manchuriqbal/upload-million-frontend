import Link from "next/link";



export default function MenuLayout({ children }) {
  return (
    <div>
      <nav className="border px-10 py-2 shadow-md fixed inset-x-0">
        <Link href="/" className="mx-2 font-semibold">HOME</Link>
        <Link href="/upload" className="mx-2 font-semibold">Upload</Link>
      </nav>

        <div className="flex h-screen">
          <div className="flex m-auto">
             {children}  
          </div>
        </div>

    </div>
  );
}
