'use client';

import Image from 'next/image';

export default function TestImages() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">Image Loading Test</h1>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">City Images</h2>
          <div className="space-y-4">
            <div>
              <p>عنيزة</p>
              <Image src="/cities/unaizah.jpg" alt="Unaizah" width={200} height={150} />
            </div>
            <div>
              <p>بريدة</p>
              <Image src="/cities/buraidah.jpg" alt="Buraidah" width={200} height={150} />
            </div>
            <div>
              <p>الرس</p>
              <Image src="/cities/ar-rass.jpg" alt="Ar Rass" width={200} height={150} />
            </div>
            <div>
              <p>البكيرية</p>
              <Image src="/cities/al-bukayriyah.jpg" alt="Al Bukayriyah" width={200} height={150} />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Cafe Images</h2>
          <div className="space-y-4">
            <div>
              <p>جار (Unaizah)</p>
              <Image src="/cafes/unaizah/جار.jpg" alt="جار" width={100} height={100} />
            </div>
            <div>
              <p>هانيم (Buraidah)</p>
              <Image src="/cafes/buraidah/HANIME.jpg" alt="هانيم" width={100} height={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}