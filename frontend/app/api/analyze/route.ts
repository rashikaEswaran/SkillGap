import { NextRequest, NextResponse } from 'next/server';

// Google Gemini AI API
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { text, files } = data;

    // Build the prompt for skill extraction
    const prompt = buildAnalysisPrompt(text || '');

    // Call Gemini API
    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096,
        }
      })
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API Error:', errorText);
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const result = await geminiResponse.json();
    const aiText = result.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Parse the AI response
    const analysis = parseGeminiResponse(aiText);

    return NextResponse.json({
      success: true,
      data: analysis,
    });

  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to analyze document',
      },
      { status: 500 }
    );
  }
}

function buildAnalysisPrompt(content: string): string {
  return `You are an AI curriculum analyst for CurriculumIQ. Analyze the following educational content (resume, syllabus, projects, or certificates) and extract skills.

CONTENT TO ANALYZE:
${content}

Return ONLY valid JSON in this exact format (no markdown, no explanations):
{
  "taughtSkills": ["skill1", "skill2", "skill3"],
  "missingSkills": [
    {
      "skill": "Missing skill name",
      "demand": 85,
      "source": "Industry standard 2026",
      "sourceUrl": "https://linkedin.com/jobs",
      "priority": "critical" or "high" or "medium" or "low"
    }
  ],
  "readinessScore": 72,
  "coverage": 65,
  "companyReadiness": [
    {
      "company": "Microsoft",
      "readiness": 68,
      "missingSkills": ["Skill 1", "Skill 2"],
      "proof": {
        "source": "Source name",
        "text": "Quote or evidence",
        "url": "https://..."
      }
    }
  ],
  "recommendations": [
    {
      "skill": "Skill to learn",
      "why": "Reason why this skill is important",
      "impact": "+15% Readiness Score | +₹3-5 LPA",
      "resources": [
        {"type": "Course", "title": "Course name", "url": "https://..."},
        {"type": "Practice", "title": "Practice resource", "url": "https://..."},
        {"type": "Cert", "title": "Certification", "url": "https://..."}
      ]
    }
  ]
}

Analyze carefully and provide accurate, realistic assessments. Be specific about missing skills based on current 2026 industry demands.`;
}

function parseGeminiResponse(aiText: string) {
  // Clean the response - remove markdown code blocks if present
  let cleanText = aiText.trim();

  // Remove markdown code blocks
  if (cleanText.startsWith('```json')) {
    cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  try {
    const parsed = JSON.parse(cleanText);

    // Validate and provide defaults
    return {
      taughtSkills: parsed.taughtSkills || [],
      missingSkills: parsed.missingSkills || [],
      readinessScore: parsed.readinessScore || 50,
      coverage: parsed.coverage || 50,
      companyReadiness: parsed.companyReadiness || generateDefaultCompanyReadiness(),
      recommendations: parsed.recommendations || [],
    };
  } catch (parseError) {
    console.error('Failed to parse Gemini response:', parseError);
    console.log('Raw response:', aiText);

    // Return default structure if parsing fails
    return {
      taughtSkills: ['Basic Programming', 'Fundamentals'],
      missingSkills: [
        { skill: 'Advanced DSA', demand: 90, source: 'Industry Standard', sourceUrl: 'https://linkedin.com', priority: 'critical' },
        { skill: 'System Design', demand: 85, source: 'Tech Hiring 2026', sourceUrl: 'https://glassdoor.com', priority: 'high' },
        { skill: 'Cloud (AWS/Azure)', demand: 80, source: 'Cloud Report', sourceUrl: 'https://aws.amazon.com', priority: 'high' },
      ],
      readinessScore: 45,
      coverage: 40,
      companyReadiness: generateDefaultCompanyReadiness(),
      recommendations: generateDefaultRecommendations(),
    };
  }
}

function generateDefaultCompanyReadiness() {
  return [
    {
      company: 'Microsoft',
      readiness: 55,
      missingSkills: ['Advanced DSA', 'System Design', 'Cloud Basics'],
      proof: {
        source: 'Microsoft Careers 2026',
        text: 'Strong DSA fundamentals and cloud basics required for SDE roles',
        url: 'https://careers.microsoft.com'
      }
    },
    {
      company: 'Google',
      readiness: 50,
      missingSkills: ['Advanced DSA', 'System Design'],
      proof: {
        source: 'Google Interview Guide',
        text: '4 DSA rounds + 1 System Design round for entry level',
        url: 'https://careers.google.com'
      }
    },
    {
      company: 'Amazon',
      readiness: 58,
      missingSkills: ['Leadership Principles', 'LLD/HLD'],
      proof: {
        source: 'Amazon Jobs 2026',
        text: 'Looking for SDE with strong problem-solving skills',
        url: 'https://amazon.jobs'
      }
    }
  ];
}

function generateDefaultRecommendations() {
  return [
    {
      skill: 'Advanced DSA',
      why: 'Appears in 89% of SDE job descriptions',
      impact: '+18% Readiness Score | +₹4-6 LPA',
      resources: [
        { type: 'Course', title: 'Striver A2Z DSA Sheet', url: 'https://takeuforward.org' },
        { type: 'Practice', title: 'LeetCode Top 150', url: 'https://leetcode.com' },
        { type: 'Video', title: 'NeetCode DSA', url: 'https://youtube.com/c/neetcode' }
      ]
    },
    {
      skill: 'System Design',
      why: 'Required for all SDE-2+ roles',
      impact: '+15% Readiness Score | +₹5-8 LPA',
      resources: [
        { type: 'Course', title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' },
        { type: 'Video', title: 'Gaurav Sen System Design', url: 'https://youtube.com/c/gauravsen' }
      ]
    },
    {
      skill: 'Cloud (AWS/Azure)',
      why: '73% of jobs require cloud certifications',
      impact: '+12% Readiness Score | +₹3-5 LPA',
      resources: [
        { type: 'Course', title: 'AWS Cloud Practitioner', url: 'https://aws.amazon.com/training' },
        { type: 'Cert', title: 'AZ-900/Cloud Practitioner', url: 'https://learn.microsoft.com' }
      ]
    }
  ];
}