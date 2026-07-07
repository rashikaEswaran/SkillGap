// Next.js API Route - Proxy to SLM Agent
// POST /api/slm/analyze

import { NextRequest, NextResponse } from 'next/server';

const SLM_API_URL = process.env.SLM_API_URL || 'http://localhost:5000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, type = 'analyze', ...rest } = body;

    // Forward request to Python SLM server
    const response = await fetch(`${SLM_API_URL}/api/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, ...rest }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.error || 'SLM API error' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('SLM API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to connect to SLM server' },
      { status: 500 }
    );
  }
}

// Health check for SLM service
export async function GET() {
  try {
    const response = await fetch(`${SLM_API_URL}/health`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { status: 'unavailable', error: 'SLM server not running' },
      { status: 503 }
    );
  }
}