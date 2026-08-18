import { motion, useReducedMotion, type Easing } from "motion/react";
import { Container } from "../common/Container";
import { Button } from "../common/Button";
import { PlaceholderImage } from "../common/PlaceholderImage";
import { RouteLine } from "../common/RouteLine";
import { heroContent } from "../../data/company";

const EASE_GRP: Easing = [0.22, 0.61, 0.36, 1];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE_GRP },
        };

  return (
    <section className="relative overflow-hidden bg-charcoal pb-20 pt-36 sm:pb-24 sm:pt-44">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.div {...fadeUp(0)} className="flex items-center gap-3">
              <span className="h-px w-8 bg-grp-green" />
              <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-grp-green">
                Musaffah, Abu Dhabi
              </span>
            </motion.div>

            <h1 className="mt-7 font-display text-[clamp(2.5rem,6.5vw,4.75rem)] font-semibold leading-[0.98] text-off-white">
              {heroContent.headline.map((line, i) => (
                <motion.span key={line} {...fadeUp(0.1 + i * 0.1)} className="block text-balance">
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              {...fadeUp(0.32)}
              className="mt-7 max-w-lg font-body text-base leading-relaxed text-off-white/65 sm:text-lg"
            >
              {heroContent.subhead}
            </motion.p>

            <motion.div {...fadeUp(0.42)} className="mt-9 flex flex-wrap items-center gap-4">
              <Button to="/request-quote" variant="primary">
                {heroContent.primaryCta}
              </Button>
              <Button to="/services" variant="secondary" tone="onDark">
                {heroContent.secondaryCta}
              </Button>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.2)} className="lg:col-span-5">
            <PlaceholderImage
              label="Grand Route operations, Musaffah"
              aspect="aspect-[4/5]"
              tone="dark"
              className="lg:mt-4"
            />
          </motion.div>
        </div>

        <RouteLine tone="dark" className="mt-16 sm:mt-20" />
      </Container>
    </section>
  );
}
