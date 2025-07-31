"use client";

export function Header() {
  return (
    <header className="flex flex-col items-center justify-center mb-8 text-white">
      <nav className="flex p-6">
        <span className="font-semibold text-xl tracking-tight text-white">Store Name</span>
        <div className="flex items-center flex-grow justify-end">
          <cl-cart-link target="_blank" aria-label="Cart" className="ml-4">
            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
              <path stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M23 23H8.725L5.238 3.825A1 1 0 0 0 4.261 3H2M10 28a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM23 28a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
              <path stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.813 18h15.7a1.988 1.988 0 0 0 1.962-1.637L27 8H6"></path>
            </svg>
            <cl-cart-count hide-when-empty=""></cl-cart-count>
            <cl-cart open-on-add=""></cl-cart>
          </cl-cart-link>
        </div>
      </nav>
    </header>
  )
}
