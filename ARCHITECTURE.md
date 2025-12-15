# Clean Architecture + Repository Pattern

Bu proje, backend olmadan geliştirilmiş ve backend geldiğinde minimum değişiklikle gerçek API'ye bağlanmak için tasarlanmıştır.

## Mimari Yapı

### Katmanlar

```
┌─────────────────────────────────────┐
│   PRESENTATION (UI)                 │
│   - Screens                         │
│   - Components                      │
│   - State Management (ViewModel)    │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   DOMAIN (Business Logic)           │
│   - Entities                        │
│   - Repository Interfaces           │
│   - Use Cases                      │
│   - Result/Error Types             │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   DATA (Implementation)             │
│   - Repository Implementations      │
│   - DataSources (Fake/Api)         │
│   - DTOs & Mappers                 │
└─────────────────────────────────────┘
```

### Klasör Yapısı

```
cityDiscovery/
├── domain/                    # Domain katmanı (UI'dan bağımsız)
│   ├── entities/             # Domain entities
│   │   ├── Venue.ts
│   │   ├── User.ts
│   │   └── Review.ts
│   ├── repositories/         # Repository interfaces
│   │   ├── AuthRepository.ts
│   │   ├── VenueRepository.ts
│   │   ├── ReviewRepository.ts
│   │   └── FavoriteRepository.ts
│   ├── usecases/             # Use cases
│   │   ├── GetNearbyVenuesUseCase.ts
│   │   ├── SearchVenuesUseCase.ts
│   │   └── ToggleFavoriteUseCase.ts
│   └── common/               # Common types
│       └── Result.ts        # Result<T> pattern
│
├── data/                      # Data katmanı
│   ├── datasources/         # Data sources
│   │   ├── FakeRemoteDataSource.ts  # Mock data (şu an kullanılıyor)
│   │   └── ApiRemoteDataSource.ts   # Real API (TODO)
│   └── repositories/        # Repository implementations
│       ├── AuthRepositoryImpl.ts
│       ├── VenueRepositoryImpl.ts
│       ├── ReviewRepositoryImpl.ts
│       └── FavoriteRepositoryImpl.ts
│
├── presentation/             # Presentation katmanı
│   ├── components/          # UI components
│   │   ├── HomeHeader.tsx
│   │   ├── MapPreviewCard.tsx
│   │   ├── SearchInput.tsx
│   │   ├── CategoryChips.tsx
│   │   ├── VenueCard.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── EmptyState.tsx
│   │   └── ErrorState.tsx
│   └── state/               # State management
│       └── HomeViewModel.ts
│
├── di/                       # Dependency Injection
│   └── Container.ts         # DI Container (tek flag ile swap)
│
└── app/                      # Expo Router screens
    ├── home/
    │   ├── index.tsx        # Home/Discovery screen
    │   ├── map.tsx
    │   ├── venue/[id].tsx
    │   ├── add-venue.tsx
    │   └── _layout.tsx      # Bottom navigation
```

## DataSource Swap

### Şu An: Fake DataSource

`di/Container.ts` dosyasında:

```typescript
const USE_FAKE_DATA_SOURCE = true; // ← Şu an fake kullanılıyor
```

Fake data source:
- Local mock data (10 mekan)
- `Future.delayed` ile network simülasyonu
- Random error simülasyonu (%10)
- Arama, filtreleme, pagination mantığı

### Backend Geldiğinde: API DataSource

1. `di/Container.ts` dosyasında flag'i değiştir:
```typescript
const USE_FAKE_DATA_SOURCE = false; // ← API'ye geç
```

2. `data/datasources/ApiRemoteDataSource.ts` dosyasındaki TODO'ları implement et:
   - Endpoint URL'lerini ekle
   - HTTP client'ı yapılandır (fetch/axios)
   - Request/Response mapping'leri yap

3. **UI ve State katmanında HİÇBİR DEĞİŞİKLİK GEREKMEZ!**

## Özellikler

### Home Screen
- ✅ Konum seçimi (header)
- ✅ Bildirim ikonu
- ✅ Harita preview kartı
- ✅ Arama input (debounce 300ms)
- ✅ Kategori filtreleri (chips)
- ✅ Mekan kartları (infinite scroll)
- ✅ Pull-to-refresh
- ✅ Loading states (skeleton)
- ✅ Empty state
- ✅ Error state (retry)
- ✅ Pagination

### Navigation
- ✅ Bottom navigation (5 tab)
- ✅ Floating Action Button (FAB) - Mekan ekle
- ✅ Home → Map
- ✅ Home → Venue Detail
- ✅ FAB → Add Venue

## State Management

`useHomeViewModel` hook'u ile state yönetimi:
- Loading states
- Error handling
- Pagination
- Search (debounced)
- Filter
- Refresh

## Repository Pattern

Her feature için repository interface tanımlı:
- `AuthRepository`
- `VenueRepository`
- `ReviewRepository`
- `FavoriteRepository`

Repository'ler `Result<T>` pattern kullanır:
```typescript
Result<Venue[]> = Success<Venue[]> | Failure
```

## Error Handling

`Result<T>` pattern ile:
- `Success<T>`: Başarılı sonuç
- `Failure`: Hata (AppError içerir)

Error types:
- `NetworkFailure`
- `AuthFailure`
- `ValidationFailure`
- `NotFoundFailure`
- `UnknownFailure`

## Mock Data

10 adet mock mekan:
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

Her mekan:
- Cover photo
- Rating
- Categories
- Price level
- Distance
- Open/Closed status

## Backend'e Geçiş Adımları

1. **API Base URL**: `data/datasources/ApiRemoteDataSource.ts` içinde `API_BASE_URL`'i güncelle

2. **Endpoints**: Her method için TODO'ları implement et:
   ```typescript
   async getNearby(params: GetNearbyParams): Promise<Venue[]> {
     const response = await fetch(`${this.baseUrl}/venues/nearby?lat=${params.lat}&lng=${params.lng}...`);
     // Parse response, map to Venue[]
   }
   ```

3. **Authentication**: Token management ekle (headers, storage)

4. **Error Mapping**: API error'larını `AppError`'a map et

5. **DI Flag**: `di/Container.ts` içinde `USE_FAKE_DATA_SOURCE = false` yap

6. **Test**: Tüm feature'ları test et

## Test Senaryoları

### Fake DataSource ile:
- ✅ Home screen yükleniyor
- ✅ Mekanlar listeleniyor
- ✅ Arama çalışıyor
- ✅ Filtreleme çalışıyor
- ✅ Pagination çalışıyor
- ✅ Refresh çalışıyor
- ✅ Favori toggle çalışıyor
- ✅ Navigation çalışıyor

### API'ye Geçince:
- Aynı testler çalışmalı (sadece data source değişti)

## Notlar

- UI katmanı sadece Domain entities görür
- UI katmanı HTTP/JSON/DTO görmez
- Repository pattern sayesinde data source swap kolay
- Use cases business logic'i encapsulate eder
- Result pattern ile type-safe error handling
