// Updated with Edward Joseph Fernandez's LinkedIn data
// Profile: https://www.linkedin.com/in/dev-edward/
// 🔁 markers = fields to manually fill with your private details

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.contactMessage.deleteMany()
  await prisma.project.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.certification.deleteMany()
  await prisma.education.deleteMany()
  await prisma.user.deleteMany()

  // User
  await prisma.user.create({
    data: {
      name: 'Edward Joseph Fernandez',
      title: 'Mid Software Developer',
      bio: "I am a highly skilled full-stack developer with expertise in React, Angular, .NET Core, and MySQL. With a passion for building innovative and robust web applications, I am dedicated to delivering high-quality solutions that meet clients' needs and exceed their expectations. I am a problem-solver at heart — whether designing scalable architectures, optimizing code for performance, or integrating third-party APIs.",
      email: 'edwardjosephfernandez@gmail.com',         // 🔁 Replace with your real email
      location: 'Philippines',
      githubUrl: 'https://github.com/DevEdward666',     // 🔁 Replace with your GitHub URL
      linkedinUrl: 'https://www.linkedin.com/in/dev-edward/',
      twitterUrl: null,
    },
  })

  // Education — 🔁 Update with your actual university, degree, and years
  await prisma.education.createMany({
    data: [
      {
        institution: 'University of Mindanao - Davao City',
        degree: 'Bachelor of Science',
        field: 'Information Technology',
        startYear: 2015,
        endYear: 2019,
        current: false,
        description: 'Focused on software engineering, mobile and web development, and database management systems.',
        gpa: null,
        order: 0,
      },
      {
        institution: 'AMA Computer Learning Center - Davao City',
        degree: 'Software Development Program',
        field: 'Software Development',
        startYear: 2012,
        endYear: 2014,
        current: false,
        description: 'Focused on software development, desktop development, and database management systems.',
        gpa: null,
        order: 0,
      },  
    ],
  })

  // Certifications — 🔁 Add any real certifications you hold, or leave empty
  await prisma.certification.createMany({
    data: [],
  })

  // Experience
  await prisma.experience.createMany({
    data: [
       {
        company: 'Silicate PTY LTD',
        role: 'Mid Software Developer',
        startDate: new Date('2024-08-16'), 
        endDate: new Date('2025-08-29'),
        current: false,
        description:
          'Silicate PTY LTD is a dynamic software development company that specializes in creating innovative and customized solutions for clients across various industries. As a Mid Software Developer at Silicate PTY LTD, I have been responsible for designing, developing, and maintaining web applications using a range of technologies including Angular, .NET EF Core, and PostgreSQL. I have collaborated closely with cross-functional teams to gather requirements, implement features, and ensure the delivery of high-quality software products that meet client needs and exceed expectations.',
        achievements: [
          'Developed user-friendly and responsive interfaces using React, Angular and Ionic, enhancing user experience and engagement',
          'Built scalable and efficient back-end systems with .NET EF Core, ensuring optimal performance and security',
          'Designed and integrated third-party REST APIs to extend platform capabilities',
          "Collaborated with cross-functional teams to gather requirements, implement features, and deliver high-quality software products that meet client needs and exceed expectations",
        ],
        techStack: ['Angular', '.NET EF Core', 'PostgreSQL', 'TypeScript', 'REST API'],
        order: 3,
      },
        {
        company: 'Netzon Technologies',
        role: 'Mid Software Developer',
        startDate: new Date('2024-06-17'), 
        endDate: new Date('2024-08-16'),
        current: false,
        description:
          'Netzon Technologies is a dynamic software development company that specializes in creating innovative and customized solutions for clients across various industries. As a Mid Software Developer at Netzon Technologies, I have been responsible for designing, developing, and maintaining web applications using a range of technologies including Angular, React, Ionic, .NET Core, and PostgreSQL. I have collaborated closely with cross-functional teams to gather requirements, implement features, and ensure the delivery of high-quality software products that meet client needs and exceed expectations.',
        achievements: [
          'Developed user-friendly and responsive interfaces using React, Angular and Ionic, enhancing user experience and engagement',
          'Built scalable and efficient back-end systems with .NET Core, ensuring optimal performance and security',
          'Designed and integrated third-party REST APIs to extend platform capabilities',
          "Collaborated with cross-functional teams to gather requirements, implement features, and deliver high-quality software products that meet client needs and exceed expectations",
        ],
        techStack: ['React', 'Angular', 'Ionic', '.NET Core', 'PostgreSQL', 'TypeScript', 'REST API'],
        order: 2,
      },
       {
        company: 'Netzon Technologies',
        role: 'Junior Software Developer',
        startDate: new Date('2022-03-21'), 
        endDate: new Date('2024-06-17'),
        current: false,
        description:
          'Netzon Technologies is a dynamic software development company that specializes in creating innovative and customized solutions for clients across various industries. As a Junior Software Developer at Netzon Technologies, I have been responsible for designing, developing, and maintaining web applications using a range of technologies including Angular, React, Ionic, .NET Core, and PostgreSQL. I have collaborated closely with cross-functional teams to gather requirements, implement features, and ensure the delivery of high-quality software products that meet client needs and exceed expectations.',
        achievements: [
          'Developed user-friendly and responsive interfaces using React, Angular and Ionic, enhancing user experience and engagement',
          'Built scalable and efficient back-end systems with .NET Core, ensuring optimal performance and security',
          'Designed and integrated third-party REST APIs to extend platform capabilities',
          "Collaborated with cross-functional teams to gather requirements, implement features, and deliver high-quality software products that meet client needs and exceed expectations",
        ],
        techStack: ['React', 'Angular', 'Ionic', '.NET Core', 'PostgreSQL', 'TypeScript', 'REST API'],
        order: 1,
      },
      {
        company: 'TUO IT Solutions',
        role: 'Software Developer',
        startDate: new Date('2018-12-17'), // 🔁 Update to your real start date
        endDate: new Date('2022-03-16'),
        current: false,
        description:
          'TUO IT Solutions is a leading software development company specializing in delivering innovative and customized solutions to clients across various industries. As a Software Developer at TUO IT Solutions, I have been responsible for designing, developing, and maintaining web applications using a range of technologies including React, Java, .NET Core, and MySQL. I have collaborated closely with cross-functional teams to gather requirements, implement features, and ensure the delivery of high-quality software products that meet client needs and exceed expectations.',
        achievements: [
          'Developed user-friendly and responsive interfaces using React and Java, enhancing user experience and engagement',
          'Built scalable and efficient back-end systems with .NET Core, ensuring optimal performance and security',
          'Designed and integrated third-party REST APIs to extend platform capabilities',
        ],
        techStack: ['React', 'Java', '.NET Core', 'MySQL', 'JavaScript', 'REST API'],
        order: 0,
      },
    ],
  })

  // Projects
  await prisma.project.createMany({
    data: [
      {
        name: 'Hardware Supply E-Commerce App',
        description:
          'A fully functional mobile first e-commerce application built for hardware supply businesses, featuring cart, checkout, returns, Bluetooth receipt printing, and full transaction lifecycle management.',
        longDescription:
          'Developed using Ionic React, .NET Core, and PostgreSQL, this app handles the complete retail workflow for hardware supply stores. Key features include Add to Cart & Checkout (cash payments), Return/Refund workflows, Bluetooth receipt printer integration via mobile, and comprehensive Transaction Management that tracks every sale from initiation to completion. Designed for real-world business reliability.',
        techStack: ['Ionic React', '.NET Core', 'PostgreSQL', 'TypeScript', 'Bluetooth API'],
        githubUrl: null,  // 🔁 Add if repo is public
        liveUrl: "https://restie-hardware-dev.vercel.app/home/main",    // 🔁 Add if deployed
        featured: true,
        tags: ['E-Commerce', 'Mobile', 'POS', 'Full Stack'],
        order: 0,
      },
      {
        name: 'Sunny Side up Work + Study',
        description:
          'A fully functional web application built for a study hub business, featuring booking management, user roles, Rate Management, printing of receipt with QR code, Dashboard for viewing table availability and booking status, Sales Report, and Transaction History.',
        longDescription:
          'Developed using React, .NET Core, and PostgreSQL, this web app streamlines the operations of a study hub. It includes features like Booking Management with user roles (Admin, Staff, Customer), Rate Management for flexible pricing, QR code receipt printing, and a comprehensive Dashboard for real-time table availability and booking status. Additionally, it offers Sales Reporting and Transaction History for business insights.',
        techStack: ['React', 'Ionic',"SignalR", '.NET EF Core', 'PostgreSQL', 'TypeScript', 'REST API'],
        githubUrl: null,  // 🔁 Add if public
        liveUrl: "https://study-hub-app-nu.vercel.app/admin/login",    // 🔁 Add if deployed
        featured: true,
        tags: ['Full Stack', 'Study Hub', 'Web App'],
        order: 1,
      },
       {
        name: 'Recash - Loan Management System',
        description:
          'A fully functional web application built for a loan management system, featuring user management, loan tracking, repayment scheduling, and transaction history.',
        longDescription:
          'Developed using React, .NET Core, and PostgreSQL, this web app streamlines the operations of a loan management system. It includes features like User Management with role-based access control (Admin, Staff, Checker, Collector), Loan Tracking for monitoring active loans, Repayment Scheduling for managing payment plans, and Transaction History for auditing purposes.',
        techStack: ['React', 'Ionic', 'TanStack', 'Node Express', 'PostgreSQL', 'TypeScript'],
        githubUrl: null,  // 🔁 Add if public
        liveUrl: "https://re-cash-3nit.vercel.app/login",    // 🔁 Add if deployed
        featured: true,
        tags: ['Full Stack', 'Loan Management', 'Web App'],
        order: 2,
      },
      // 🔁 Add more projects below as needed
    ],
  })

  console.log('✅ Seeding complete!')
  console.log('')
  console.log('📝 Remaining TODOs in seed.ts:')
  console.log('   • User: update email and githubUrl')
  console.log('   • Education: update institution name, field, and exact years')
  console.log('   • Experience: update your actual start date at AWS Philippines')
  console.log('   • Projects: add githubUrl/liveUrl when available, add more projects')
  console.log('   • Certifications: add any you hold')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
