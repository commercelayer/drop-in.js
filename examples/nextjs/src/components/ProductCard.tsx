"use client";

import { useEffect, useRef } from 'react'

export function ProductCard({ code, name }: { code: string; name: string; }) {

  const clRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (clRef.current?.ariaDisabled != null) {
      console.log(`Price for ${name} (${code}):`, clRef.current.ariaDisabled);
    }
  },[clRef.current?.ariaDisabled])

  return (
    <div className="flex flex-col max-w-sm rounded overflow-hidden shadow-lg border bg-white border-gray-200 mx-auto p-4">
      <div className="h-80 sm:h-64">
        <img className="w-full h-full object-center object-contain" alt={name} src={`https://data.commercelayer.app/seed/images/skus/${code}_FLAT.png`} />
      </div>
      <h3 className="mt-6 font-medium">{name}</h3>
      <small className="text-gray-300">{code}</small>
      <cl-price className="my-2" code={code}>
        <cl-price-amount type="compare-at"></cl-price-amount>
        <cl-price-amount type="price"></cl-price-amount>
      </cl-price>
      <cl-add-to-cart ref={clRef} className="my-2 mx-auto" code={code}>
        Add to cart
      </cl-add-to-cart>
      <cl-availability className="my-2 text-sm" code={code}>
        <cl-availability-status type="available" className="text-green-400">available</cl-availability-status>
        <cl-availability-status type="unavailable" className="text-red-400">unavailable</cl-availability-status>
        <cl-availability-status type="available-with-info" className="block">
          ready to be shipped in
          <cl-availability-info type="min-days"></cl-availability-info>-<cl-availability-info type="max-days"></cl-availability-info>
          days
        </cl-availability-status>
      </cl-availability>
    </div>
  )
}
