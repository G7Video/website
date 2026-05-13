const React = window.React;
const ReactDOM = window.ReactDOM;
const { useEffect, useMemo, useState } = React;
const h = React.createElement;

const logo = "https://res.cloudinary.com/dazhbium1/image/upload/q_auto/f_auto/v1778614112/G7_1_gqxc66.png";
const director = "https://res.cloudinary.com/dazhbium1/image/upload/q_auto/f_auto/v1778614110/_HRV3060_websize_rk9561.jpg";
const headshot = "https://res.cloudinary.com/dazhbium1/image/upload/q_auto/f_auto/v1778614111/Oprion_1_hs4tdc.png";
const photo = "https://res.cloudinary.com/dazhbium1/image/upload/q_auto/f_auto/v1778614110/307629693_793297641722731_8067313833270329370_n_cpwav1.jpg";

const projects = [
  { slug: "million-dollar-mastermind", title: "Million Dollar Mastermind", client: "MDM 2023", role: "Event Recap", videoId: "wES8bsnsLpQ", outcome: "A cinematic event recap built to sell the energy in the room and fuel post-event marketing." },
  { slug: "logan-paul", title: "Logan Paul x Commodities", client: "Commodities", role: "Commercial", videoId: "ZDjMujnlCNM", outcome: "A campaign-style commercial shaped around personality, product, pacing, and immediate attention." },
  { slug: "ryan-stewman", title: "Deion Sanders Reaction", client: "Ryan Stewman", role: "Social Content", videoId: "_AigiEcgmDA", outcome: "Fast, personality-led video designed for strong hooks and modern distribution." },
  { slug: "saas-promo", title: "SaaS Promo Campaign", client: "Software Promo", role: "Brand Promo", videoId: "KMe435GXqSo", outcome: "A direct, polished promo built around clear value, speed, and conversion-friendly storytelling." }
];

const services = [
  { id: "01", title: "Commercials", desc: "High-end advertisements and launch films engineered for brands, founders, YouTube, paid social, and web campaigns.", image: thumb("ZDjMujnlCNM") },
  { id: "02", title: "Social Content", desc: "Short-form content systems built for hooks, consistency, personality, and audience growth.", image: thumb("_AigiEcgmDA") },
  { id: "03", title: "Event Recaps", desc: "Coverage for masterminds, summits, conferences, weddings, and private events that need to feel alive after the day ends.", image: thumb("wES8bsnsLpQ") },
  { id: "04", title: "Brand Promos", desc: "Premium brand stories, product promos, and campaigns shaped for credibility and momentum.", image: thumb("KMe435GXqSo") },
  { id: "05", title: "Photography", desc: "Brand, event, portrait, and campaign stills that support the video-first visual system.", image: photo }
];

const nav = [
  ["Work", "/work"],
  ["Services", "/services"],
  ["Process", "/process"],
  ["Portal", "/portal"],
  ["Start", "/contact", "nav-cta"]
];

function thumb(id) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function pathNow() {
  if (window.location.protocol === "file:" && window.location.hash.startsWith("#/")) {
    return window.location.hash.slice(1);
  }

  const path = window.location.pathname;
  const map = {
    "/index.html": "/",
    "/work.html": "/work",
    "/services.html": "/services",
    "/process.html": "/process",
    "/contact.html": "/contact",
    "/portal.html": "/portal",
    "/privacy.html": "/privacy",
    "/privacypolicy": "/privacy",
    "/get-in-touch": "/contact",
    "/my-work": "/work"
  };
  return map[path] || path;
}

function navigate(to) {
  if (window.location.protocol === "file:") {
    window.history.pushState({}, "", `#${to}`);
  } else {
    window.history.pushState({}, "", to);
  }
  window.dispatchEvent(new Event("routechange"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Link({ href, className, children, label, ...rest }) {
  return h("a", {
    href,
    className,
    "aria-label": label,
    ...rest,
    onClick(event) {
      if (href.startsWith("/") && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        navigate(href);
      }
    }
  }, children);
}

function Logo({ className }) {
  return h("img", { className, src: logo, alt: "G7 Creative" });
}

function Cursor() {
  const [state, setState] = useState({ x: -100, y: -100, active: false, text: "VIEW" });

  useEffect(() => {
    const move = (event) => setState((current) => ({ ...current, x: event.clientX, y: event.clientY }));
    const over = (event) => {
      const target = event.target.closest("[data-cursor]");
      if (target) setState((current) => ({ ...current, active: true, text: target.dataset.cursor || "VIEW" }));
    };
    const out = (event) => {
      if (event.target.closest("[data-cursor]")) setState((current) => ({ ...current, active: false }));
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return h("div", {
    className: cx("site-cursor", state.active && "active"),
    style: { transform: `translate(${state.x - (state.active ? 41 : 7)}px, ${state.y - (state.active ? 41 : 7)}px)` }
  }, h("span", null, state.text));
}

function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setDone(true), 1750);
    return () => window.clearTimeout(id);
  }, []);
  return h("div", { className: cx("loader", done && "done") },
    h("div", { className: "loader-inner" },
      h(Logo, null),
      h("div", { className: "loader-line" })
    )
  );
}

function Header({ route, audioOn, setAudioOn }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return h("header", { className: cx("site-header", (scrolled || route !== "/") && "solid") },
    h(Link, { href: "/", className: "brand", label: "G7 Creative home", "data-cursor": "HOME" }, h(Logo, null)),
    h("nav", { className: cx("site-nav", open && "open") },
      nav.map(([name, href, extra]) => h(Link, {
        key: href,
        href,
        className: cx(extra, route === href && "active"),
        children: name
      }))
    ),
    h("div", { className: "header-right" },
      h("button", {
        className: "sound-toggle",
        type: "button",
        "aria-label": audioOn ? "Mute showreel" : "Turn showreel sound on",
        "data-cursor": "TOGGLE",
        onClick: () => setAudioOn(!audioOn)
      },
        h("span", null, `Sound: ${audioOn ? "ON" : "OFF"}`),
        h("i", { className: cx(audioOn && "live") }),
        h("i", { className: cx(audioOn && "live") }),
        h("i", { className: cx(audioOn && "live") })
      ),
      h("button", { className: "menu-toggle", type: "button", "aria-label": "Toggle menu", onClick: () => setOpen(!open) },
        h("span"), h("span"), h("span")
      )
    )
  );
}

function Hero({ audioOn, setAudioOn }) {
  const iframeRef = React.useRef(null);

  useEffect(() => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(JSON.stringify({
      event: "command",
      func: audioOn ? "unMute" : "mute",
      args: []
    }), "*");
  }, [audioOn]);

  return h("section", { className: "hero" },
    h("div", { className: "hero-media" },
      h("iframe", {
        ref: iframeRef,
        title: "G7 Creative reel",
        src: "https://www.youtube.com/embed/ZDjMujnlCNM?autoplay=1&mute=1&loop=1&playlist=ZDjMujnlCNM&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1",
        allow: "autoplay; fullscreen"
      })
    ),
    h("button", {
      className: "hero-scrim",
      type: "button",
      "aria-label": audioOn ? "Mute showreel" : "Turn showreel sound on",
      "data-cursor": audioOn ? "MUTE" : "SOUND",
      onClick: () => setAudioOn(!audioOn)
    }),
    h("div", { className: "hero-content" },
      h("h1", null, "Rocket Fueled", h("em", null, "Filmmaking"))
    ),
    h("div", { className: "hero-footer" },
      h("span", null, "Commercial film"),
      h("span", null, "Event recaps"),
      h("span", null, "Social content"),
      h("span", null, "Photography")
    )
  );
}

function Manifesto() {
  return h("section", { className: "section manifesto" },
    h("div", { className: "manifesto-kicker" },
      h("p", { className: "eyebrow" }, "Our Manifesto"),
      h(Link, { href: "/contact", className: "button secondary", children: "Book an Experience" })
    ),
    h("p", { className: "manifesto-text" }, "At G7 Creative, video production and professional photography are not just about making content. It's about ", h("em", null, "rocket fueled creativity"), " that turns heads and produces results.")
  );
}

function SectionHead({ eyebrow, title, copy, action }) {
  return h("div", { className: "section-head" },
    h("div", null, h("p", { className: "eyebrow" }, eyebrow), h("h2", null, title), copy && h("p", null, copy)),
    action
  );
}

function ProjectRows({ compact = false }) {
  return h("div", { className: "project-list" },
    projects.map((project) => h(Link, {
      key: project.slug,
      href: compact ? `/work#${project.slug}` : "/contact",
      className: "project-row",
      style: { "--project-image": `url(${thumb(project.videoId)})` },
      "data-cursor": "WATCH"
    },
      h("h3", null, project.title),
      h("div", { className: "project-meta" }, h("span", null, project.client), h("span", null, project.role))
    ))
  );
}

function Showcase({ page = false }) {
  const [active, setActive] = useState(0);
  return h("section", { className: cx("showcase", page && "showcase-page") },
    h("div", { className: "showcase-bg" },
      projects.map((project, index) => h("img", {
        key: project.slug,
        className: cx(index === active && "active"),
        src: thumb(project.videoId),
        alt: ""
      }))
    ),
    h("div", { className: "showcase-inner" },
      h(SectionHead, {
        eyebrow: "Selected archives",
        title: page ? "Motion with proof behind it." : "Selected Archives",
        copy: page ? "Campaigns, event films, social assets, and promos built to carry a brand past the shoot day." : null,
        action: h(Link, { href: page ? "/contact" : "/work", className: "button secondary", children: page ? "Plan something like this" : "Explore the archive" })
      }),
      h("div", { className: "archive-list" },
        projects.map((project, index) => h(Link, {
          key: project.slug,
          href: page ? `/contact?project=${project.slug}` : "/work",
          className: cx("archive-row", index === active && "active"),
          "data-cursor": "WATCH",
          onMouseEnter: () => setActive(index),
          onFocus: () => setActive(index)
        },
          h("h3", null, project.title),
          h("div", { className: "archive-meta" },
            h("span", null, project.client),
            h("span", null, project.role)
          )
        ))
      )
    )
  );
}

function ServicesRail({ elevated = false }) {
  return h("div", { className: cx("service-rail", elevated && "elevated") },
    services.map((service) => h("div", { key: service.id, className: "service-item" },
      h("span", null, service.id),
      h("strong", null, service.title),
      h("p", null, service.desc)
    ))
  );
}

function Expertise() {
  const [active, setActive] = useState(0);
  const service = services[active];

  return h("section", { className: "expertise" },
    h("div", { className: "expertise-inner" },
      h("div", { className: "expertise-head" },
        h("div", null,
          h("p", { className: "eyebrow" }, "Core Capabilities"),
          h("h2", null, "Our Expertise")
        ),
        h(Link, { href: "/services", className: "button dark", children: "Request Services" })
      ),
      h("div", { className: "expertise-grid" },
        h("div", { className: "expertise-media" },
          services.map((item, index) => h("img", {
            key: item.id,
            className: cx(index === active && "active"),
            src: item.image,
            alt: item.title
          })),
          h("div", { className: "media-caption" },
            h("span", null, service.id),
            h("strong", null, service.title)
          )
        ),
        h("div", { className: "expertise-list" },
          services.map((item, index) => h("button", {
            key: item.id,
            className: cx("expertise-row", index === active && "active"),
            type: "button",
            onMouseEnter: () => setActive(index),
            onFocus: () => setActive(index)
          },
            h("span", null, item.id),
            h("strong", null, item.title),
            h("p", null, item.desc)
          ))
        )
      )
    )
  );
}

function DirectorSection() {
  return h("section", { className: "section split" },
    h("div", { className: "media-stack" }, h("img", { className: "main", src: director, alt: "Hector Gonzalez directing" }), h("img", { className: "float", src: headshot, alt: "Hector Gonzalez portrait" })),
    h("div", { className: "split-copy" },
      h("p", { className: "eyebrow" }, "The Director"),
      h("h2", null, "Hector Gonzalez"),
      h("p", null, "Founder and CEO of G7 Creative. With over seven years in commercial film and photography, Hector has directed, filmed, photographed, and edited work connected to Logan Paul, Alex Rodriguez, Ryan Stewman, and high-performance business events."),
      h("p", null, "The work blends cinematic taste with practical strategy, giving clients assets that feel premium and keep working after delivery."),
      h("div", { className: "stat-grid" },
        h("div", { className: "stat" }, h("strong", null, "7+"), h("span", null, "Years in production")),
        h("div", { className: "stat" }, h("strong", null, "500k+"), h("span", null, "Views generated"))
      )
    )
  );
}

function FinalCTA() {
  return h("section", { className: "final-cta" },
    h("p", { className: "eyebrow" }, "Your legacy awaits"),
    h("h2", null, "Let's build the content your brand keeps ", h("em", null, "using.")),
    h("div", { className: "button-row" }, h(Link, { href: "/contact", className: "button primary", children: "Start a Project" }))
  );
}

function Footer() {
  return h("footer", { className: "site-footer" },
    h("div", null, h(Logo, null), h("p", null, "Video-first production, photography, and client experience systems.")),
    h("nav", null, ["Work", "Services", "Process", "Portal", "Contact", "Privacy"].map((label) => h(Link, { key: label, href: `/${label.toLowerCase()}`, children: label })))
  );
}

function Home({ audioOn, setAudioOn }) {
  return h(React.Fragment, null,
    h(Hero, { audioOn, setAudioOn }),
    h(Manifesto),
    h(Showcase),
    h(Expertise),
    h(DirectorSection),
    h(TestimonialSection),
    h(FinalCTA)
  );
}

function TestimonialSection() {
  const reviews = [
    ["Collin and Mollie", "Our wedding video was excellent. Hector was very attentive and captured every little thing about our day perfectly."],
    ["Kade and Mercedes", "10/10 experience. His attention to detail and making sure we had everything we wanted is something you do not see very often."]
  ];
  return h("section", { className: "section" },
    h(SectionHead, { eyebrow: "Don't take our word for it", title: "What clients are saying." }),
    h("div", { className: "card-grid" }, reviews.map(([name, quote]) => h("article", { className: "card", key: name }, h("p", null, quote), h("h3", null, name))))
  );
}

function PageHero({ eyebrow, title, copy, image }) {
  return h("section", { className: "page-hero", style: { "--page-image": `url(${image})` } },
    h("div", { className: "page-hero-inner" },
      h("p", { className: "eyebrow" }, eyebrow),
      h("h1", null, title),
      h("p", null, copy)
    )
  );
}

function Work() {
  return h(React.Fragment, null,
    h(PageHero, { eyebrow: "Selected archive", title: "Work that sells the room, the story, and the result.", copy: "A cinematic archive built around outcomes, not just pretty frames.", image: thumb("ZDjMujnlCNM") }),
    h(Showcase, { page: true }),
    h("section", { className: "section project-list case-stack" },
      projects.map((project) => h("article", { className: "case-study", id: project.slug, key: project.slug },
        h("div", { className: "video-frame" }, h("iframe", { title: project.title, src: `https://www.youtube.com/embed/${project.videoId}?rel=0&modestbranding=1`, allowFullScreen: true })),
        h("div", null, h("p", { className: "eyebrow" }, project.role), h("h2", null, project.title), h("p", null, project.outcome), h(Link, { href: "/contact", className: "button secondary", children: "Plan something like this" }))
      ))
    ),
    h(FinalCTA)
  );
}

function Services() {
  const packages = [
    ["Launch Film", "One flagship campaign asset with strategy, production, edit, color, sound, and cutdowns."],
    ["Event Engine", "Coverage, recap, speaker clips, testimonials, photography, and post-event follow-up assets."],
    ["Content Partner", "A repeatable monthly capture and editing system for founders and brands with ongoing output."]
  ];
  return h(React.Fragment, null,
    h(PageHero, { eyebrow: "Capabilities", title: "Production systems that scale from one shoot to a full content engine.", copy: "Video remains the center. Photography, cutdowns, process, and delivery support the full client journey.", image: thumb("wES8bsnsLpQ") }),
    h(Expertise),
    h("section", { className: "section" }, h(SectionHead, { eyebrow: "Ways to work", title: "Simple starting points." }), h("div", { className: "card-grid premium-grid" }, packages.map(([title, copy]) => h("article", { className: "card package-card", key: title }, h("p", { className: "eyebrow" }, "Package"), h("h3", null, title), h("p", null, copy), h(Link, { href: "/contact", className: "button secondary", children: "Start here" }))))),
    h(FinalCTA)
  );
}

function Process() {
  const steps = [
    ["01", "Inquiry", "The inquiry creates a clean lead record and starts the right follow-up path."],
    ["02", "Discovery", "We clarify the goal, audience, creative direction, timeline, budget, and deliverables."],
    ["03", "Proposal", "The client receives a scope, contract, deposit request, and portal invite."],
    ["04", "Production", "Shot lists, schedule, files, notes, and approvals stay organized."],
    ["05", "Delivery", "Final videos, photos, invoices, usage notes, and next-step follow-ups are delivered with polish."]
  ];
  return h(React.Fragment, null,
    h(PageHero, { eyebrow: "Client journey", title: "Every step should feel handled before the client has to ask.", copy: "The public experience sells trust. The backend will turn that trust into a smooth operating system.", image: director }),
    h("section", { className: "section timeline" }, steps.map(([id, title, copy]) => h("div", { className: "timeline-row", key: id }, h("span", null, id), h("h2", null, title), h("p", null, copy)))),
    h(FinalCTA)
  );
}

function Contact() {
  const [status, setStatus] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    setStatus("Sending project details...");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Request failed");
      event.currentTarget.reset();
      setStatus("Project details received. We will follow up with next steps.");
    } catch {
      setStatus("Preview captured. The live email and CRM handoff will connect in the backend phase.");
    }
  };
  return h(React.Fragment, null,
    h(PageHero, { eyebrow: "Start a project", title: "Tell us what you are building. We will shape the production around the outcome.", copy: "A tighter intake experience for serious projects, events, campaigns, and content systems.", image: thumb("ZDjMujnlCNM") }),
    h("section", { className: "section contact-layout" },
      h("form", { className: "form-panel form-grid", onSubmit: submit },
        field("Name", "name", "text", true),
        field("Email", "email", "email", true),
        field("Company or project", "company", "text"),
        selectField("Project type", "service", ["Commercial or brand film", "Event recap", "Social content system", "Photography", "Wedding or personal event", "Not sure yet"], true),
        selectField("Estimated budget", "budget", ["Need guidance", "Under $2,500", "$2,500 - $5,000", "$5,000 - $10,000", "$10,000+"]),
        field("Ideal shoot date", "date", "text"),
        h("div", { className: "field full" }, h("label", { htmlFor: "message" }, "Project notes"), h("textarea", { id: "message", name: "message", rows: 7, required: true })),
        h("button", { className: "button primary", type: "submit" }, "Send Project Details"),
        h("p", { className: "form-status", role: "status" }, status)
      ),
      h("aside", { className: "contact-copy" }, h("p", { className: "eyebrow" }, "What happens next"), h("h2", null, "Clean next steps, not chaos."), h("div", { className: "step-list" }, ["Confirmation", "Discovery", "Proposal", "Production plan"].map((step) => h("div", { key: step }, h("strong", null, step), h("span", null, stepCopy(step))))))
    )
  );
}

function field(label, name, type, required = false) {
  return h("div", { className: "field" }, h("label", { htmlFor: name }, label), h("input", { id: name, name, type, required }));
}

function selectField(label, name, options, required = false) {
  return h("div", { className: "field" }, h("label", { htmlFor: name }, label), h("select", { id: name, name, required }, h("option", { value: "" }, "Choose one"), options.map((option) => h("option", { key: option }, option))));
}

function stepCopy(step) {
  return {
    Confirmation: "The inquiry is received and the project enters the lead pipeline.",
    Discovery: "We clarify the outcome, schedule, creative scope, and deliverables.",
    Proposal: "Scope, contract, deposit, timeline, and portal access are prepared.",
    "Production plan": "Shot lists, dates, notes, assets, and delivery milestones get organized."
  }[step];
}

function Portal() {
  const files = [
    ["Hero Film", "Final master and web export", thumb("ZDjMujnlCNM")],
    ["Social Cutdowns", "6 vertical edits ready for posting", thumb("_AigiEcgmDA")],
    ["Photo Selects", "Edited gallery preview", photo]
  ];
  return h(React.Fragment, null,
    h(PageHero, { eyebrow: "Client portal", title: "A private project room for payments, approvals, videos, photos, and delivery.", copy: "The client experience should feel as premium as the production itself.", image: thumb("KMe435GXqSo") }),
    h("section", { className: "section portal-preview" },
      h("div", { className: "portal-panel" },
        h("div", { className: "portal-top" }, h("div", null, h("p", { className: "eyebrow" }, "Project room"), h("h2", null, "Brand Launch Film")), h("span", { className: "status-pill" }, "In production")),
        h("div", { className: "portal-grid" }, [["Timeline", "Shoot scheduled"], ["Payment", "Deposit paid"], ["Delivery", "8 assets planned"]].map(([label, value]) => h("div", { className: "portal-card", key: label }, h("span", null, label), h("strong", null, value))))
      ),
      h("div", { className: "vault-panel" },
        h("p", { className: "eyebrow" }, "Delivery vault"),
        files.map(([title, copy, image]) => h("div", { className: "vault-item", key: title }, h("div", { className: "vault-thumb" }, h("img", { src: image, alt: "" })), h("div", null, h("strong", null, title), h("span", null, copy)), h("span", { className: "chip" }, "Preview")))
      )
    ),
    h(FinalCTA)
  );
}

function Privacy() {
  return h(React.Fragment, null,
    h(PageHero, { eyebrow: "Privacy", title: "Privacy, handled clearly.", copy: "This page will be finalized with the exact providers used for payments, contracts, email, analytics, and delivery.", image: photo }),
    h("section", { className: "section" }, h("div", { className: "card-grid" },
      ["Information collected", "How information is used", "Third-party services"].map((title) => h("article", { className: "card", key: title }, h("h3", null, title), h("p", null, privacyCopy(title))))
    ))
  );
}

function privacyCopy(title) {
  return {
    "Information collected": "G7 Creative may collect information submitted through inquiries, project planning, contracts, payments, scheduling, and portal activity.",
    "How information is used": "Information is used to respond to inquiries, plan projects, deliver services, process payments, support clients, and improve the experience.",
    "Third-party services": "The final policy will list the exact providers used for hosting, payments, email, analytics, contracts, storage, and automation."
  }[title];
}

function App() {
  const [route, setRoute] = useState(pathNow());
  const [audioOn, setAudioOn] = useState(false);
  useEffect(() => {
    const onRoute = () => setRoute(pathNow());
    window.addEventListener("popstate", onRoute);
    window.addEventListener("routechange", onRoute);
    return () => {
      window.removeEventListener("popstate", onRoute);
      window.removeEventListener("routechange", onRoute);
    };
  }, []);

  const Page = useMemo(() => ({
    "/": Home,
    "/work": Work,
    "/services": Services,
    "/process": Process,
    "/contact": Contact,
    "/portal": Portal,
    "/privacy": Privacy
  }[route] || Home), [route]);

  return h("div", { className: "app" },
    h("div", { className: "film-grain" }),
    h(Cursor),
    h(Loader),
    h(Header, { route, audioOn, setAudioOn }),
    h("main", null, h(Page, { audioOn, setAudioOn })),
    h(Footer)
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));
