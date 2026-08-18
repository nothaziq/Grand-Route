import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "../common/Container";
import { Button } from "../common/Button";
import { cn } from "../../lib/cn";
import logo from "../../assets/logo.png";

const NAV_LINKS = [
  { label: "Services", to: "/services" },
  { label: "Fleet & Equipment", to: "/fleet" },
  { label: "Industries", to: "/industries" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-grp-green focus:px-4 focus:py-2 focus:text-off-white"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300 sm:top-9",
          scrolled || isOpen ? "bg-charcoal/95 backdrop-blur-sm" : "bg-transparent",
        )}
      >
        <Container className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Grand Route — home">
            <img src={logo} alt="Grand Route" className="h-9 w-auto" />
            <span className="hidden font-display text-sm font-semibold uppercase tracking-[0.14em] text-off-white sm:inline">
              Grand Route
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const isActive =
                location.pathname === link.to || location.pathname.startsWith(`${link.to}/`);
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "relative py-1 font-body text-[13px] font-semibold uppercase tracking-[0.06em] text-off-white/75 transition-colors hover:text-off-white",
                    isActive && "text-grp-green hover:text-grp-green",
                  )}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute inset-x-0 -bottom-1.5 h-[2px] bg-grp-green"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                </NavLink>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button to="/request-quote" variant="primary" className="text-[12px]">
              Request a Quote
            </Button>
          </div>

          <button
            type="button"
            className="flex size-10 items-center justify-center text-off-white lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-charcoal lg:hidden"
          >
            <nav
              className="flex h-full flex-col justify-between px-6 pb-10 pt-28"
              aria-label="Mobile"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                    className="border-b border-hairline-dark"
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        cn(
                          "relative block py-4 pl-4 font-display text-2xl font-semibold text-off-white/90 transition-colors",
                          isActive && "text-grp-green",
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive ? (
                            <motion.span
                              layoutId="nav-active-bar-mobile"
                              className="absolute inset-y-2 left-0 w-[3px] bg-grp-green"
                              transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            />
                          ) : null}
                          {link.label}
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <Button to="/request-quote" variant="primary" className="w-full justify-center">
                Request a Quote
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
