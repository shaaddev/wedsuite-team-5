import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center px-6 py-20 lg:px-12 lg:py-28">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground/50">
              Curated Wedding Vendors
            </p>
            <h1 className="mt-6 font-serif text-4xl font-light leading-tight text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
              Exquisite taste
              <br />
              meets effortless
              <br />
              <span className="italic">planning</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-primary-foreground/70">
              Discover a handpicked collection of exceptional vendors who share your vision for a celebration beyond the ordinary.
            </p>
            <div className="mt-10 flex items-center gap-6">
              <Button
                size="lg"
                className="rounded-full bg-primary-foreground px-8 text-xs uppercase tracking-widest font-medium text-foreground hover:bg-primary-foreground/90"
                asChild
              >
                <Link href="#vendors">
                  Explore Vendors
                </Link>
              </Button>
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 text-sm font-medium text-primary-foreground/70 transition-colors hover:text-primary-foreground"
              >
                Start planning
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative hidden aspect-auto min-h-[500px] lg:block">
            <Image
              src="/images/hero-wedding.jpg"
              alt="Beautiful wedding setting"
              fill
              className="object-cover"
              priority
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-foreground/10" />
          </div>
        </div>
      </div>

      {/* Mobile image - below text */}
      <div className="relative aspect-[16/10] lg:hidden">
        <Image
          src="/images/hero-wedding.jpg"
          alt="Beautiful wedding setting"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/10" />
      </div>
    </section>
  )
}
