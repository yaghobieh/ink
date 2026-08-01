---
name: ink-release-workflow
description: Ink release workflow — version bump, CHANGELOG, build, publish.
---

# Ink release workflow

1. Update `CHANGELOG.md`
2. Branch `release/x.y.z`
3. Create GitHub milestone + issues
4. PR → merge to `main`
5. First publish: keep version exact (e.g. `1.0.0`); later patch bumps via `publish.yml`
6. Announce Discord / paste Linear + Telegram docs
