import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">BERSERI</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Breast Early Risk Screening Intelligence — Platform deteksi dini kanker payudara
              berbasis Artificial Intelligence. Mendukung Transformasi Kesehatan Nasional
              melalui inovasi teknologi untuk deteksi yang cepat, akurat, dan terjangkau.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Layanan</h3>
            <div className="flex flex-col gap-2">
              <Link href="/screening" className="text-sm text-gray-400 hover:text-pink-400 transition-colors">Screening Center</Link>
              <Link href="/patient" className="text-sm text-gray-400 hover:text-pink-400 transition-colors">Patient Track</Link>
              <Link href="/educare" className="text-sm text-gray-400 hover:text-pink-400 transition-colors">EduCare</Link>
              <Link href="/detect" className="text-sm text-gray-400 hover:text-pink-400 transition-colors">Deteksi Cepat</Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Kontak</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <span>support@breastcare.ai</span>
              <span>+62 123 4567 8910</span>
              <span>Jakarta, Indonesia</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BERSERI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Dukung Transformasi Kesehatan Nasional</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
