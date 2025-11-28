# 🎉 New Year’s Eve Registration App – README

## 📌 Overview

This is a **React + TypeScript + Tailwind CSS** application for managing New Year’s Eve party registrations.
It includes:

* Modern animated **home page**
* Stylish **registration form**
* Firework-themed background
* **Registrant list** with delete confirmation modal
* Redux-powered data storage
* Responsive design

---

## 🚀 Features

### ✅ Home Page

* Gradient party-themed background
* Animated countdown
* Event details + CTA button
* Firework effects

### 📝 Registration Form

* Floating labels
* Inline error handling
* Blurred background UI
* Image preview and upload
* Auto-reset on successful submission
* Redirects to registrant list page

### 📄 Registrant List

* Card-style UI
* Delete button per card
* Smooth modal popup
* Empty-state card with animation

---

## 🛠️ Tech Stack

* **React 18**
* **React Router DOM**
* **Redux Toolkit**
* **Framer Motion**
* **Tailwind CSS**
* **TypeScript**

---

## 📂 Project Structure

```
src/
 ├── components/
 │    ├── Navbar.tsx
 │    ├── Countdown.tsx
 │    ├── RegistrantForm.tsx
 │    ├── Modal.tsx
 │    ├── FireworksBackground.tsx
 │
 ├── pages/
 │    ├── Home.tsx
 │    ├── Register.tsx
 │    ├── List.tsx
 │
 ├── redux/
 │    ├── registrantSlice.ts
 │    ├── store.ts
 │
 ├── App.tsx
 ├── main.tsx
 ├── index.css
```

---

## 📦 Installation & Setup

### 1️⃣ Clone Repository

If you already created a remote repo (see next section), clone it:

```sh
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

---

### 2️⃣ Install Dependencies

```sh
npm install
```

---

### 3️⃣ Start Development Server

```sh
npm run dev
```

---

### 4️⃣ Build for Production

```sh
npm run build
```

---