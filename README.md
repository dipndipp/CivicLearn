<!-- ================= HEADER / BADGES ================= -->
<p align="center">
  <img src="https:///https://github.com/dipndipp/CivicLearn/tree/main/cl-fe/public/logo.svg" alt="CivicLearn Logo" width="200" />
</p>

<h1 align="center">CivicLearn</h1>

<p align="center">
  <a href="https://github.com/dipndipp/CivicLearn/actions"><img alt="Build Status" src="https://img.shields.io/github/actions/workflow/status/dipndipp/CivicLearn/ci.yml?branch=main"/></a>
  <a href="https://github.com/dipndipp/CivicLearn/releases"><img alt="Release" src="https://img.shields.io/github/v/release/dipndipp/CivicLearn"/></a>
  <a href="https://github.com/dipndipp/CivicLearn/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/github/license/dipndipp/CivicLearn"/></a>
</p>

---

## 🎯 Sekilas Tentang CivicLearn

**CivicLearn** adalah aplikasi berbasis web yang dirancang sebagai **platform kompetisi & edukasi kewargaan** untuk mendukung tema SDG (khususnya poin ke-4 & poin ke-16).  
Platform bertujuan mendorong partisipasi aktif, dialog, dan literasi masyarakat dalam isu-isu sosial dan pemerintahan.

Beberapa fitur utama:

- 🧑‍💻 Autentikasi (Login / Register) menggunakan JWT  
- 📰 CRUD Berita / Artikel  
- 💬 CRUD Forum Diskusi

### Backend (cl-be)
```bash
cd cl-be
go mod download
go run cmd/server/main.go

### Frontend (cl-fe)
```bash
cd cl-fe
npm install
npm run dev

