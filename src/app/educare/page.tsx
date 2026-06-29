"use client";

import { useState } from "react";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { educare2045Data as data } from "@/data/educare2045";

function formatNumber(n: number): string {
  return n.toLocaleString("id-ID");
}

export default function EduCarePage() {
  const [showForecastRange, setShowForecastRange] = useState(false);
  const [openPriorities, setOpenPriorities] = useState<Record<string, boolean>>({
    veryHigh: true,
    high: true,
    medium: false,
    relativelyLow: false,
  });
  const [showSources, setShowSources] = useState(false);

  const togglePriority = (key: string) =>
    setOpenPriorities((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));

  const priorityConfig: { key: string; label: string; color: string; items: string[] }[] = [
    { key: "veryHigh", label: "Prioritas Sangat Tinggi", color: "rose", items: data.priorities.veryHigh },
    { key: "high", label: "Prioritas Tinggi", color: "amber", items: data.priorities.high },
    { key: "medium", label: "Prioritas Menengah", color: "blue", items: data.priorities.medium },
    { key: "relativelyLow", label: "Prioritas Relatif Rendah", color: "emerald", items: data.priorities.relativelyLow },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        <section className="min-h-screen hero-gradient py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* 1. HERO */}
            <div className="text-center mb-12 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Edukasi & Analitik
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="gradient-text">EduCare</span>
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Memahami beban kanker payudara, prioritas wilayah, dan pentingnya deteksi dini menuju Indonesia 2045.
              </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-slide-up stagger-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <p className="text-3xl font-bold gradient-text">{formatNumber(data.nationalSnapshot2022.newCases)}</p>
                <p className="text-sm text-gray-500 mt-1">kasus baru pada 2022</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <p className="text-3xl font-bold gradient-text">{formatNumber(data.nationalSnapshot2022.deaths)}</p>
                <p className="text-sm text-gray-500 mt-1">kematian pada 2022</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <p className="text-3xl font-bold gradient-text">~{data.nationalSnapshot2022.lateStageDiagnosisPercent}%</p>
                <p className="text-sm text-gray-500 mt-1">pasien terdiagnosis pada stadium lanjut</p>
              </div>
              <div className="md:col-span-3 text-center">
                <span className="text-xs text-gray-400">Snapshot nasional — {data.nationalSnapshot2022.source}</span>
              </div>
            </div>

            {/* 2. FORECAST */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10 animate-slide-up stagger-2">
              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Forecast Menuju 2045</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Berdasarkan data historis IHME (1990–2023), tim EduCare memproyeksikan jumlah kasus baru dan kematian hingga 2045 menggunakan model ARIMA. Model yang digunakan memiliki tingkat kesalahan (MAPE) sekitar 5% pada data uji, menunjukkan proyeksi cukup akurat untuk skenario perencanaan. Proyeksi ini adalah skenario perencanaan untuk mengantisipasi kebutuhan layanan, bukan angka pasti di masa depan.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                  <div className="lg:col-span-3">
                    <img
                      src="/educare2045/gambar-2-forecast.png"
                      alt="Grafik forecast kasus baru dan kematian kanker payudara di Indonesia 1990–2045"
                      className="w-full rounded-xl border border-gray-200"
                    />
                    <p className="text-xs text-gray-400 mt-2 text-center">
                      Forecast of Breast Cancer Incidence and Deaths in Indonesia (1990–2045) — IHME
                    </p>
                  </div>
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {data.forecast.highlights.map((h) => (
                        <React.Fragment key={h.year}>
                          <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-100 text-center">
                            <p className="text-lg font-bold text-cyan-700">{formatNumber(h.cases)}</p>
                            <p className="text-xs text-gray-500">kasus baru {h.year}</p>
                            <p className="text-xs text-rose-500 font-medium">+{h.caseGrowth}%</p>
                          </div>
                          <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 text-center">
                            <p className="text-lg font-bold text-purple-700">{formatNumber(h.deaths)}</p>
                            <p className="text-xs text-gray-500">kematian {h.year}</p>
                            <p className="text-xs text-rose-500 font-medium">+{h.deathGrowth}%</p>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowForecastRange(!showForecastRange)}
                      aria-expanded={showForecastRange}
                      className="text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors"
                    >
                      {showForecastRange ? "Sembunyikan" : "Lihat"} rentang prediksi
                    </button>
                    {showForecastRange && (
                      <div className="space-y-2 animate-slide-up">
                        {data.forecast.highlights.map((h) => (
                          <div key={h.year} className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                            <span className="font-semibold">{h.year}:</span> Kasus {h.caseRange}, Kematian {h.deathRange}
                            <span className="text-xs text-gray-400 ml-2">(95% CI)</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-400">{data.forecast.note}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. PETA PRIORITAS */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10 animate-slide-up stagger-3">
              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Peta Prioritas Wilayah</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Menggunakan K-Means Clustering terhadap 34 provinsi berdasarkan rata-rata incidence rate, death rate, dan capaian pemeriksaan SADANIS. Hasilnya dikelompokkan menjadi empat tingkat prioritas agar penguatan layanan dapat disesuaikan dengan karakteristik masing-masing wilayah.
                </p>
                <div className="space-y-6">
                  <div>
                    <img
                      src="/educare2045/gambar-4-peta-prioritas.png"
                      alt="Peta persebaran klaster prioritas penanganan kanker payudara di Indonesia"
                      className="w-full rounded-xl border border-gray-200"
                    />
                  </div>
                  <div className="space-y-3">
                    {priorityConfig.map((p) => (
                      <div key={p.key} className="border border-gray-100 rounded-xl overflow-hidden">
                        <button
                          onClick={() => togglePriority(p.key)}
                          aria-expanded={openPriorities[p.key]}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <span>{p.label}</span>
                          <svg className={`w-4 h-4 transition-transform ${openPriorities[p.key] ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openPriorities[p.key] && (
                          <div className="px-4 pb-3 animate-slide-up">
                            <div className="flex flex-wrap gap-2">
                              {p.items.map((prov) => (
                                <span key={prov} className={`px-2.5 py-1 rounded-full text-xs font-medium bg-${p.color}-100 text-${p.color}-700`}>
                                  {prov}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <p className="text-xs text-gray-400 mt-3">
                      Prioritas wilayah ditentukan dari kombinasi tingkat kejadian, kematian, dan capaian pemeriksaan pada tingkat provinsi.
                    </p>
                    <p className="text-xs text-gray-400">Prioritas wilayah bukan penilaian risiko pada individu.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. KESEJANGAN LAYANAN */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10 animate-slide-up stagger-4">
              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Kesenjangan Layanan</h2>
                <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
                  {data.careGap.map((item, i) => {
                    const widths = ["w-full", "w-4/5", "w-3/5", "w-2/5"];
                    return (
                      <div key={i} className={`${widths[i]} bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 rounded-xl p-4 text-center`}>
                        <p className="text-sm font-semibold text-gray-700">{item.value}</p>
                        <p className="text-xs text-gray-500">{item.label}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
                  <p className="font-semibold mb-1">Deteksi dini perlu diikuti rujukan dan tindak lanjut yang terstruktur.</p>
                  <p className="text-xs text-amber-700">Sekitar setengah pasien berhasil memperoleh layanan rumah sakit rujukan.</p>
                </div>
              </div>
            </div>

            {/* 5. FAKTOR RISIKO */}
            <div className="mb-10 animate-slide-up stagger-5">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Faktor Risiko</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.riskFactors.map((rf, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">{rf.title}</h3>
                    <p className="text-xs text-gray-500">{rf.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">Faktor risiko tidak berarti seseorang pasti mengalami kanker payudara.</p>
            </div>

            {/* 6. TARGET PENGENDALIAN NASIONAL */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10 animate-slide-up stagger-6">
              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Target Pengendalian Nasional</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.nationalTargets.map((t, i) => (
                    <div key={i} className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 text-center">
                      <p className="text-2xl font-bold gradient-text">{t.value}</p>
                      <p className="text-xs text-gray-600 mt-1">{t.title}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4">RAN Kanker Payudara 2025–2034 dan WHO Global Breast Cancer Initiative.</p>
              </div>
            </div>

            {/* 7. REKOMENDASI */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-100 mb-10 animate-slide-up">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Rekomendasi Berbasis Data</h2>
              <p className="text-sm text-gray-500 mb-6">
                Berdasarkan hasil analisis forecasting, pemetaan wilayah prioritas, dan identifikasi faktor risiko, berikut rekomendasi untuk penguatan literasi kesehatan dan kebijakan:
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                    title: "Perkuat skrining di wilayah prioritas",
                    desc: "Provinsi dengan prioritas sangat tinggi dan tinggi perlu mendapat penguatan fasilitas skrining, tenaga kesehatan, dan alur rujukan agar temuan awal tidak terputus.",
                  },
                  {
                    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                    title: "Edukasi faktor risiko sejak dini",
                    desc: "Sosialisasikan faktor biologis, reproduksi, dan gaya hidup melalui platform digital dan tenaga kesehatan komunitas untuk meningkatkan kesadaran dan deteksi dini.",
                  },
                  {
                    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                    title: "Integrasi data skrining nasional",
                    desc: "Data pemeriksaan SADANIS dan tindak lanjut perlu diintegrasikan dalam satu sistem untuk memantau cakupan, kesenjangan layanan, dan patient loss secara real-time.",
                  },
                  {
                    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
                    title: "Dukung inovasi berbasis AI untuk skrining",
                    desc: "Teknologi AI dapat membantu tenaga kesehatan mempercepat identifikasi awal dan memprioritaskan pasien yang membutuhkan pemeriksaan lanjutan, terutama di daerah dengan keterbatasan radiolog.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white/70 rounded-xl border border-cyan-100">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. CATATAN SUMBER DATA */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10 animate-slide-up">
              <button
                onClick={() => setShowSources(!showSources)}
                aria-expanded={showSources}
                className="w-full flex items-center justify-between p-6 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>Catatan Sumber Data</span>
                <svg className={`w-4 h-4 transition-transform ${showSources ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showSources && (
                <div className="px-6 pb-6 animate-slide-up">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Snapshot nasional: GLOBOCAN 2022.</li>
                    <li>• Forecast: hasil pengolahan berdasarkan estimasi historis IHME.</li>
                    <li>• Prioritas wilayah: pengolahan incidence rate, death rate, dan capaian SADANIS tingkat provinsi.</li>
                    <li>• Data ditampilkan dalam bentuk agregat dan tidak memuat data pasien.</li>
                  </ul>
                </div>
              )}
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
