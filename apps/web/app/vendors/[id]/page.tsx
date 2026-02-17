import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { VendorProfileContent } from "@/components/vendor-profile-content"
import { vendors } from "@/lib/data"
import type { Metadata } from "next"

interface VendorPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return vendors.map((vendor) => ({
    id: vendor.id,
  }))
}

export async function generateMetadata({ params }: VendorPageProps): Promise<Metadata> {
  const { id } = await params
  const vendor = vendors.find((v) => v.id === id)

  if (!vendor) {
    return { title: "Vendor Not Found | WedSuite" }
  }

  return {
    title: `${vendor.name} - ${vendor.category} | WedSuite`,
    description: vendor.description,
  }
}

export default async function VendorPage({ params }: VendorPageProps) {
  const { id } = await params
  const vendor = vendors.find((v) => v.id === id)

  if (!vendor) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <VendorProfileContent vendor={vendor} />
      </main>
      <SiteFooter />
    </div>
  )
}
