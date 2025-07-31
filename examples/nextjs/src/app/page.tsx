import { Header } from '@/components/Header'
import { ProductCard } from '@/components/ProductCard'

export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />

      <main className="flex flex-row gap-[32px] items-center sm:items-start">
        <ProductCard code='5PANECAP9D9CA1FFFFFFXXXX' name='Gray Cap' />
        <ProductCard code='BACKPACKFFFFFF000000XXXX' name='White Backpack' />
      </main>
    </div>
  );
}
