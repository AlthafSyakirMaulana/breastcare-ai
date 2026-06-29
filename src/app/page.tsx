"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      localStorage.setItem("breastcare_image", dataUrl);
      router.push("/detect");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleClick = () => fileInputRef.current?.click();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-16 hero-gradient overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-pink-200/30 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-200/30 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-200/20 blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-medium animate-fade-in">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse-soft" />
                  Berbasis AI dengan Pendekatan Deep Learning untuk Transformasi Kesehatan Nasional
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-slide-up stagger-1">
                  Deteksi Dini{" "}
                  <span className="gradient-text">Kanker Payudara</span>
                  <br />
                  dengan{" "}
                  <span className="gradient-text">Kecerdasan Buatan</span>
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed max-w-lg animate-slide-up stagger-2">
                  Platform berbasis AI (Deep Learning) yang membantu tenaga medis dan masyarakat
                  dalam mendeteksi potensi kanker payudara melalui analisis citra
                  mammografi dengan cepat, akurat, dan mudah digunakan.
                </p>

                <div className="flex flex-wrap gap-4 animate-slide-up stagger-3">
                  <button
                    onClick={handleClick}
                    className="px-8 py-3 rounded-full text-base font-semibold text-white gradient-bg hover:opacity-90 transition-all shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:scale-105 active:scale-95"
                  >
                    Mulai Deteksi Gratis
                  </button>
                  <a
                    href="#fitur"
                    className="px-8 py-3 rounded-full text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-pink-300 hover:text-pink-600 transition-all hover:shadow-lg"
                  >
                    Pelajari Lebih Lanjut
                  </a>
                </div>
              </div>

              {/* Hero Right - Upload Card */}
              <div className="animate-slide-up stagger-3">
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={handleClick}
                  className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
                    isDragging
                      ? "border-pink-500 bg-pink-50 scale-[1.02]"
                      : "border-gray-200 bg-white/60 hover:border-pink-300 hover:bg-pink-50/50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                  />

                  <div className="flex flex-col items-center gap-4">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isDragging ? "bg-pink-200 scale-110" : "bg-pink-100"
                    }`}>
                      <svg className="w-10 h-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-700">
                        {isDragging ? "Lepaskan foto di sini" : "Upload Foto Mammografi"}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Seret & lepas atau klik untuk memilih file
                      </p>
                    </div>
                    <p className="text-xs text-gray-400">Format: JPG, PNG, DICOM • Maks 10MB</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  {["Akurat", "Cepat", "Gratis"].map((item, i) => (
                    <div key={i} className="text-center p-3 rounded-xl bg-white/80 border border-gray-100">
                      <div className="text-2xl mb-1">
                        {i === 0 ? "🎯" : i === 1 ? "⚡" : "💜"}
                      </div>
                      <p className="text-sm font-medium text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center gap-8">
              {[
                { value: "85%", label: "Akurasi" },
                { value: "< 2", label: "Menit Proses" },
                { value: "3", label: "Kelas Deteksi" },
              ].map((stat, i) => (
                <div key={i} className="text-center animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="fitur" className="py-20 bg-gradient-to-b from-white to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Platform <span className="gradient-text">BERSERI</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Tiga pilar utama untuk mendukung deteksi dini, pemantauan pasien, dan edukasi kesehatan nasional
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  href: "/screening",
                  icon: (
                    <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  ),
                  title: "Screening Center",
                  badge: "Tenaga Kesehatan",
                  desc: "Unggah citra USG payudara, analisis AI dengan segmentasi lesi, klasifikasi Normal/Benign/Malignant, dan confidence score untuk mendukung diagnosis klinis.",
                  color: "blue",
                },
                {
                  href: "/patient",
                  icon: (
                    <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ),
                  title: "Patient Track",
                  badge: "Pasien",
                  desc: "Akses riwayat pemeriksaan, rekomendasi tindak lanjut, jadwal kontrol, dan pemantauan kesehatan berkelanjutan terintegrasi SATUSEHAT.",
                  color: "emerald",
                },
                {
                  href: "/educare",
                  icon: (
                    <svg className="w-8 h-8 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ),
                  title: "EduCare 2045",
                  badge: "Masyarakat & Kebijakan",
                  desc: "Informasi faktor risiko, tren kasus nasional, analisis wilayah prioritas, dan rekomendasi berbasis data untuk peningkatan literasi dan kebijakan kesehatan.",
                  color: "cyan",
                },
              ].map((feature, i) => (
                <a
                  key={i}
                  href={feature.href}
                  className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-pink-200 hover:shadow-lg hover:shadow-pink-100/50 transition-all duration-300 animate-slide-up cursor-pointer"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`w-14 h-14 rounded-xl bg-${feature.color}-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-${feature.color}-100 text-${feature.color}-700`}>
                      {feature.badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="cara-kerja" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Bagaimana <span className="gradient-text">Cara Kerjanya</span>?
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Hanya 3 langkah mudah untuk mendapatkan hasil deteksi awal kanker payudara
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-pink-200 via-purple-200 to-cyan-200" />

              {[
                {
                  step: "01",
                  title: "Upload Foto",
                  desc: "Upload foto hasil mammografi Anda melalui platform kami yang aman dan terenkripsi.",
                  color: "from-pink-500 to-pink-600",
                  shadow: "shadow-pink-200",
                },
                {
                  step: "02",
                  title: "Analisis AI (Deep Learning)",
                  desc: "Model AI (Deep Learning) kami akan menganalisis citra dan mendeteksi pola yang mengindikasikan abnormalitas.",
                  color: "from-purple-500 to-purple-600",
                  shadow: "shadow-purple-200",
                },
                {
                  step: "03",
                  title: "Dapatkan Hasil",
                  desc: "Terima hasil klasifikasi lengkap dengan tingkat kepercayaan dalam hitungan menit.",
                  color: "from-cyan-500 to-cyan-600",
                  shadow: "shadow-cyan-200",
                },
              ].map((item, i) => (
                <div key={i} className="relative text-center animate-slide-up" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className={`relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.color} ${item.shadow} shadow-lg flex items-center justify-center`}>
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={handleClick}
                className="px-8 py-3 rounded-full text-base font-semibold text-white gradient-bg hover:opacity-90 transition-all shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:scale-105 active:scale-95"
              >
                Mulai Deteksi Sekarang
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Dukung <span className="gradient-text">Transformasi Kesehatan Nasional</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Bersama kita wujudkan Indonesia yang lebih sehat melalui deteksi dini
              kanker payudara yang akurat, cepat, dan terjangkau untuk semua.
            </p>
            <button
              onClick={handleClick}
              className="px-10 py-4 rounded-full text-lg font-semibold text-white gradient-bg hover:opacity-90 transition-all shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:scale-105 active:scale-95"
            >
              Mulai Deteksi Gratis
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
