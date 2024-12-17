import { newColumnSchema, TaskColumnSelect } from '@/components/tasks/types';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageId = searchParams.get('pageId');

    if (!pageId || Number.isNaN(Number(pageId))) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const columns = await prisma.taskColumn.findMany({
      where: {
        pageId: Number(pageId),
      },
      select: TaskColumnSelect,
    });

    return NextResponse.json(columns);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = newColumnSchema.parse(body);

    await prisma.taskColumn.create({
      data: { ...validatedData, pageId: 1 },
    });

    return NextResponse.json({ status: 201 });
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: e.errors },
        { status: 400 },
      );
    }
    console.error(e);
    return NextResponse.json({ e: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = z
      .object({
        id: z.number().min(1, 'Id is required'),
      })
      .parse(body);

    await prisma.taskColumn.delete({
      where: {
        id: validatedData.id,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: e.errors },
        { status: 400 },
      );
    }
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = newColumnSchema.parse(body);

    if (!validatedData.id) throw new Error('Id is required');

    await prisma.taskColumn.update({
      where: {
        id: validatedData.id,
      },
      data: {
        name: validatedData.name,
        color: validatedData.color,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: e.errors },
        { status: 400 },
      );
    }
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
