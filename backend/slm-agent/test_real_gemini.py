# -*- coding: utf-8 -*-
"""Test REAL AI with Gemini"""
import os
import sys

# Load from .env file - use absolute path
from dotenv import load_dotenv
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
print(f"[DEBUG] Loading .env from: {dotenv_path}")
load_dotenv(dotenv_path)

# Debug: print the API key (first few chars only)
api_key = os.environ.get("GEMINI_API_KEY", "")
if api_key:
    print(f"[DEBUG] API key loaded: {api_key[:10]}...")
    print(f"[DEBUG] API key length: {len(api_key)}")
else:
    print("[DEBUG] WARNING: GEMINI_API_KEY not found in environment!")

from agent import SLMAgent

print("=" * 60)
print("Testing REAL AI Analysis with Gemini")
print("=" * 60)

agent = SLMAgent()

print(f"\nAI Enabled: {agent.use_ai}")
print(f"Firebase: {'Connected' if agent.db else 'Not connected'}")

if agent.use_ai:
    print("\n" + "=" * 60)
    print("[AI] Asking AI to analyze 'Python Developer' skills...")
    print("=" * 60)

    result = agent.analyze_trends("Python Developer")

    skills = result.get('skills', [])
    print(f"\n[OK] AI extracted {len(skills)} skills!")

    print("\nTop skills identified by AI:")
    for skill in skills[:8]:
        bar = "#" * (skill['demand'] // 10)
        print(f"  {skill['name']:20} {skill['demand']:3}% {bar}")

    print(f"\nSummary: {result.get('summary')}")
    print(f"Analysis Method: {result.get('analysis_method')}")

    # Save to Firestore
    if agent.db:
        print("\nSaving to Firestore...")
        agent.save_to_firestore(result, "Python Developer")
        print("[OK] Done!")
else:
    print("\n[ERROR] AI not enabled - check API key")