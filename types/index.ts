export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startYear: number
  endYear: number | null
  current: boolean
  description: string | null
  gpa: string | null
  logoUrl: string | null
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: number
  credentialUrl: string | null
  logoUrl: string | null
}

export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string
  achievements: string[]
  techStack: string[]
  logoUrl: string | null
}

export interface Project {
  id: string
  name: string
  description: string
  longDescription: string | null
  techStack: string[]
  githubUrl: string | null
  liveUrl: string | null
  imageUrl: string | null
  featured: boolean
  tags: string[]
  order: number
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
}

export interface NavItem {
  label: string
  href: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}
