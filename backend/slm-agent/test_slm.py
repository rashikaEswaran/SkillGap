# -*- coding: utf-8 -*-
"""
Test SLM Model Loading
Load Phi-3 Mini model and test web search + analysis
"""

import sys
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, script_dir)

from agent import SLMAgent

print("=" * 60)
print("Testing SLM Model Loading")
print("=" * 60)

# Force load the model (not mock mode)
agent = SLMAgent(use_mock=False)

print(f"\nModel loaded: {agent.model is not None}")
print(f"Using mock: {agent.use_mock}")

if agent.model:
    print("\n" + "=" * 60)
    print("Testing SLM Analysis with Real Web Data")
    print("=" * 60)

    # Test with real web search
    result = agent.analyze_trends("Python developer skills demand 2026")

    print("\nSkills extracted by SLM:")
    for skill in result.get('skills', []):
        print(f"  - {skill.get('name')}: {skill.get('demand')}% demand")

    print(f"\nSummary: {result.get('summary')}")
else:
    print("\n[INFO] Model not loaded - check transformers installation")
    print("Try: pip install torch transformers accelerate")