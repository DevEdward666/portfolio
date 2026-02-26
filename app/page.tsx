import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import BackgroundSection from '@/components/sections/BackgroundSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

async function getData() {
  const [user, education, certifications, experiences, projects] = await Promise.all([
    prisma.user.findFirst(),
    prisma.education.findMany({ orderBy: { order: 'asc' } }),
    prisma.certification.findMany({ orderBy: { order: 'asc' } }),
    prisma.experience.findMany({ orderBy: { order: 'asc' } }),
    prisma.project.findMany({ orderBy: { order: 'asc' } }),
  ])

  return { user, education, certifications, experiences, projects }
}

export default async function HomePage() {
  const { user, education, certifications, experiences, projects } = await getData()

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection user={user} experiences={experiences} projects={projects} />
      <BackgroundSection education={education} certifications={certifications} />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <ContactSection />
      <Footer user={user} />
    </main>
  )
}
