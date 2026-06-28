"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function DetectPage() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("breastcare_image");
    if (saved) {
      setImage(saved);
      const mimeMatch = saved.match(/^data:(image\/\w+);base64,/);
      const mime = mimeMatch ? mimeMatch[1] : "image/png";
      const ext = mime.split("/")[1] || "png";
      fetch(saved)
        .then((r) => r.blob())
        .then((blob) => {
          const file = new File([blob], `restored-ultrasound.${ext}`, { type: mime });
          setImageFile(file);
        })
        .catch(() => {});
    }
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setImageFile(file);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImage(dataUrl);
      localStorage.setItem("breastcare_image", dataUrl);
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

  const removeImage = () => {
    setImage(null);
    setImageFile(null);
    setError(null);
    localStorage.removeItem("breastcare_image");
  };

  const analyzeImage = async () => {
    if (!imageFile) return;

    setIsAnalyzing(true);
    setProgress(0);
    setError(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10 + 2;
      });
    }, 300);

    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal mendapatkan hasil analisis");

      const data = await res.json();

      clearInterval(interval);
      setProgress(100);

      localStorage.setItem(
        "breastcare_result",
        JSON.stringify({
          results: data.all_results,
          topResult: data.all_results.reduce((a: any, b: any) =>
            a.confidence > b.confidence ? a : b
          ),
          timestamp: new Date().toISOString(),
          maskBase64: data.mask_base64,
          overlayBase64: data.overlay_base64,
          lesionRatio: data.lesion_ratio,
        })
      );

      setTimeout(() => {
        setIsAnalyzing(false);
        router.push("/result");
      }, 500);
    } catch (err: any) {
      clearInterval(interval);
      setIsAnalyzing(false);
      setError(err.message || "Terjadi kesalahan saat menganalisis");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        <section className="min-h-screen hero-gradient py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 animate-slide-up">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Deteksi <span className="gradient-text">Kanker Payudara</span>
              </h1>
              <p className="text-gray-500 max-w-xl mx-auto">
                Upload foto mammografi Anda untuk mendapatkan analisis awal berbasis AI
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div className="animate-slide-up stagger-1">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Gambar</h2>

                  {!image ? (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={handleClick}
                      className={`relative cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
                        isDragging
                          ? "border-pink-500 bg-pink-50 scale-[1.02]"
                          : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                        className="hidden"
                      />

                      <div className="flex flex-col items-center gap-3">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all ${
                          isDragging ? "bg-pink-200 scale-110" : "bg-pink-100"
                        }`}>
                          <svg className="w-8 h-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-base font-semibold text-gray-700">
                            {isDragging ? "Lepaskan di sini" : "Upload Foto Mammografi"}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            Seret & lepas atau klik untuk memilih
                          </p>
                        </div>
                        <p className="text-xs text-gray-400">JPG, PNG, DICOM • Maks 10MB</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border border-gray-200">
                      <img
                        src={image}
                        alt="Preview"
                        className="w-full h-64 object-contain bg-gray-50"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  <div className="mt-4 text-xs text-gray-400 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Hasil deteksi bersifat indikatif dan bukan diagnosis medis resmi
                  </div>
                </div>
              </div>

              {/* Info & Action Section */}
              <div className="animate-slide-up stagger-2">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Informasi Deteksi</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Normal</p>
                        <p className="text-xs text-gray-400">Tidak terdeteksi adanya kelainan</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Jinak (Benign)</p>
                        <p className="text-xs text-gray-400">Ditemukan massa non-kanker</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Ganas (Malignant)</p>
                        <p className="text-xs text-gray-400">Terindikasi massa kanker</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={analyzeImage}
                    disabled={!imageFile || isAnalyzing}
                    className={`w-full py-3 rounded-xl text-base font-semibold text-white transition-all ${
                      !imageFile
                        ? "bg-gray-300 cursor-not-allowed"
                        : isAnalyzing
                        ? "gradient-bg opacity-80 cursor-wait"
                        : "gradient-bg hover:opacity-90 hover:shadow-lg hover:shadow-pink-200 active:scale-[0.98]"
                    }`}
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Menganalisis...
                      </div>
                    ) : (
                      "Analisis Gambar"
                    )}
                  </button>

                  {error && (
                    <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  {isAnalyzing && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{Math.min(Math.round(progress), 100)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full gradient-bg transition-all duration-300"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-2 text-center">
                        AI sedang menganalisis pola citra mammografi...
                      </p>
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
