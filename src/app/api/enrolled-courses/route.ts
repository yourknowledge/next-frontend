import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("id")
  const courseIDs = await prisma.wp_posts.findMany({
    where: {
      post_type: 'tutor_enrolled',
      post_status: 'completed',
      post_author: Number(userId)
    },
    select: {
      post_parent: true,
    }
  })
  return NextResponse.json(courseIDs.map((course: any) => {
    return { id: Number(course.post_parent) }
  }))
}
