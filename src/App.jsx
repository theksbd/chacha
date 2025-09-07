import { Dialog } from '@headlessui/react';
import { Analytics } from '@vercel/analytics/react';
import { useState } from 'react';
import './App.css';
import { media } from './media';

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='text-3xl font-bold text-center mb-6'>ChaCha Babe 😘</h1>

      {/* Grid Gallery */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {media.map((item, i) => (
          <div
            key={i}
            className='cursor-pointer overflow-hidden rounded-xl shadow hover:scale-105 transition'
            onClick={() => setSelected(item)}
          >
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt=''
                className='w-full h-64 object-cover'
                loading='lazy'
              />
            ) : (
              <video
                src={item.src}
                className='w-full h-64 object-cover'
                muted
                autoPlay
                loop
              />
            )}
          </div>
        ))}
      </div>

      {/* Modal/Lightbox */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        className='relative z-50'
      >
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center p-4'>
          <Dialog.Panel className='max-w-3xl w-full'>
            {selected &&
              (selected.type === 'image' ? (
                <img
                  src={selected.src}
                  alt=''
                  className='max-h-[80vh] mx-auto rounded-xl object-contain' // constrain height
                  loading='lazy'
                />
              ) : (
                <video
                  src={selected.src}
                  controls
                  className='max-h-[80vh] mx-auto rounded-xl object-contain'
                />
              ))}
          </Dialog.Panel>
        </div>
      </Dialog>
      <Analytics />
    </div>
  );
}
