"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EduCarePage() {
  const [activeRegion, setActiveRegion] = useState("nasional");

  const regionData: Record<string, { name: string; cases: number; trend: string; risk: string; color: string }[]> = {
    nasional: [
      { name: "DKI Jakarta", cases: 2840, trend: "meningkat", risk: "Tinggi", color: "rose" },
      { name: "Jawa Barat", cases: 3210, trend: "stabil", risk: "Tinggi", color: "rose" },
      { name: "Jawa Timur", cases: 2560, trend: "menurun", risk: "Sedang", color: "amber" },
      { name: "DI Yogyakarta", cases: 890, trend: "stabil", risk: "Sedang", color: "amber" },
      { name: "Bali", cases: 670, trend: "menurun", risk: "Rendah", color: "emerald" },
      { name: "Sulawesi Selatan", cases: 1120, trend: "meningkat", risk: "Sedang", color: "amber" },
    ],
    prioritas: [
      { name: "Papua", cases: 450, trend: "meningkat", risk: "Tinggi", color: "rose" },
      { name: "NTT", cases: 380, trend: "meningkat", risk: "Tinggi", color: "rose" },
      { name: "Maluku", cases: 210, trend: "stabil", risk: "Sedang", color: "amber" },
    ],
  };

  const edukasiData = [
    {
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "Faktor Risiko",
      desc: "Usia, riwayat keluarga, mutasi genetik (BRCA1/BRCA2), gaya hidup tidak sehat, dan paparan hormon merupakan faktor risiko utama kanker payudara.",
      color: "pink",
    },
    {
      icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Deteksi Dini",
      desc: "SADARI (Periksa Payudara Sendiri) setiap bulan, klinis oleh tenaga medis setiap 1-2 tahun, dan mammografi rutin sejak usia 40 tahun sangat dianjurkan.",
      color: "purple",
    },
    {
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      title: "Gaya Hidup Sehat",
      desc: "Pola makan seimbang, olahraga teratur, menjaga berat badan ideal, membatasi alkohol, dan tidak merokok dapat menurunkan risiko hingga 30%.",
      color: "cyan",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        <section className="min-h-screen hero-gradient py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Edukasi & Analitik
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="gradient-text">EduCare 2045</span>
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Informasi faktor risiko, tren kasus nasional, analisis wilayah prioritas, dan rekomendasi berbasis data
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-slide-up stagger-1">
              {edukasiData.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className={`w-12 h-12 rounded-xl bg-${item.color}-100 flex items-center justify-center mb-4`}>
                    <svg className={`w-6 h-6 text-${item.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8 animate-slide-up stagger-2">
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => setActiveRegion("nasional")}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
                    activeRegion === "nasional" ? "text-pink-600 border-b-2 border-pink-500 bg-pink-50/50" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Tren Kasus Nasional
                </button>
                <button
                  onClick={() => setActiveRegion("prioritas")}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
                    activeRegion === "prioritas" ? "text-pink-600 border-b-2 border-pink-500 bg-pink-50/50" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Wilayah Prioritas
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {(activeRegion === "nasional" ? regionData.nasional : regionData.prioritas).map((region, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-pink-100 transition-all">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-${region.color}-500`} />
                        <span className="text-sm font-medium text-gray-800">{region.name}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-sm text-gray-600">{region.cases.toLocaleString()} kasus</span>
                        <span className={`text-xs font-medium ${
                          region.trend === "meningkat" ? "text-rose-600" : region.trend === "menurun" ? "text-emerald-600" : "text-amber-600"
                        }`}>
                          {region.trend}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          region.risk === "Tinggi" ? "bg-rose-100 text-rose-700" : region.risk === "Sedang" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {region.risk}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-100 animate-slide-up stagger-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Rekomendasi Kebijakan</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 mt-0.5">•</span>
                      <span>Penguatan skrining dini di wilayah prioritas dengan angka kasus tinggi dan akses terbatas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 mt-0.5">•</span>
                      <span>Edukasi SADARI dan faktor risiko melalui platform digital dan tenaga kesehatan komunitas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 mt-0.5">•</span>
                      <span>Integrasi data skrining dengan SATUSEHAT untuk pemantauan nasional real-time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 mt-0.5">•</span>
                      <span>Peningkatan kapasitas fasilitas kesehatan dan pelatihan tenaga medis di daerah terpencil</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
