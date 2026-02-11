# 🎮 Pokemon Battle Game - Android Kurulum Rehberi

## 📱 YÖNTEM 1: PWA (Progressive Web App) - KOLAY

### Adım 1: Oyunu Web'e Yükle

**Seçenek A - GitHub Pages (ÜCRETSİZ):**

1. GitHub hesabı oluşturun: https://github.com
2. Yeni repository oluşturun (isim: `pokemon-game`)
3. Dosyaları yükleyin:
   - `index.html`
   - `manifest.json`
   - `sw.js`
4. Settings → Pages → Branch: main → Save
5. Siteniz hazır: `https://kullaniciadi.github.io/pokemon-game`

**Seçenek B - Netlify (ÜCRETSİZ):**

1. https://www.netlify.com adresine gidin
2. "Add new site" → "Deploy manually"
3. Tüm dosyaları sürükle-bırak yapın
4. Site hazır! (örn: `https://pokemon-xyz.netlify.app`)

**Seçenek C - Vercel (ÜCRETSİZ):**

1. https://vercel.com adresine gidin
2. "New Project" tıklayın
3. Dosyaları yükleyin
4. Deploy edin!

### Adım 2: Android'e Yükle

1. **Android telefonunuzdan** sitenize gidin (Chrome kullanın)
2. Sağ üstteki **⋮** (üç nokta) menüye tıklayın
3. **"Ana ekrana ekle"** / **"Add to Home Screen"** seçin
4. Uygulama adını onaylayın
5. **Tamam** tıklayın

**✅ Artık ana ekranınızda tam bir uygulama olarak var!**

---

## 📱 YÖNTEM 2: APK Oluştur (İLERİ SEVİYE)

React Native veya Capacitor kullanarak gerçek APK:

### Capacitor ile:

```bash
npm install -g @capacitor/cli
npm install @capacitor/core @capacitor/android

# Proje oluştur
npx cap init

# Android ekle
npx cap add android

# Build et
npx cap sync
npx cap open android

# Android Studio'da APK oluştur
```

---

## 🎯 ÖNERĐLEN: YÖNTEM 1 (PWA)

Çünkü:
- ✅ **5 dakikada** hazır
- ✅ **ÜCRETSİZ** hosting
- ✅ **Gerçek uygulama** gibi çalışır
- ✅ **Otomatik güncelleme**
- ✅ **Çevrimdışı** çalışır
- ✅ **APK yüklemeye** gerek yok

---

## 🚀 HIZLI BAŞLANGIÇ

### GitHub Pages ile 5 Dakikada:

1. **GitHub'da repository oluştur**
   - https://github.com/new
   - İsim: `pokemon-game`
   - Public seç
   - Create repository

2. **Dosyaları yükle**
   - "uploading an existing file" tıkla
   - `index.html`, `manifest.json`, `sw.js` sürükle
   - Commit changes

3. **GitHub Pages aktif et**
   - Settings → Pages
   - Branch: main
   - Save
   - 2 dakika bekle

4. **Telefondan aç**
   - `https://KULLANICIADIN.github.io/pokemon-game`
   - Chrome'da aç
   - ⋮ → Ana ekrana ekle

**🎉 Oyununuz hazır!**

---

## 📝 Alternatif: Direkt HTML Dosyası

Eğer web'e yüklemek istemezseniz:

1. `index.html` dosyasını telefona atın
2. Dosya yöneticisiyle açın
3. Chrome ile açın
4. Oyun çalışır! (ama ana ekrana ekleyemezsiniz)

---

## 🎮 Oyun Özellikleri

- ⚡ 6 farklı Pokemon
- 🎯 Sıra tabanlı savaş
- 💪 Tip avantajları
- 📊 HP sistemi
- 🏆 Skor takibi
- 📱 Mobil optimize
- 🎨 Retro pixel art

---

## ⚠️ Sorun Giderme

**Oyun açılmıyor:**
- Chrome güncel mi kontrol edin
- JavaScript açık mı kontrol edin
- İnternet bağlantınız var mı?

**Ana ekrana eklenmiyor:**
- Chrome tarayıcı kullanın (Safari/Firefox değil)
- HTTPS üzerinden açın
- "Add to Home Screen" seçeneğini görüyor musunuz?

**Çevrimdışı çalışmıyor:**
- Bir kere açtıktan sonra service worker yüklenir
- İkinci açılışta çevrimdışı çalışır

---

## 💡 İpuçları

- Oyun **tamamen offline** çalışır
- **Veri kullanmaz** (ilk yüklemeden sonra)
- **Ana ekrandan** açınca tam ekran
- **Hiç reklam yok**
- **Hafif** (< 100KB)

---

## 🆘 Yardım

Sorun yaşarsanız bana yazın!

**Happy Gaming! 🎮⚡**
