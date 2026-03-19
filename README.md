# EventHub — Event Management Dashboard

A full-stack event management platform built with **Next.js 16**, **TypeScript**, and **TailwindCSS**. The platform supports two user roles — **Attendees** and **Organizers** — with separate dashboards, real-time registration tracking, and a polished UI.

---

## 📸 Screenshots

> Login → Event Listing → Event Detail → Organizer Dashboard

---

## 🚀 Features

### Attendee
- Browse and search events with category filters
- View full event details with real-time seat availability
- Register for events and receive a confirmation summary
- Manage all personal registrations (view / cancel)
- Edit profile (name, email, avatar, password)  
- Notification panel for reminders and event updates

### Organizer
- Dashboard with stats: total events, registrations, upcoming events, conversion rate
- Create events with cover image, rich description, date/time, location, category, and max seat count
- Manage events (edit, delete, publish, save as draft)
- View a searchable attendee list for each event with CSV export

### Shared
- Role-aware Navbar with notification bell badge and profile dropdown
- Responsive design — works on mobile, tablet, and desktop
- Smooth micro-animations throughout the UI
- Custom 404 error page

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                        # Login
│   ├── register/page.tsx               # Register
│   ├── forgot-password/page.tsx        # Forgot Password
│   ├── not-found.tsx                   # 404 page
│   └── (dashboard)/
│       ├── layout.tsx                  # Shared Navbar layout
│       ├── events/page.tsx             # Event Listing
│       ├── events/[id]/page.tsx        # Event Detail
│       ├── registration-confirmation/  # Registration Confirmation
│       ├── registrations/              # My Registrations
│       ├── profile/                    # User Profile
│       ├── notifications/              # Notifications Panel
│       └── organizer/
│           ├── page.tsx                # Organizer Dashboard
│           ├── events/page.tsx         # My Events
│           ├── events/create/          # Create Event
│           └── registrations/          # Event Registrations View
└── components/
    └── Navbar.tsx                      # Global navigation bar
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js `>= 18`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/event-dashboard.git
cd event-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗺️ Available Routes

| Route | Description |
|---|---|
| `/` | Login page |
| `/register` | Sign up page |
| `/forgot-password` | Password reset |
| `/events` | Event listing (home) |
| `/events/:id` | Event detail & registration |
| `/registration-confirmation` | Post-registration confirmation |
| `/registrations` | My registered events |
| `/profile` | User profile settings |
| `/notifications` | Notification panel |
| `/organizer` | Organizer stats dashboard |
| `/organizer/events` | Manage events |
| `/organizer/events/create` | Create new event |
| `/organizer/registrations` | View attendees for an event |

---

## 🔮 Upcoming Features (Planned)

- [ ] JWT-based authentication (login / register wired to backend)
- [ ] PostgreSQL / MongoDB database integration
- [ ] Real-time registration count using WebSockets
- [ ] Email notifications via Nodemailer or SendGrid
- [ ] Deployed on Vercel

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 📄 License

MIT License — feel free to use this project for learning or as a starting point for your own event platform.
