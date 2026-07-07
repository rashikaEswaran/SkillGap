// Next.js API Route - Gap Analysis
// POST /api/slm/gap-analysis

import { NextRequest, NextResponse } from 'next/server';

const SLM_API_URL = process.env.SLM_API_URL || 'http://localhost:5000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, curriculum_topics } = body;

    const response = await fetch(`${SLM_API_URL}/api/gap-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, curriculum_topics }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.error || 'Gap analysis failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Gap Analysis Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze gaps' },
      { status: 500 }
    );
  }
}