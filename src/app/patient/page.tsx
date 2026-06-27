"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PatientPage() {
  const [activeTab, setActiveTab] = useState("riwayat");

  const riwayatData = [
    { id: 1, tanggal: "15 Juni 2026", hasil: "Normal", confidence: 0.94, status: "Selesai" },
    { id: 2, tanggal: "2 April 2026", hasil: "Jinak", confidence: 0.87, status: "Selesai" },
    { id: 3, tanggal: "10 Januari 2026", hasil: "Normal", confidence: 0.96, status: "Selesai" },
  ];

  const jadwalData = [
    { id: 1, tanggal: "20 Juli 2026", jenis: "Kontrol Rutin", lokasi: "RS Pusat Nasional", status: "Akan Datang" },
    { id: 2, tanggal: "5 September 2026", jenis: "Pemeriksaan Lanjutan", lokasi: "Klinik BERSERI", status: "Dijadwalkan" },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        <section className="min-h-screen hero-gradient py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Portal Pasien
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="gradient-text">Patient Track</span>
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Akses riwayat pemeriksaan, rekomendasi tindak lanjut, jadwal kontrol, dan pemantauan kesehatan terintegrasi
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8 animate-slide-up">
              <div className="flex border-b border-gray-100">
                {[
                  { key: "riwayat", label: "Riwayat Pemeriksaan", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                  { key: "rekomendasi", label: "Rekomendasi", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
                  { key: "jadwal", label: "Jadwal Kontrol", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all ${
                      activeTab === tab.key ? "text-pink-600 border-b-2 border-pink-500 bg-pink-50/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                    </svg>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "riwayat" && (
                  <div className="space-y-4">
                    {riwayatData.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-pink-100 transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            item.hasil === "Normal" ? "bg-emerald-100" : item.hasil === "Jinak" ? "bg-amber-100" : "bg-rose-100"
                          }`}>
                            <svg className={`w-5 h-5 ${
                              item.hasil === "Normal" ? "text-emerald-600" : item.hasil === "Jinak" ? "text-amber-600" : "text-rose-600"
                            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.hasil === "Normal" ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"} />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{item.tanggal}</p>
                            <p className="text-xs text-gray-400">Confidence: {(item.confidence * 100).toFixed(0)}%</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.hasil === "Normal" ? "bg-emerald-100 text-emerald-700" : item.hasil === "Jinak" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
                          }`}>{item.hasil}</span>
                          <span className="text-xs text-gray-400">{item.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "rekomendasi" && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-emerald-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-emerald-800">Hasil Normal — 15 Juni 2026</p>
                          <p className="text-sm text-emerald-700 mt-1">Lakukan pemeriksaan rutin setiap 1-2 tahun sekali. Terapkan pola hidup sehat dan lakukan SADARI secara teratur.</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-amber-800">Hasil Jinak — 2 April 2026</p>
                          <p className="text-sm text-amber-700 mt-1">Segera konsultasikan hasil ini dengan dokter spesialis. Lakukan pemeriksaan lanjutan seperti USG atau biopsi jika diperlukan.</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-blue-800">Rekomendasi Umum</p>
                          <p className="text-sm text-blue-700 mt-1">Data pemeriksaan Anda telah terintegrasi dengan SATUSEHAT. Pantau kesehatan secara berkala melalui portal ini.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "jadwal" && (
                  <div className="space-y-4">
                    {jadwalData.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-pink-100 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{item.tanggal}</p>
                            <p className="text-xs text-gray-400">{item.jenis} — {item.lokasi}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">{item.status}</span>
                      </div>
                    ))}
                    <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <p className="text-sm text-gray-600">Terintegrasi dengan <span className="font-semibold text-purple-700">SATUSEHAT</span> untuk pemantauan kesehatan berkelanjutan</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
