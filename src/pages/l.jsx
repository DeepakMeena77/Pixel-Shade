'use client'

import { useState, useEffect, useRef } from 'react'
import {
  MessageCircle,
  X,
  Send,
  Monitor,
  Tv,
  Smartphone,
  Building2,
  ShoppingBag,
  GraduationCap,
  Hotel,
  Mail,
  Phone,
  MapPin,
  Menu,
  ChevronRight,
  Play
} from 'lucide-react'

const LOGO_URL =
  'https://customer-assets.emergentagent.com/job_685c8ae8-480c-447f-8ac5-1e71bdb7b7d9/artifacts/mw2tfdxr_WhatsApp%20Image%202026-03-12%20at%2019.24.24.jpeg'

const VIDEOS = {
  v1: 'https://customer-assets.emergentagent.com/job_display-canvas-1/artifacts/fwt0abfx_8733251-uhd_2160_4096_25fps.mp4',
  v2: 'https://customer-assets.emergentagent.com/job_display-canvas-1/artifacts/sek70gez_7242899-uhd_3840_2160_25fps.mp4',
  v3: 'https://customer-assets.emergentagent.com/job_display-canvas-1/artifacts/gy3vyyhw_17675069-uhd_3840_2160_30fps.mp4'
}

const IMAGES = {
  about:
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80'
}

const PRODUCTS = [
  {
    icon: Monitor,
    title: 'Digital Signage Displays',
    desc: 'Ultra-high resolution commercial displays for impactful visual communication.'
  },
  {
    icon: Tv,
    title: 'Video Wall Systems',
    desc: 'Seamless multi-panel video walls for immersive experiences.'
  },
  {
    icon: Smartphone,
    title: 'Interactive Kiosks',
    desc: 'Touch-enabled kiosks for customer engagement.'
  },
  {
    icon: Monitor,
    title: 'Digital Standees',
    desc: 'Freestanding digital displays for retail and events.'
  },
  {
    icon: Tv,
    title: 'LED Display Solutions',
    desc: 'High-brightness LED screens for advertising.'
  },
  {
    icon: Smartphone,
    title: 'Touch Experience Systems',
    desc: 'Advanced multi-touch displays for collaboration.'
  }
]

const INDUSTRIES = [
  {
    icon: ShoppingBag,
    name: 'Retail',
    desc: 'Drive sales through immersive retail displays.'
  },
  {
    icon: Building2,
    name: 'Corporate',
    desc: 'Enhance corporate communication.'
  },
  {
    icon: GraduationCap,
    name: 'Education',
    desc: 'Improve learning environments.'
  },
  {
    icon: Hotel,
    name: 'Hospitality',
    desc: 'Create unforgettable guest experiences.'
  }
]

/* ---------------- Landing Page ---------------- */

const LandingPage = ({ onEnter }) => (
  <div style={{ height: '100vh', overflow: 'hidden' }}>
    <nav className="landing-navbar">
      <img src={LOGO_URL} width={150} />
      <button onClick={onEnter}>Enter</button>
    </nav>

    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 60px)'
      }}
    >
      {Object.values(VIDEOS).map((video, i) => (
        <div key={i} style={{ flex: 1, position: 'relative' }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  </div>
)

/* ---------------- Navbar ---------------- */

const Navbar = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'products', label: 'PRODUCTS' },
    { id: 'contact', label: "LET'S CONNECT" }
  ]

  return (
    <nav className="navbar">
      <img src={LOGO_URL} width={150} />

      <ul>
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={'#' + item.id}
              onClick={(e) => {
                e.preventDefault()
                onNavigate(item.id)
              }}
              style={{
                color: activeSection === item.id ? '#00aeef' : '#111'
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <button>
        <Menu size={24} />
      </button>
    </nav>
  )
}

/* ---------------- Hero ---------------- */

const HeroSection = () => (
  <section id="home" className="hero-section">
    <h1>Engineering the Future of Visual Communication</h1>
    <p>
      Transforming spaces into immersive digital ecosystems powered by
      advanced visual technology.
    </p>

    <button>
      <Play size={18} /> Explore
    </button>
  </section>
)

/* ---------------- About ---------------- */

const AboutSection = () => (
  <section id="about" className="about-section">
    <div>
      <h2>About Vertex Edges</h2>
      <p>
        Vertex Edges is a digital powerhouse delivering innovative display
        solutions across industries.
      </p>
    </div>

    <img src={IMAGES.about} width="500" />
  </section>
)

/* ---------------- Products ---------------- */

const ProductsSection = () => (
  <section id="products">
    <h2>Display Solutions</h2>

    <div className="grid">
      {PRODUCTS.map((p, i) => (
        <div key={i}>
          <p.icon size={40} color="#00aeef" />
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
        </div>
      ))}
    </div>
  </section>
)

/* ---------------- Industries ---------------- */

const IndustriesSection = () => (
  <section>
    <h2>Industries</h2>

    <div className="grid">
      {INDUSTRIES.map((i, idx) => (
        <div key={idx}>
          <i.icon size={32} color="#00aeef" />
          <h3>{i.name}</h3>
          <p>{i.desc}</p>
        </div>
      ))}
    </div>
  </section>
)

/* ---------------- Stats ---------------- */

const StatsSection = () => {
  const stats = [
    { value: '2500+', label: 'Clients' },
    { value: '35+', label: 'Cities' },
    { value: '25+', label: 'Products' },
    { value: '125+', label: 'Team' }
  ]

  return (
    <section>
      <div className="grid">
        {stats.map((s, i) => (
          <div key={i}>
            <h3>{s.value}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Contact ---------------- */

const ContactSection = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <section id="contact">
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          required
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <textarea
          placeholder="Message"
          required
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <button type="submit">Send</button>
      </form>
    </section>
  )
}

/* ---------------- Chatbot ---------------- */

const AIChatbot = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! How can I help?' }
  ])
  const [input, setInput] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      { role: 'user', text: input }
    ])

    setInput('')

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: 'Thanks! Our team will assist you soon.'
        }
      ])
    }, 800)
  }

  return (
    <>
      <button
        className="chatbot-fab"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <MessageCircle />}
      </button>

      {open && (
        <div className="chat-window">
          <div className="messages">
            {messages.map((m, i) => (
              <div key={i} className={m.role}>
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === 'Enter' && send()
              }
            />

            <button onClick={send}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

/* ---------------- Main App ---------------- */

export default function App() {
  const [landing, setLanding] = useState(true)
  const [active, setActive] = useState('home')

  const navigate = (id) => {
    setActive(id)

    const el = document.getElementById(id)

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (landing) {
    return <LandingPage onEnter={() => setLanding(false)} />
  }

  return (
    <div>
      <Navbar activeSection={active} onNavigate={navigate} />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <IndustriesSection />
      <StatsSection />
      <ContactSection />
      <AIChatbot />
    </div>
  )
}