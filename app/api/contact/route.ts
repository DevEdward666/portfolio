import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { contactSchema } from '@/lib/validations'
import { ZodError } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validated = contactSchema.parse(body)

    // Save to database
    const message = await prisma.contactMessage.create({
      data: {
        name: validated.name,
        email: validated.email,
        subject: validated.subject,
        message: validated.message,
      },
    })

    // Send email notification
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.RESEND_TO_EMAIL || 'edwardjosephfernandez@gmail.com',
        subject: `New Contact Form Submission: ${validated.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Message from Your Portfolio</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>From:</strong> ${validated.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${validated.email}">${validated.email}</a></p>
              <p><strong>Subject:</strong> ${validated.subject}</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; color: #555;">${validated.message}</p>
            </div>
            <p style="color: #999; font-size: 12px;">Message ID: ${message.id}</p>
          </div>
        `,
      })
    } catch (emailError) {
      console.warn('Email notification failed, but message was saved:', emailError)
      // Don't fail the request if email fails - message is still saved
    }

    return NextResponse.json(
      { success: true, id: message.id },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
}
