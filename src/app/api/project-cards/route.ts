import { newProjectCardSchema, ProjectSelect } from '@/components/projects/types';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const projet = await prisma.project.findMany({
      select: ProjectSelect,
      where: {
        id: projectId,
      },
    });

    return NextResponse.json(projet);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if request body exists
    if (!request.body) {
      return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
    }

    const body = await request.json();
    console.log(body); //TO_REMOVE
    // Validate the data
    const validatedData = newProjectCardSchema.parse(body);

    // Create the project card
    const projectCard = await prisma.projectCard.create({
      data: validatedData,
    });

    return NextResponse.json({ data: projectCard }, { status: 201 });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 },
      );
    }

    // Handle Prisma errors
    if (error instanceof Error) {
      console.error('API Error:', error.message);
      return NextResponse.json(
        {
          error: 'Internal server error',
          message: error.message,
        },
        { status: 500 },
      );
    }

    // Handle unknown errors
    console.error('Unknown error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
