# City Discovery - Cafe/Mekan Keşif Uygulaması

React Native/Expo ile geliştirilmiş, Clean Architecture + Repository Pattern kullanan mobil uygulama.

## 🏗️ Mimari

Bu proje **Clean Architecture** prensiplerine göre tasarlanmıştır:
- **Presentation**: UI katmanı (screens, components, state)
- **Domain**: Business logic (entities, repository interfaces, use cases)
- **Data**: Implementation (repository implementations, data sources)

Backend yokken **Fake DataSource** ile geliştirilmiş, backend geldiğinde sadece **DI flag değiştirilerek** gerçek API'ye bağlanabilir.

Detaylı mimari dokümantasyonu için: [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🚀 Kurulum

```bash
# Dependencies yükle
npm install

# Expo başlat
npm start

# Android
npm run android

# iOS
npm run ios
```

## 📁 Proje Yapısı

```
cityDiscovery/
├── domain/              # Domain katmanı (business logic)
│   ├── entities/       # Venue, User, Review
│   ├── repositories/   # Repository interfaces
│   ├── usecases/       # Business use cases
│   └── common/         # Result<T> pattern
│
├── data/               # Data katmanı
│   ├── datasources/   # FakeRemoteDataSource (şu an)
│   └── repositories/  # Repository implementations
│
├── presentation/       # UI katmanı
│   ├── components/    # Reusable components
│   └── state/         # ViewModels
│
├── di/                 # Dependency Injection
│   └── Container.ts   # USE_FAKE_DATA_SOURCE flag
│
└── app/                # Expo Router screens
    └── home/          # Home/Discovery screen
```

## 🎯 Özellikler

### Home / Keşif Sayfası
- ✅ Konum seçimi (header)
- ✅ Bildirim ikonu
- ✅ Harita preview kartı
- ✅ Arama (debounce 300ms)
- ✅ Kategori filtreleri
- ✅ Mekan kartları (infinite scroll)
- ✅ Pull-to-refresh
- ✅ Loading/Empty/Error states
- ✅ Pagination

### Navigation
- ✅ Bottom navigation (5 tab)
- ✅ Floating Action Button (FAB)
- ✅ Home → Map
- ✅ Home → Venue Detail
- ✅ FAB → Add Venue

## 🔄 Backend'e Geçiş

### Şu An (Fake DataSource)
```typescript
// di/Container.ts
const USE_FAKE_DATA_SOURCE = true; // ← Mock data kullanılıyor
```

### Backend Geldiğinde
1. `di/Container.ts` içinde flag'i değiştir:
   ```typescript
   const USE_FAKE_DATA_SOURCE = false; // ← API'ye geç
   ```

2. `data/datasources/ApiRemoteDataSource.ts` içindeki TODO'ları implement et:
   - API base URL
   - Endpoint implementations
   - Request/Response mapping

3. **UI ve State katmanında HİÇBİR DEĞİŞİKLİK GEREKMEZ!**

## 📦 Mock Data

10 adet mock mekan içerir:
- Espresso Lab - Moda
- Burger House
- Pizza Corner
- Sushi Bar
- Cafe Central
- Steak House
- Vegan Delight
- Baklava House
- Rooftop Bar
- Breakfast Club

## 🧪 Test

```bash
# Uygulamayı başlat
npm start

# Home screen'i test et:
# - Mekanlar yükleniyor mu?
# - Arama çalışıyor mu?
# - Filtreleme çalışıyor mu?
# - Pagination çalışıyor mu?
# - Refresh çalışıyor mu?
# - Favori toggle çalışıyor mu?
```

## 📝 Notlar

- UI katmanı sadece **Domain entities** görür
- UI katmanı **HTTP/JSON/DTO görmez**
- Repository pattern sayesinde data source swap kolay
- Result pattern ile type-safe error handling
- SOLID prensipleri uygulanmış

## 🔧 Teknolojiler

- **React Native** 0.81.4
- **Expo** ~54.0.13
- **Expo Router** (file-based routing)
- **TypeScript** 5.9.2
- **Clean Architecture**
- **Repository Pattern**

## 📚 Daha Fazla Bilgi

Detaylı mimari dokümantasyonu: [ARCHITECTURE.md](./ARCHITECTURE.md)


ÖNEMLİ
1) Roller
✅ domain/ (iş kuralları)
entities, services, repositories (interface/port) burada
Sadece şunu bilir: “Bana şu fonksiyon lazım” (interface)
Asla data/ import etmez

✅ data/ (gerçek veri kaynağı)
API çağrısı (fetch/axios), AsyncStorage, cache vs.
Domain’deki repository interface’lerini implement eder
data → domain import edebilir (interface için)

✅ di/ (bağlayıcı / wiring)
“Hangi repository kullanılacak?” kararını verir
VenueRepository = HttpVenueRepository gibi eşleştirir
Service’leri repository ile oluşturur
UI / hook buradan hazır servisleri alır




Domain “NE ister”,
Data “NASIL sağlar”.

Domain iş kuralını bilir

Data: API, cache, mock, mapper gibi kirli işleri yapar

Domain → data’yı asla tanımaz




✅ SON HAL (EZBERLE)
data/
├── api/          → HTTP, endpoint
├── datasources/  → Veri kaynağı
├── mappers/      → DTO → Entity
├── repositories/ → Domain repo impl
└── mock/         → Fake data

🧠 EZBER CÜMLESİ (çok kritik)

API konuşur
Datasource seçer
Repository bağlar
Mapper temizler
Domain yönetir