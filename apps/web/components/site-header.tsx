"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Vendors" },
  { href: "/dashboard", label: "Planning" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-1.5 group">
          <span className="font-serif text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            Wed
          </span>
          <span className="font-serif text-2xl font-light italic tracking-tight text-primary">
            Suite
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-sm font-medium tracking-wide uppercase transition-colors hover:text-foreground",
                pathname === link.href
                  ? "text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Button
            size="sm"
            className="rounded-full px-6 text-xs uppercase tracking-widest font-medium"
            asChild
          >
            <Link href="/dashboard">My Wedding</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border/60 bg-background px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-medium tracking-wide uppercase transition-colors",
                  pathname === link.href
                    ? "bg-primary/8 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border/60">
              <Button className="w-full rounded-full text-xs uppercase tracking-widest font-medium" asChild>
                <Link href="/dashboard">My Wedding</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
