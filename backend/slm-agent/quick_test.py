# -*- coding: utf-8 -*-
"""Quick test of SLMAgent"""
from agent import SLMAgent

print("Testing SLMAgent...")
agent = SLMAgent()

print("\n--- Testing Python Developer analysis ---")
result = agent.analyze_trends("Python Developer")

skills = result.get('skills', [])
print(f"Skills found: {len(skills)}")

for skill in skills[:5]:
    print(f"  - {skill['name']}: {skill['demand']}% ({skill['category']})")

print(f"\nSummary: {result.get('summary')}")
print(f"Method: {result.get('analysis_method')}")

# Save to Firestore
if agent.db:
    print("\n--- Saving to Firestore ---")
    agent.save_to_firestore(result, "Python Developer")