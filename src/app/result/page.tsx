"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ResultItem {
  label: string;
  confidence: number;
  color: string;
}

interface ResultData {
  results: ResultItem[];
  topResult: ResultItem;
  timestamp: string;
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<ResultData | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const savedResult = localStorage.getItem("breastcare_result");
    const savedImage = localStorage.getItem("breastcare_image");

    if (!savedResult || !savedImage) {
      router.push("/detect");
      return;
    }

    setResult(JSON.parse(savedResult));
    setImage(savedImage);
  }, [router]);

  if (!result || !image) return null;

  const getResultColor = (label: string) => {
    switch (label.toLowerCase()) {
      case "normal":
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          text: "text-emerald-700",
          icon: "bg-emerald-100",
          iconColor: "text-emerald-600",
          badge: "bg-emerald-500",
          gradient: "from-emerald-500 to-emerald-600",
          shadow: "shadow-emerald-200",
        };
      case "jinak":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-700",
          icon: "bg-amber-100",
          iconColor: "text-amber-600",
          badge: "bg-amber-500",
          gradient: "from-amber-500 to-amber-600",
          shadow: "shadow-amber-200",
        };
      case "ganas":
        return {
          bg: "bg-rose-50",
          border: "border-rose-200",
          text: "text-rose-700",
          icon: "bg-rose-100",
          iconColor: "text-rose-600",
          badge: "bg-rose-500",
          gradient: "from-rose-500 to-rose-600",
          shadow: "shadow-rose-200",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-700",
          icon: "bg-gray-100",
          iconColor: "text-gray-600",
          badge: "bg-gray-500",
          gradient: "from-gray-500 to-gray-600",
          shadow: "shadow-gray-200",
        };
    }
  };

  const colors = getResultColor(result.topResult.label);

  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "normal":
        return (
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "jinak":
        return (
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case "ganas":
        return (
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getRecommendation = (label: string) => {
    switch (label.toLowerCase()) {
      case "normal":
        return {
          title: "Hasil Normal",
          desc: "Berdasarkan analisis AI, tidak terdeteksi adanya kelainan signifikan pada citra mammografi Anda. Namun, tetaplah melakukan pemeriksaan rutin sesuai anjuran tenaga medis.",
          steps: [
            "Lakukan pemeriksaan rutin setiap 1-2 tahun sekali",
            "Terapkan pola hidup sehat dan seimbang",
            "Lakukan SADARI (Periksa Payudara Sendiri) secara teratur",
            "Konsultasikan dengan dokter jika ada perubahan",
          ],
        };
      case "jinak":
        return {
          title: "Terindikasi Jinak (Benign)",
          desc: "AI mendeteksi adanya massa yang memiliki karakteristik jinak (non-kanker). Meskipun demikian, diperlukan pemeriksaan lebih lanjut oleh tenaga medis untuk konfirmasi.",
          steps: [
            "Segera konsultasikan hasil ini dengan dokter spesialis",
            "Lakukan pemeriksaan lanjutan seperti USG atau biopsi jika diperlukan",
            "Pantau perkembangan secara berkala",
            "Jangan panik - sebagian besar massa jinak tidak berbahaya",
          ],
        };
      case "ganas":
        return {
          title: "Terindikasi Ganas (Malignant)",
          desc: "AI mendeteksi adanya pola yang mengindikasikan massa ganas (kanker). Hasil ini memerlukan tindakan medis segera untuk diagnosis dan penanganan lebih lanjut.",
          steps: [
            "Segera konsultasi dengan dokter spesialis onkologi",
            "Lakukan pemeriksaan lanjutan (biopsi, MRI, dll)",
            "Ikuti rencana pengobatan yang direkomendasikan dokter",
            "Dapatkan dukungan dari keluarga dan tenaga medis",
          ],
        };
      default:
        return { title: "", desc: "", steps: [] };
    }
  };

  const recommendation = getRecommendation(result.topResult.label);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        <section className="min-h-screen hero-gradient py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8 animate-slide-up">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Hasil <span className="gradient-text">Deteksi</span>
              </h1>
              <p className="text-gray-500">
                Berikut adalah hasil analisis citra mammografi Anda
              </p>
            </div>

            {/* Main Result Card */}
            <div className={`rounded-2xl border-2 ${colors.border} ${colors.bg} p-8 mb-6 animate-scale-in`}>
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Image Preview */}
                <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-white shadow-lg flex-shrink-0">
                  <img src={image} alt="Mammogram" className="w-full h-full object-cover" />
                </div>

                {/* Result Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-xs text-gray-500 mb-3">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDate(result.timestamp)}
                  </div>

                  <div className={`w-16 h-16 rounded-2xl ${colors.icon} flex items-center justify-center ${colors.iconColor} mb-4 mx-auto md:mx-0`}>
                    {getIcon(result.topResult.label)}
                  </div>

                  <h2 className={`text-2xl font-bold ${colors.text} mb-2`}>
                    {recommendation.title}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {recommendation.desc}
                  </p>

                  {/* Confidence Badge */}
                  <div className="mt-4 flex items-center gap-3 justify-center md:justify-start">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${colors.gradient} ${colors.shadow} shadow-md`}>
                      {(result.topResult.confidence * 100).toFixed(1)}% Keyakinan
                    </span>
                    <span className="text-xs text-gray-400">
                      Level Kepercayaan AI
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confidence Breakdown */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6 animate-slide-up stagger-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  Detail Analisis
                </h3>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${showDetails ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showDetails && (
                <div className="mt-6 space-y-4 animate-slide-up">
                  {result.results.map((item, i) => {
                    const itemColors = getResultColor(item.label);
                    const percentage = (item.confidence * 100).toFixed(1);
                    return (
                      <div key={i} className="flex items-center gap-4">
                        <span className={`w-16 text-sm font-medium ${itemColors.text}`}>
                          {item.label}
                        </span>
                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${itemColors.gradient} transition-all duration-1000`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className={`text-sm font-semibold ${itemColors.text} w-14 text-right`}>
                          {percentage}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6 animate-slide-up stagger-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Rekomendasi Tindakan
              </h3>
              <ul className="space-y-3">
                {recommendation.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${colors.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <span className="text-xs font-bold text-white">{i + 1}</span>
                    </div>
                    <span className="text-sm text-gray-600">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 animate-slide-up stagger-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-amber-800 mb-1">Peringatan Penting</p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    Hasil deteksi ini bersifat indikatif dan merupakan alat bantu awal. Hasil ini BUKAN merupakan
                    diagnosis medis resmi. Selalu konsultasikan hasil ini dengan dokter spesialis untuk mendapatkan
                    diagnosis dan penanganan yang tepat.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-5">
              <button
                onClick={() => {
                  localStorage.removeItem("breastcare_image");
                  localStorage.removeItem("breastcare_result");
                  router.push("/detect");
                }}
                className="px-8 py-3 rounded-xl text-base font-semibold text-white gradient-bg hover:opacity-90 transition-all shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 active:scale-95"
              >
                Deteksi Ulang
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-8 py-3 rounded-xl text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-pink-300 hover:text-pink-600 transition-all"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
