import { ProjectSelect } from '@/components/projects/types';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

//TODO : change so u just fetch the projects for the sidebar
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
