import { useEffect, useMemo, useState } from "react";

/* ==========================================================================
   Azure Haven Resort
   A single-page marketing site for a tropical coastal luxury resort.

   Sections:  Navbar · Hero · Introduction · Features · Rooms · Enquiry · Footer
   All editable content lives in the plain JavaScript arrays just below, so you
   can change copy, prices or photos without touching any layout code.
   ========================================================================== */

/* ----------------------------- 1. Content ------------------------------- */

const BRAND = {
  name: "Azure Haven",
  tagline: "Resort & Spa",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2000&q=80";

const INTRO_IMAGES = {
  main: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80",
  inset:
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
};

const BOOKING_IMAGE =
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "The Resort", href: "#about" },
  { label: "Experiences", href: "#experiences" },
  { label: "Rooms & Suites", href: "#rooms" },
  { label: "Enquire", href: "#booking" },
];

const RESORT_STATS = [
  { value: "42", label: "Private villas & suites" },
  { value: "1.2 km", label: "Of white-sand shoreline" },
  { value: "5", label: "Restaurants & bars" },
  { value: "24/7", label: "Personal concierge" },
];

const HERO_HIGHLIGHTS = [
  "Oceanfront suites",
  "Reef-side spa",
  "Private beach dining",
];

const FEATURES = [
  {
    id: "oceanfront",
    icon: "waves",
    title: "Oceanfront Living",
    text: "Wake to the sound of the reef. Every suite and villa faces the water, framed by palm gardens, daybeds and open-air terraces that catch the trade winds.",
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1000&q=80",
    alt: "Infinity pool overlooking the ocean at a tropical resort",
  },
  {
    id: "wellness",
    icon: "leaf",
    title: "Coastal Wellness",
    text: "Our over-water spa blends sea-salt therapies, sunrise yoga on the sandbar and hand-poured botanical oils to restore body and mind.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80",
    alt: "Serene spa treatment room with stone bowls and soft natural light",
  },
  {
    id: "dining",
    icon: "cutlery",
    title: "Bayview Dining",
    text: "Five restaurants led by award-winning chefs, from barefoot beach grills to a nine-course tasting table suspended above the lagoon.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
    alt: "Elegant beachfront restaurant set for dinner at sunset",
  },
];

/* The room gallery is generated from this array - add or remove one and the
   grid, the enquiry form dropdown and the booking links all update together. */
const ROOMS = [
  {
    id: "oceanfront-suite",
    name: "Oceanfront Suite",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    alt: "Bright oceanfront suite with a king bed and open balcony doors",
    price: 680,
    size: "68 m²",
    guests: "2 guests",
    view: "Ocean view",
    description:
      "A calm, light-filled sanctuary with a king bed, marble rain shower and a wraparound balcony that opens straight onto the reef path.",
  },
  {
    id: "coral-villa",
    name: "Coral Plunge-Pool Villa",
    image:
      "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?auto=format&fit=crop&w=1200&q=80",
    alt: "Private villa with a plunge pool surrounded by tropical plants",
    price: 940,
    size: "112 m²",
    guests: "3 guests",
    view: "Pool & garden",
    description:
      "Hidden behind frangipani trees, this walled villa has its own plunge pool, outdoor bath and a shaded veranda for long, slow lunches.",
  },
  {
    id: "lagoon-room",
    name: "Lagoon Garden Room",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    alt: "Garden room with a queen bed and rattan furnishings",
    price: 420,
    size: "42 m²",
    guests: "2 guests",
    view: "Garden view",
    description:
      "Our most-loved room for couples: rattan interiors, a deep soaking tub and a private terrace steps from the lagoon walkway.",
  },
  {
    id: "sunset-penthouse",
    name: "Sunset Penthouse",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
    alt: "Penthouse living room with floor to ceiling windows at dusk",
    price: 1250,
    size: "186 m²",
    guests: "4 guests",
    view: "Panoramic ocean",
    description:
      "The top floor of the Haven Wing: two bedrooms, a private chef's kitchen and a rooftop deck positioned for the nightly sunset.",
  },
  {
    id: "beachfront-bungalow",
    name: "Beachfront Bungalow",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    alt: "Beachfront bungalow with sun loungers on white sand",
    price: 810,
    size: "84 m²",
    guests: "3 guests",
    view: "Direct beach",
    description:
      "Barefoot luxury with your own stretch of sand, an outdoor shower and a hammock strung between two coconut palms.",
  },
  {
    id: "palms-residence",
    name: "Palms Garden Residence",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    alt: "Spacious residence bedroom with soft linen and timber floors",
    price: 560,
    size: "96 m²",
    guests: "4 guests",
    view: "Palm garden",
    description:
      "Two connecting bedrooms and a family lounge opening onto the palm garden - ideal for longer stays with children.",
  },
];

/* ------------------------------- 2. Icons -------------------------------- */

function Icon({ name, className = "icon" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
  };

  if (name === "waves") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M12 1.8v1.5M12 12.7v1.5M19 8h-1.5M4.5 8H3M17 3.4l-1 1M8 12.6l-1 1M17 12.6l-1-1M8 3.4l1 1" />
        <path d="M2.5 17.2c1.7 0 1.7 1.5 3.3 1.5s1.7-1.5 3.4-1.5 1.7 1.5 3.3 1.5 1.7-1.5 3.4-1.5 1.7 1.5 3.3 1.5 1.7-1.5 3.3-1.5" />
        <path d="M2.5 21.2c1.7 0 1.7 1.5 3.3 1.5s1.7-1.5 3.4-1.5 1.7 1.5 3.3 1.5 1.7-1.5 3.4-1.5 1.7 1.5 3.3 1.5 1.7-1.5 3.3-1.5" />
      </svg>
    );
  }

  if (name === "leaf") {
    return (
      <svg {...common}>
        <path d="M12 21.4c-4.3 0-8-2.9-8-6.9 0-3.2 2.3-5.8 4.8-7.5C10.5 5.6 11.6 3.7 12 2c.4 1.7 1.5 3.6 3.2 5 2.5 1.7 4.8 4.3 4.8 7.5 0 4-3.7 6.9-8 6.9Z" />
        <path d="M12 21V9.6" />
      </svg>
    );
  }

  if (name === "cutlery") {
    return (
      <svg {...common}>
        <path d="M9 2.5v4M11 2.5v4M13 2.5v4M9 6.5h4v3.2A2 2 0 0 1 11 11.7h0a2 2 0 0 1-2-2Z" />
        <path d="M11 11.7v9.8" />
        <path d="M17.5 21.5V2.5M17.5 2.5c1.8 1.1 2.7 2.7 2.7 4.6s-.9 3.4-2.7 4.5" />
      </svg>
    );
  }

  if (name === "arrow") {
    return (
      <svg {...common} strokeWidth={2}>
        <path d="M4 12h15" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg {...common} strokeWidth={2.4}>
        <path d="M4.5 12.5l5 5 10-11" />
      </svg>
    );
  }

  if (name === "menu") {
    return (
      <svg {...common} strokeWidth={1.9}>
        <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
      </svg>
    );
  }

  if (name === "close") {
    return (
      <svg {...common} strokeWidth={1.9}>
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    );
  }

  return null;
}

/* ------------------------- 3. Small helpers ------------------------------ */

/* Gently fades sections in as they scroll into view. Falls back to showing
   everything immediately if IntersectionObserver is unavailable. */
function useRevealOnScroll() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatPrice(value) {
  return `$${value.toLocaleString("en-US")}`;
}

function SectionHeading({ eyebrow, title, lead, align = "left", tone = "dark" }) {
  const className = [
    "section-heading",
    align === "center" ? "section-heading--center" : "",
    tone === "light" ? "section-heading--light" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </div>
  );
}

/* ----------------------------- 4. Navbar --------------------------------- */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Solid background when the page is scrolled or the mobile menu is open.
  const solid = scrolled || menuOpen;

  return (
    <header className={solid ? "navbar navbar--scrolled" : "navbar"}>
      <nav className="navbar__inner" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label={`${BRAND.name} ${BRAND.tagline}, back to top`}>
          <span className="brand__mark" aria-hidden="true">
            <Icon name="waves" className="icon icon--brand" />
          </span>
          <span className="brand__text">
            <span className="brand__name">{BRAND.name}</span>
            <span className="brand__tagline">{BRAND.tagline}</span>
          </span>
        </a>

        <ul
          className={menuOpen ? "nav-links is-open" : "nav-links"}
          id="primary-navigation"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a className="btn btn--primary btn--sm nav-cta" href="#booking">
            Book Now
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="icon" />
          </button>
        </div>
      </nav>
    </header>
  );
}

/* ------------------------------ 5. Hero ---------------------------------- */

function Hero() {
  return (
    <section
      id="home"
      className="hero"
      style={{ "--hero-image": `url(${HERO_IMAGE})` }}
    >
      <div className="container hero__inner">
        <p className="hero__eyebrow" data-reveal>
          Private island · Coral Bay
        </p>
        <h1 className="hero__title" data-reveal>
          Where the ocean meets <em>quiet luxury</em>
        </h1>
        <p className="hero__lead" data-reveal>
          Set on a private stretch of white sand, Azure Haven is a sanctuary of
          turquoise water, slow mornings and sun-warmed terraces. Arrive, exhale,
          and let the tide set your schedule.
        </p>

        <div className="hero__actions" data-reveal>
          <a className="btn btn--primary" href="#booking">
            Check availability
            <Icon name="arrow" />
          </a>
          <a className="btn btn--outline-light" href="#rooms">
            Explore rooms &amp; suites
          </a>
        </div>

        <ul className="hero__highlights" data-reveal>
          {HERO_HIGHLIGHTS.map((item) => (
            <li key={item}>
              <Icon name="check" className="icon icon--sm" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a className="hero__cue" href="#about" aria-label="Scroll to the resort introduction">
        <span className="hero__cue-dot" aria-hidden="true" />
        Discover
      </a>
    </section>
  );
}

/* -------------------------- 6. Introduction ------------------------------ */

function Introduction() {
  return (
    <section id="about" className="section intro">
      <div className="container intro__grid">
        <div className="intro__media" data-reveal>
          <img
            className="intro__image"
            src={INTRO_IMAGES.main}
            alt="Palm-lined infinity pool overlooking a turquoise lagoon"
            loading="lazy"
          />
          <img
            className="intro__inset"
            src={INTRO_IMAGES.inset}
            alt="Guests relaxing on a sun deck beside the resort pool"
            loading="lazy"
          />
        </div>

        <div className="intro__content">
          <SectionHeading
            eyebrow="Welcome to Azure Haven"
            title={
              <>
                A private island rhythm, held between the lagoon and the sky.
              </>
            }
          />

          <p className="intro__text" data-reveal>
            Azure Haven began as a family fishing retreat and grew, quietly, into
            one of the Indian Ocean's most considered resorts. We kept what
            mattered: barefoot informality, a house reef teeming with life, and a
            team who remember your name and your coffee order.
          </p>
          <p className="intro__text" data-reveal>
            Forty-two villas and suites are set far apart among coconut palms, so
            the loudest thing you will hear is the water. Days here are spent
            drifting between the reef, the spa pavilion and a shaded daybed with
            a very cold drink.
          </p>

          <dl className="intro__stats" data-reveal>
            {RESORT_STATS.map((stat) => (
              <div className="stat" key={stat.label}>
                <dt className="stat__value">{stat.value}</dt>
                <dd className="stat__label">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <p className="intro__signature" data-reveal>
            <span aria-hidden="true">—</span> Mara Ellison, General Manager
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- 7. Features -------------------------------- */

function FeatureCard({ feature, index }) {
  return (
    <article
      className="feature-card"
      data-reveal
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      <div className="feature-card__media">
        <img src={feature.image} alt={feature.alt} loading="lazy" />
      </div>
      <span className="feature-card__icon" aria-hidden="true">
        <Icon name={feature.icon} className="icon icon--lg" />
      </span>
      <div className="feature-card__body">
        <h3>{feature.title}</h3>
        <p>{feature.text}</p>
      </div>
    </article>
  );
}

function Features() {
  return (
    <section id="experiences" className="section section--sand">
      <div className="container">
        <SectionHeading
          eyebrow="Why guests return"
          title="Crafted for slow, sunlit days"
          lead="Three things define a stay at Azure Haven: the water at your door, the care in our spa, and a kitchen worth planning your day around."
          align="center"
        />

        <div className="features__grid">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 8. Rooms --------------------------------- */

function RoomCard({ room, index, onSelect }) {
  return (
    <article
      className="room-card"
      data-reveal
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      <div className="room-card__media">
        <img src={room.image} alt={room.alt} loading="lazy" />
        <p className="room-card__price">
          From <strong>{formatPrice(room.price)}</strong>
          <span> / night</span>
        </p>
      </div>

      <div className="room-card__body">
        <h3 className="room-card__title">{room.name}</h3>

        <ul className="room-card__meta">
          <li className="chip">{room.size}</li>
          <li className="chip">{room.guests}</li>
          <li className="chip">{room.view}</li>
        </ul>

        <p className="room-card__text">{room.description}</p>

        {/* The room name is sent to the enquiry form, so the dropdown below
            is already filled in for the guest. */}
        <a
          className="btn btn--dark btn--block room-card__cta"
          href="#booking"
          onClick={() => onSelect(room.name)}
        >
          Book this room
          <Icon name="arrow" />
        </a>
      </div>
    </article>
  );
}

function Rooms({ onSelectRoom }) {
  return (
    <section id="rooms" className="section rooms">
      <div className="container">
        <SectionHeading
          eyebrow="Stay with us"
          title="Rooms, suites & villas"
          lead="Rates include daily breakfast, the reef snorkelling gear and use of the spa's thermal pools. Minimum two-night stay in high season."
        />

        <div className="rooms__grid">
          {ROOMS.map((room, index) => (
            <RoomCard
              key={room.id}
              room={room}
              index={index}
              onSelect={onSelectRoom}
            />
          ))}
        </div>

        <p className="rooms__note" data-reveal>
          Looking for something else? Our reservations team can arrange connecting
          villas, private chefs and celebrations on the sand.
        </p>
      </div>
    </section>
  );
}

/* --------------------------- 9. Booking/Enquiry --------------------------- */

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  adults: "2",
  children: "0",
  room: "",
  message: "",
};

const FIELD_ORDER = ["name", "email", "phone", "checkIn", "checkOut", "room"];

function validateEnquiry(form, today) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please tell us your name.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Please enter at least 2 characters.";
  }

  if (!form.email.trim()) {
    errors.email = "An email address is required so we can reply.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = "That email address does not look right.";
  }

  if (form.phone.trim() && form.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid phone number, or leave it blank.";
  }

  if (!form.checkIn) {
    errors.checkIn = "Choose an arrival date.";
  } else if (form.checkIn < today) {
    errors.checkIn = "Arrival cannot be in the past.";
  }

  if (!form.checkOut) {
    errors.checkOut = "Choose a departure date.";
  } else if (form.checkIn && form.checkOut <= form.checkIn) {
    errors.checkOut = "Departure must be after arrival.";
  }

  if (!form.room) {
    errors.room = "Please choose a room or suite.";
  }

  return errors;
}

function FieldError({ field, message }) {
  if (!message) return null;
  return (
    <p className="field-error" id={`enquiry-${field}-error`} role="alert">
      {message}
    </p>
  );
}

function BookingEnquiry({ prefillRoom }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // When a guest clicks "Book this room", copy the room name into the form.
  useEffect(() => {
    if (prefillRoom) {
      setForm((previous) => ({ ...previous, room: prefillRoom }));
    }
  }, [prefillRoom]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateEnquiry(form, today);
    setErrors(nextErrors);

    const firstProblem = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstProblem) {
      const input = document.getElementById(`enquiry-${firstProblem}`);
      if (input) input.focus();
      return;
    }

    // No booking backend is connected - we simply confirm that the enquiry
    // was captured locally, and never claim a reservation has been made.
    setSubmitted(true);
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
  }

  function aria(field) {
    return {
      "aria-invalid": errors[field] ? "true" : "false",
      "aria-describedby": errors[field] ? `enquiry-${field}-error` : undefined,
    };
  }

  return (
    <section id="booking" className="section section--ocean booking">
      <div className="container">
        <SectionHeading
          eyebrow="Begin your escape"
          title="Send a booking enquiry"
          lead="Tell us your dates and we will confirm availability and current rates within 24 hours. No payment is required to enquire."
          tone="light"
        />

        <div className="booking__grid">
          <aside className="booking__aside" data-reveal>
            <img
              className="booking__image"
              src={BOOKING_IMAGE}
              alt="Resort terrace at golden hour with loungers facing the sea"
              loading="lazy"
            />
            <div className="booking__contact">
              <h3>Speak to reservations</h3>
              <p>
                Our team is on the island from 07:00 to 22:00 (GMT+5) and can
                arrange transfers, celebrations and dive courses for you.
              </p>
              <ul className="booking__list">
                <li>
                  <span>Phone</span>
                  <a href="tel:+9604001200">+960 400 1200</a>
                </li>
                <li>
                  <span>Email</span>
                  <a href="mailto:stay@azurehaven.example">stay@azurehaven.example</a>
                </li>
                <li>
                  <span>Address</span>
                  <strong>Coral Bay, North Atoll</strong>
                </li>
              </ul>
            </div>
          </aside>

          <div className="form-card">
            {submitted ? (
              <div className="booking-success" role="status" aria-live="polite">
                <span className="booking-success__icon" aria-hidden="true">
                  <Icon name="check" className="icon icon--lg" />
                </span>
                <h3>Enquiry received</h3>
                <p>
                  Thank you, {form.name.trim().split(" ")[0]}. This is a booking
                  enquiry only &mdash; <strong>it is not a confirmed
                  reservation</strong> and no payment has been taken.
                </p>

                <ul className="booking-success__list">
                  <li>
                    <span>Arrival</span>
                    <strong>{formatDate(form.checkIn)}</strong>
                  </li>
                  <li>
                    <span>Departure</span>
                    <strong>{formatDate(form.checkOut)}</strong>
                  </li>
                  <li>
                    <span>Guests</span>
                    <strong>
                      {form.adults} adult{form.adults === "1" ? "" : "s"},{" "}
                      {form.children} child
                      {form.children === "1" ? "" : "ren"}
                    </strong>
                  </li>
                  <li>
                    <span>Room</span>
                    <strong>{form.room}</strong>
                  </li>
                </ul>

                <p className="booking-success__note">
                  A member of our reservations team will email{" "}
                  <strong>{form.email}</strong> within 24 hours to confirm
                  availability and pricing. A room is only held once we have
                  confirmed it with you in writing.
                </p>

                <button type="button" className="btn btn--dark" onClick={resetForm}>
                  Make another enquiry
                </button>
              </div>
            ) : (
              <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="enquiry-name">Full name *</label>
                    <input
                      id="enquiry-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Amara Fernando"
                      value={form.name}
                      onChange={handleChange}
                      {...aria("name")}
                      required
                    />
                    <FieldError field="name" message={errors.name} />
                  </div>

                  <div className="field">
                    <label htmlFor="enquiry-email">Email address *</label>
                    <input
                      id="enquiry-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      {...aria("email")}
                      required
                    />
                    <FieldError field="email" message={errors.email} />
                  </div>

                  <div className="field">
                    <label htmlFor="enquiry-phone">Phone (optional)</label>
                    <input
                      id="enquiry-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+94 77 123 4567"
                      value={form.phone}
                      onChange={handleChange}
                      {...aria("phone")}
                    />
                    <FieldError field="phone" message={errors.phone} />
                  </div>

                  <div className="field">
                    <label htmlFor="enquiry-room">Room or suite *</label>
                    <select
                      id="enquiry-room"
                      name="room"
                      value={form.room}
                      onChange={handleChange}
                      {...aria("room")}
                      required
                    >
                      <option value="">Select a room or suite…</option>
                      {ROOMS.map((room) => (
                        <option key={room.id} value={room.name}>
                          {room.name} &mdash; from {formatPrice(room.price)}/night
                        </option>
                      ))}
                      <option value="Not sure yet — please advise">
                        Not sure yet &mdash; please advise
                      </option>
                    </select>
                    <FieldError field="room" message={errors.room} />
                  </div>

                  <div className="field">
                    <label htmlFor="enquiry-checkIn">Check-in *</label>
                    <input
                      id="enquiry-checkIn"
                      name="checkIn"
                      type="date"
                      min={today}
                      value={form.checkIn}
                      onChange={handleChange}
                      {...aria("checkIn")}
                      required
                    />
                    <FieldError field="checkIn" message={errors.checkIn} />
                  </div>

                  <div className="field">
                    <label htmlFor="enquiry-checkOut">Check-out *</label>
                    <input
                      id="enquiry-checkOut"
                      name="checkOut"
                      type="date"
                      min={form.checkIn || today}
                      value={form.checkOut}
                      onChange={handleChange}
                      {...aria("checkOut")}
                      required
                    />
                    <FieldError field="checkOut" message={errors.checkOut} />
                  </div>

                  <div className="field">
                    <label htmlFor="enquiry-adults">Adults</label>
                    <select
                      id="enquiry-adults"
                      name="adults"
                      value={form.adults}
                      onChange={handleChange}
                    >
                      {[1, 2, 3, 4, 5, 6].map((count) => (
                        <option key={count} value={String(count)}>
                          {count} adult{count === 1 ? "" : "s"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="enquiry-children">Children</label>
                    <select
                      id="enquiry-children"
                      name="children"
                      value={form.children}
                      onChange={handleChange}
                    >
                      {[0, 1, 2, 3, 4].map((count) => (
                        <option key={count} value={String(count)}>
                          {count} {count === 1 ? "child" : "children"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field field--full">
                    <label htmlFor="enquiry-message">
                      Anything we should know? (optional)
                    </label>
                    <textarea
                      id="enquiry-message"
                      name="message"
                      rows={4}
                      placeholder="Honeymoon, dietary needs, airport transfer, a birthday on the beach…"
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-footer">
                  <p className="form-note">
                    Submitting this form sends a booking <strong>enquiry</strong>{" "}
                    only. No payment is taken and no room is held until our team
                    confirms with you.
                  </p>
                  <button type="submit" className="btn btn--primary">
                    Send enquiry
                    <Icon name="arrow" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 10. Footer -------------------------------- */

const FOOTER_LINKS = [
  {
    title: "Resort",
    links: [
      { label: "The Resort", href: "#about" },
      { label: "Experiences", href: "#experiences" },
      { label: "Rooms & Suites", href: "#rooms" },
      { label: "Booking enquiry", href: "#booking" },
    ],
  },
  {
    title: "Experiences",
    links: [
      { label: "Reef snorkelling", href: "#experiences" },
      { label: "The spa pavilion", href: "#experiences" },
      { label: "Bayview dining", href: "#experiences" },
      { label: "Sunset sailing", href: "#experiences" },
    ],
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <a className="brand brand--light" href="#home">
            <span className="brand__mark" aria-hidden="true">
              <Icon name="waves" className="icon icon--brand" />
            </span>
            <span className="brand__text">
              <span className="brand__name">{BRAND.name}</span>
              <span className="brand__tagline">{BRAND.tagline}</span>
            </span>
          </a>
          <p>
            A tropical coastal sanctuary on Coral Bay &mdash; forty-two villas,
            one house reef and endless quiet water.
          </p>
        </div>

        {FOOTER_LINKS.map((column) => (
          <nav
            className="footer__column"
            key={column.title}
            aria-label={`${column.title} links`}
          >
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer__column">
          <h3>Contact</h3>
          <ul>
            <li>
              <a href="tel:+9604001200">+960 400 1200</a>
            </li>
            <li>
              <a href="mailto:stay@azurehaven.example">stay@azurehaven.example</a>
            </li>
            <li>Coral Bay, North Atoll</li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>&copy; {year} Azure Haven Resort. A demonstration website.</p>
        <ul className="footer__legal">
          <li>
            <a href="#about">Privacy</a>
          </li>
          <li>
            <a href="#about">Terms</a>
          </li>
          <li>
            <a href="#booking">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

/* -------------------------------- 11. App --------------------------------- */

export default function App() {
  const [prefillRoom, setPrefillRoom] = useState("");

  useRevealOnScroll();

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <Introduction />
        <Features />
        <Rooms onSelectRoom={setPrefillRoom} />
        <BookingEnquiry prefillRoom={prefillRoom} />
      </main>

      <Footer />
    </>
  );
}
