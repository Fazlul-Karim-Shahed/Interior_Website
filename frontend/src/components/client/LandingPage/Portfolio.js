import Image from 'next/image';
import React from 'react'

export default function Portfolio() {
  return (
      <section className="py-16 px-6 md:px-20 bg-gray-100 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10">Our Portfolio</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded overflow-hidden shadow">
                      <Image src={`/portfolio${i}.jpg`} alt={`Project ${i}`} width={600} height={400} className="w-full h-auto" />
                  </div>
              ))}
          </div>
      </section>
  );
}
