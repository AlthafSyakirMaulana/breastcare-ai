# BERSERI — Breast Early Risk Screening Intelligence

BERSERI adalah platform deteksi dini kanker payudara berbasis Artificial Intelligence. Frontend ini dibangun dengan Next.js dan terhubung ke backend FastAPI untuk analisis citra USG payudara.

## Fitur

- **Screening Center** — Tenaga kesehatan mengunggah citra USG untuk analisis AI dengan segmentasi lesi dan confidence score.
- **Patient Track** — Pasien mengakses riwayat pemeriksaan, rekomendasi tindak lanjut, dan jadwal kontrol.
- **EduCare 2045** — Informasi faktor risiko, tren kasus nasional, prioritas wilayah, dan rekomendasi berbasis data.
- **Deteksi Cepat** — Upload dan analisis citra mammografi/USG dengan hasil klasifikasi dan visualisasi segmentasi.

## Tech Stack

- **Framework**: Next.js 16
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: FastAPI (Python) — lihat [breastcare-ml](https://github.com/AlthafSyakirMaulana/breastcare-ml)

## Local Development

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Pastikan backend berjalan di `http://localhost:8000` atau atur `NEXT_PUBLIC_API_URL`.

## Deployment

Frontend di-deploy ke Vercel. Backend API di Hugging Face Docker Space.

## Catatan Penting

BERSERI adalah purwarupa pendukung skrining. Hasil analisis bukan diagnosis medis resmi dan harus ditinjau oleh tenaga kesehatan.
