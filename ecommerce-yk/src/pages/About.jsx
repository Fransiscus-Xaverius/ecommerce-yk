import React from "react";
import { Bell, Calendar, Globe, HeartHandshake, Leaf, Sparkles } from "lucide-react";

const sneakPeeks = [
  {
    title: "Luxe Motion Capsule",
    description: "Rangkaian sneakers dan loafers beraksen metalik yang tampil perdana di homepage edisi Lunar Glow.",
    badge: "Footwear",
    accent: "from-white/10 via-milky-blue/20 to-transparent",
  },
  {
    title: "Atelier Bespoke Lab",
    description: "Pengalaman custom emboss inisial, pilihan leather vegan, dan palet satin untuk pesta malam.",
    badge: "Experience",
    accent: "from-indigo-500/20 via-transparent to-slate-900/30",
  },
  {
    title: "Zero-Gravity Comfort",
    description: "Insole cloud-foam generasi baru dengan struktur honeycomb yang diujicobakan di runway internal.",
    badge: "Innovation",
    accent: "from-rose-500/20 via-transparent to-slate-900/40",
  },
];

const experiencePillars = [
  {
    icon: <Sparkles className="h-6 w-6 text-milky-blue" />,
    title: "Editorial Direction",
    description: "Lookbook cinematic dengan tone neon noir untuk menghadirkan nuansa futuristik khas homepage baru.",
  },
  {
    icon: <Leaf className="h-6 w-6 text-emerald-400" />,
    title: "Conscious Craft",
    description: "Material recycled denim dan serat bambu untuk menjaga kenyamanan tropis tanpa meninggalkan jejak besar.",
  },
  {
    icon: <HeartHandshake className="h-6 w-6 text-rose-400" />,
    title: "Guest List Access",
    description: "Stylist personal siap memberi rekomendasi silhouette sesuai kebutuhan event penting Anda.",
  },
  {
    icon: <Globe className="h-6 w-6 text-indigo-300" />,
    title: "Omni Experience",
    description: "Peluncuran sinkron antara flagship store Jakarta, Bandung, dan platform daring kami.",
  },
];

const launchMoments = [
  {
    label: "Lookbook Premiere",
    date: "12 Jan 2026",
    detail: "Preview digital interaktif dengan fitur mix-and-match langsung dari homepage.",
  },
  {
    label: "Guest List Try-On",
    date: "28 Jan 2026",
    detail: "Sesi eksklusif bersama stylist untuk pelanggan terpilih di tiga kota besar.",
  },
  {
    label: "Public Release",
    date: "14 Feb 2026",
    detail: "Koleksi lengkap tersedia online & offline bersamaan dengan kampanye #FutureFootsteps.",
  },
];

const About = () => {
  return (
    <div className="bg-slate-950 text-white">
      {/* Coming Soon Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-black" />
        <div className="absolute left-1/3 top-12 h-72 w-72 rounded-full bg-milky-blue/30 blur-[120px]" />
        <div className="absolute right-16 bottom-0 h-64 w-64 rounded-full bg-rose-500/20 blur-[100px]" />
        <div className="relative mx-auto flex min-h-[75vh] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center sm:px-8">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/70">
            <Sparkles className="h-4 w-4" /> Coming Soon
          </p>
          <h1 className="mb-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Yongki Komaladi <span className="text-milky-blue">Future Footsteps</span>
          </h1>
          <p className="max-w-3xl text-base text-white/70 sm:text-lg">
            Koleksi fashion footwear terbaru kami sedang dipoles di studio—menghadirkan siluet berani, material ramah
            lingkungan, dan pengalaman omnichannel yang sama memukau seperti homepage utama.
          </p>
          <div className="mt-10 grid w-full gap-4 sm:grid-cols-3">
            {[
              { label: "Days", value: "60" },
              { label: "Hours", value: "14" },
              { label: "Minutes", value: "22" },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-4xl font-bold">{item.value}</p>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5">
              Masuk Daftar Tamu
            </button>
            <button className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5">
              Lihat Sneak Peek
            </button>
          </div>
        </div>
      </section>

      {/* Sneak Peek Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.6em] text-milky-blue/80">Sneak Peek</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Glimpse of the upcoming drops.</h2>
          <p className="mt-3 text-base text-white/70">
            Dirancang untuk menyatu dengan storytelling visual di halaman utama kami.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {sneakPeeks.map((item) => (
            <div key={item.title} className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br p-6 shadow-2xl" style={{ backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(15,23,42,0.8))" }}>
              <span className="text-xs uppercase tracking-[0.4em] text-white/60">{item.badge}</span>
              <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-white/70">{item.description}</p>
              <div className="mt-6 inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/60">
                Crafted Preview
              </div>
              <div className={`pointer-events-none absolute inset-0 opacity-60 bg-gradient-to-br ${item.accent}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Experience Pillars */}
      <section className="bg-slate-900/60 py-16">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.6em] text-white/40">Why wait</p>
            <h2 className="mt-3 text-3xl font-semibold">Pengalaman Coming Soon yang bisa Anda rasakan lebih awal</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {experiencePillars.map((pillar) => (
              <div key={pillar.title} className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl">
                <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-white/5 p-3">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-semibold">{pillar.title}</h3>
                <p className="mt-3 text-sm text-white/70">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Launch Timeline */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-8">
        <div className="mb-10 flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.6em] text-milky-blue/80">Launch Timeline</p>
            <h2 className="mt-2 text-3xl font-semibold">Simak agenda menuju perilisan.</h2>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
            <Calendar className="h-4 w-4" /> Save the date
          </button>
        </div>
        <div className="space-y-6">
          {launchMoments.map((moment) => (
            <div key={moment.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">{moment.label}</p>
              <h3 className="mt-3 text-2xl font-semibold">{moment.date}</h3>
              <p className="mt-2 text-sm text-white/70">{moment.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Notify Section */}
      <section className="relative overflow-hidden rounded-t-[3rem] bg-gradient-to-br from-slate-900 via-indigo-800 to-black px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-white/50">Stay notified</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Daftar untuk mendapatkan akses awal, styling kit, dan hadiah eksklusif.</h2>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            Kami akan mengirimkan update singkat ketika koleksi siap tayang di homepage dan di flagship store pilihan.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Alamat email Anda"
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            />
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900">
              <Bell className="h-4 w-4" /> Kirim Notifikasi
            </button>
          </div>
          <p className="mt-4 text-xs text-white/50">Kami menghargai privasi Anda dan hanya mengirim update penting.</p>
        </div>
      </section>
    </div>
  );
};

export default About;
