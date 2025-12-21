# AFET Harita Projesi 🌍

İnteraktif afet ve acil durum haritası uygulaması. Kullanıcıların çeşitli afet türlerini harita üzerinde görselleştirebileceği, filtreleyebileceği ve detaylı bilgi alabileceği modern bir web uygulaması.

## 🚀 Teknolojiler

- **Framework:** Next.js 16.1.0 (App Router)
- **UI:** React 19.2.3
- **Harita:** Leaflet 1.9.4 + React Leaflet 5.0.0
- **Stil:** Tailwind CSS 4
- **Code Quality:** Biome 2.2.0
- **Derleyici:** React Compiler 1.0.0
- **Tip Güvenliği:** TypeScript 5

## 📦 Kurulum

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

3. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 🏗️ Proje Yapısı

```
├── app/                    # Next.js App Router sayfaları
│   ├── page.tsx           # Ana sayfa
│   ├── layout.tsx         # Genel layout
│   └── globals.css        # Global stiller
├── components/            # React bileşenleri
│   ├── DisasterMap.tsx    # Ana harita bileşeni
│   ├── FilterControls.tsx # Filtre kontrolleri
│   ├── PopupContent.tsx   # Harita popup içeriği
│   └── CountryModal.tsx   # Ülke detay modal
├── afet-egitim/          # Afet eğitim modülü
│   ├── index.html
│   ├── script.js
│   └── style.css
└── public/               # Statik dosyalar
```

## ✨ Özellikler

- 🗺️ **İnteraktif Harita:** Leaflet tabanlı dinamik harita görünümü
- 🔍 **Filtreleme:** Afet türüne göre filtreleme özellikleri
- 📍 **Marker Sistemi:** Afet noktalarını işaretleme
- 💬 **Popup Detaylar:** Harita üzerinde detaylı bilgi gösterimi
- 🌐 **Ülke Modalı:** Ülke bazlı detaylı bilgi ekranı
- 📱 **Responsive Tasarım:** Mobil ve masaüstü uyumlu
- 🎓 **Eğitim Modülü:** Afet eğitimi ve bilgilendirme içeriği

## 🛠️ Kullanılabilir Komutlar

```bash
# Geliştirme sunucusunu başlat
npm run dev

# Projeyi derle
npm run build

# Üretim sunucusunu başlat
npm run start

# Kod kalitesi kontrolü (Biome)
npm run lint

# Kod formatlama (Biome)
npm run format
```

## 🗺️ Harita Bileşenleri

### DisasterMap
Ana harita bileşeni, Leaflet ve React Leaflet kullanarak interaktif harita deneyimi sağlar.

### FilterControls
Kullanıcıların afet türlerine göre filtreleme yapmasını sağlar.

### PopupContent
Harita markerları üzerine tıklandığında gösterilen detaylı bilgi içeriği.

### CountryModal
Ülke bazlı afet bilgilerini detaylı şekilde gösteren modal bileşeni.

## 🎓 Afet Eğitim Modülü

`afet-egitim` klasörü altında, vanilla JavaScript ile geliştirilmiş bir afet eğitimi modülü bulunmaktadır. Bu modül:

- Afet türleri hakkında bilgilendirme
- Acil durum prosedürleri
- Hazırlık ve önlem bilgileri

içerir.

## 🎨 Stil ve Tasarım

Proje Tailwind CSS 4 kullanır. Modern ve minimalist bir tasarım diliyle geliştirilmiştir.

## 📝 Kod Kalitesi

Proje, kod kalitesi ve formatı için **Biome** kullanır. ESLint ve Prettier yerine daha hızlı ve modern bir alternatif sunar.

## 🌐 Deployment

Next.js projesini Vercel, Netlify veya herhangi bir Node.js destekleyen platformda deploy edebilirsiniz:

```bash
npm run build
npm run start
```

## 📄 Lisans

Bu proje afet farkındalığı ve bilgilendirme amacıyla geliştirilmiştir.
