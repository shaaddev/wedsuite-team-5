"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, MapPin, Star, Mail, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Vendor } from "@/lib/data"

interface VendorProfileContentProps {
  vendor: Vendor
}

export function VendorProfileContent({ vendor }: VendorProfileContentProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        <span className="uppercase tracking-wide text-xs font-medium">Back to vendors</span>
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Hero Image */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
            <Image
              src={vendor.image}
              alt={`${vendor.name} portfolio`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            {vendor.featured && (
              <div className="absolute top-5 left-5">
                <span className="rounded-full bg-primary px-4 py-1.5 text-[10px] font-medium uppercase tracking-widest text-primary-foreground">
                  Featured Vendor
                </span>
              </div>
            )}
          </div>

          {/* Vendor Info */}
          <div className="mt-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {vendor.category}
                </span>
                <h1 className="mt-2 font-serif text-3xl font-light text-foreground lg:text-5xl">
                  {vendor.name}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-1.5">
                    <Star className="size-4 fill-foreground text-foreground" />
                    <span className="text-sm font-semibold text-foreground">{vendor.rating}</span>
                    <span className="text-sm text-muted-foreground">({vendor.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" />
                    <span>{vendor.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Starting from</p>
                <p className="mt-1 text-xl font-semibold text-foreground">{vendor.priceRange}</p>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Description */}
            <div>
              <h2 className="font-serif text-2xl font-light text-foreground">About</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {vendor.longDescription}
              </p>
            </div>

            <Separator className="my-8" />

            {/* Services */}
            <div>
              <h2 className="font-serif text-2xl font-light text-foreground">Services Offered</h2>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {vendor.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 transition-colors hover:bg-accent/50"
                  >
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="size-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Gallery */}
            {vendor.portfolio.length > 1 && (
              <>
                <Separator className="my-8" />
                <div>
                  <h2 className="font-serif text-2xl font-light text-foreground">Portfolio</h2>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {vendor.portfolio.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted"
                      >
                        <Image
                          src={image}
                          alt={`${vendor.name} portfolio image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 flex flex-col gap-6">
            {/* Booking Card */}
            <Card className="rounded-2xl border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-xl font-light">Interested in booking?</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Reach out to {vendor.name} to discuss availability, pricing, and your vision.
                </p>
                <Button className="w-full rounded-full text-xs uppercase tracking-widest font-medium">
                  <Mail className="mr-2 size-4" />
                  Send Inquiry
                </Button>
                <Button variant="outline" className="w-full rounded-full text-xs uppercase tracking-widest font-medium">
                  <Phone className="mr-2 size-4" />
                  Request a Call
                </Button>
              </CardContent>
            </Card>

            {/* Quick Details */}
            <Card className="rounded-2xl border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-xl font-light">Quick Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="flex flex-col gap-5">
                  <div>
                    <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Category</dt>
                    <dd className="mt-1 text-sm font-medium text-foreground">{vendor.category}</dd>
                  </div>
                  <Separator />
                  <div>
                    <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Location</dt>
                    <dd className="mt-1 text-sm font-medium text-foreground">{vendor.location}</dd>
                  </div>
                  <Separator />
                  <div>
                    <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Price Range</dt>
                    <dd className="mt-1 text-sm font-medium text-foreground">{vendor.priceRange}</dd>
                  </div>
                  <Separator />
                  <div>
                    <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Rating</dt>
                    <dd className="mt-1 flex items-center gap-1.5">
                      <Star className="size-4 fill-foreground text-foreground" />
                      <span className="text-sm font-medium text-foreground">{vendor.rating}</span>
                      <span className="text-xs text-muted-foreground">/ 5.0</span>
                    </dd>
                  </div>
                  <Separator />
                  <div>
                    <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Reviews</dt>
                    <dd className="mt-1 text-sm font-medium text-foreground">{vendor.reviewCount} verified reviews</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
