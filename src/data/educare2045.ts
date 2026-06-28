export const educare2045Data = {
  nationalSnapshot2022: {
    newCases: 66271,
    deaths: 22598,
    lateStageDiagnosisPercent: 70,
    source: "GLOBOCAN 2022",
  },

  forecast: {
    source: "Hasil pengolahan berdasarkan estimasi historis IHME-GBD",
    note: "Forecast digunakan sebagai skenario perencanaan layanan, bukan jumlah pasti kasus di masa depan.",
    highlights: [
      {
        year: 2034,
        cases: 111703,
        caseGrowth: 82.82,
        deaths: 40366,
        deathGrowth: 40.73,
        caseRange: "88.038–139.771",
        deathRange: "33.633–47.099",
      },
      {
        year: 2045,
        cases: 204212,
        caseGrowth: 234.22,
        deaths: 52186,
        deathGrowth: 81.94,
        caseRange: "145.243–279.249",
        deathRange: "36.954–67.417",
      },
    ],
  },

  priorities: {
    veryHigh: [
      "Banten",
      "Jawa Tengah",
      "Jawa Timur",
      "Kalimantan Selatan",
      "Kalimantan Utara",
    ],
    high: [
      "DKI Jakarta",
      "Jawa Barat",
      "Nusa Tenggara Timur",
      "Sumatera Barat",
      "Sumatera Selatan",
    ],
    medium: [
      "Aceh",
      "Bali",
      "Bengkulu",
      "DI Yogyakarta",
      "Jambi",
      "Kalimantan Barat",
      "Kalimantan Tengah",
      "Kalimantan Timur",
      "Kepulauan Riau",
      "Maluku",
      "Maluku Utara",
      "Papua",
      "Papua Barat",
      "Riau",
      "Sulawesi Barat",
      "Sulawesi Selatan",
      "Sulawesi Tenggara",
      "Sulawesi Utara",
    ],
    relativelyLow: [
      "Gorontalo",
      "Kepulauan Bangka Belitung",
      "Lampung",
      "Nusa Tenggara Barat",
      "Sulawesi Tengah",
      "Sumatera Utara",
    ],
  },

  careGap: [
    {
      label: "Sasaran skrining",
      value: "Sekitar 14 juta perempuan",
    },
    {
      label: "Sudah menjalani pemeriksaan",
      value: "29,3%",
    },
    {
      label: "Ditemukan kelainan",
      value: "Sekitar 20.000 perempuan",
    },
    {
      label: "Melanjutkan pengobatan",
      value: "Sekitar 6.000 perempuan",
    },
  ],

  riskFactors: [
    {
      title: "Faktor biologis",
      description: "Usia dan riwayat keluarga.",
    },
    {
      title: "Faktor reproduksi",
      description: "Menarke dini dan nulliparitas.",
    },
    {
      title: "Gaya hidup",
      description: "Obesitas dan kurang aktivitas fisik.",
    },
    {
      title: "Kebiasaan berisiko",
      description: "Konsumsi alkohol.",
    },
  ],

  nationalTargets: [
    {
      value: "≥60%",
      title: "Diagnosis stadium awal",
    },
    {
      value: "≤60 hari",
      title: "Waktu diagnosis sejak gejala",
    },
    {
      value: ">80%",
      title: "Pengobatan hingga tuntas",
    },
    {
      value: "2,5%/tahun",
      title: "Target penurunan kematian",
    },
  ],
};
