# -*- coding: utf-8 -*-
"""
Test Real AI Analysis with Gemini
"""

import sys
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, script_dir)

from agent import SLMAgent

print("=" * 60)
print("Testing REAL AI Analysis")
print("=" * 60)

agent = SLMAgent()

print(f"\nAI Enabled: {agent.use_ai}")
print(f"Database: {'Connected' if agent.db else 'Not connected'}")

if agent.use_ai:
    print("\n" + "=" * 60)
    print("Testing AI skill extraction...")
    print("=" * 60)
    result = agent.analyze_trends("Python developer")

    print(f"\nSkills found: {len(result.get('skills', []))}")
    print(f"Analysis method: {result.get('analysis_method')}")

    print("\nTop skills:")
    for skill in result.get('skills', [])[:5]:
        print(f"  - {skill['name']}: {skill['demand']}% ({skill['category']})")

    print(f"\nSummary: {result.get('summary')}")
else:
    print("\n[INFO] AI not available - testing rule-based analysis")
    print("\n" + "=" * 60)
    print("Testing rule-based skill extraction...")
    print("=" * 60)
    result = agent.analyze_trends("Python developer")

    print(f"\nSkills found: {len(result.get('skills', []))}")

    print("\nTop skills:")
    for skill in result.get('skills', [])[:5]:
        print(f"  - {skill['name']}: {skill['demand']}% ({skill['category']})")

print("\n[OK] Test complete!")