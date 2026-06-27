"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ScreeningPage() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setImageFile(file);
    setError(null);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const analyzeImage = async () => {
    if (!imageFile) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      const res = await fetch(`${API_URL}/predict`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Gagal mendapatkan hasil analisis");
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        <section className="min-h-screen hero-gradient py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Khusus Tenaga Kesehatan
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="gradient-text">Screening Center</span>
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Unggah citra USG payudara pasien untuk analisis AI dengan visualisasi segmentasi lesi dan confidence score
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="animate-slide-up stagger-1">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Citra USG</h2>
                  {!image ? (
                    <div
                      onDrop={handleDrop}
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all ${
                        isDragging ? "border-blue-500 bg-blue-50 scale-[1.02]" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                      }`}
                    >
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} className="hidden" />
                      <div className="flex flex-col items-center gap-3">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${isDragging ? "bg-blue-200 scale-110" : "bg-blue-100"}`}>
                          <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-base font-semibold text-gray-700">Upload Citra USG Payudara</p>
                        <p className="text-sm text-gray-400">Seret & lepas atau klik untuk memilih</p>
                        <p className="text-xs text-gray-400">JPG, PNG • Maks 10MB</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border border-gray-200">
                      <img src={image} alt="Preview" className="w-full h-64 object-contain bg-gray-50" />
                      <button onClick={() => { setImage(null); setImageFile(null); setResult(null); }} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  <button
                    onClick={analyzeImage}
                    disabled={!image || isAnalyzing}
                    className={`w-full mt-4 py-3 rounded-xl text-base font-semibold text-white transition-all ${
                      !image ? "bg-gray-300 cursor-not-allowed" : isAnalyzing ? "gradient-bg opacity-80 cursor-wait" : "gradient-bg hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
                    }`}
                  >
                    {isAnalyzing ? "Menganalisis..." : "Analisis dengan AI"}
                  </button>

                  {error && (
                    <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">{error}</div>
                  )}
                </div>
              </div>

              <div className="animate-slide-up stagger-2">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Hasil Analisis</h2>
                  {result ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Klasifikasi</span>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-bold text-white ${
                          result.prediction === "Normal" ? "bg-emerald-500" : result.prediction === "Jinak" ? "bg-amber-500" : "bg-rose-500"
                        }`}>
                          {result.prediction}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Confidence Score</span>
                        <span className="text-lg font-bold gradient-text">{(result.confidence * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Rasio Lesi</span>
                        <span className="text-sm font-semibold text-gray-700">{(result.lesion_ratio * 100).toFixed(1)}%</span>
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Detail Per Kelas</h3>
                        {result.all_results?.map((item: any, i: number) => (
                          <div key={i} className="flex items-center gap-3 mb-2">
                            <span className="w-20 text-sm text-gray-600">{item.label}</span>
                            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${
                                item.label === "Normal" ? "bg-emerald-500" : item.label === "Jinak" ? "bg-amber-500" : "bg-rose-500"
                              }`} style={{ width: `${(item.confidence * 100).toFixed(1)}%` }} />
                            </div>
                            <span className="text-sm font-semibold text-gray-700 w-14 text-right">{(item.confidence * 100).toFixed(1)}%</span>
                          </div>
                        ))}
                      </div>

                      {result.mask_base64 && (
                        <div className="border-t border-gray-100 pt-4">
                          <h3 className="text-sm font-semibold text-gray-700 mb-3">Segmentasi Lesi</h3>
                          <img src={`data:image/png;base64,${result.mask_base64}`} alt="Segmentation Mask" className="w-full max-w-xs rounded-xl border border-gray-200" />
                          <p className="text-xs text-gray-400 mt-2">Area putih menunjukkan region yang terdeteksi sebagai lesi</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                      <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm">Upload citra dan klik analisis untuk melihat hasil</p>
                    </div>
                  )}
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
