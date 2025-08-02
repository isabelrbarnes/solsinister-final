# SolSinister Git Push Protocol

## Required Method for All Pushes

Due to repository complexity and large files, always use this squashed commit method:

### Prerequisites
```bash
# Install Git LFS (one-time setup)
brew install git-lfs
git lfs install

# Configure LFS to track large files
git lfs track "*.png"
git lfs track "*.jpg" 
git lfs track "*.jpeg"
git add .gitattributes
```

### Push Protocol

1. **Squash all commits to single commit:**
```bash
git reset --soft $(git rev-list --max-parents=0 HEAD)
git commit --amend -m "Updated: [Your descriptive commit message]"
```

2. **Force push to GitHub:**
```bash
git push origin master:main --force
```

### Repository Details
- **Repository**: `https://github.com/isabelrbarnes/solsinister-final` (PRIVATE)
- **Remote URL**: `https://isabelrbarnes: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@github.com/isabelrbarnes/solsinister-final.git`
- **Admin Key**: `80230701`

### Why This Method?
- Resolves persistent HTTP 400 errors with normal git pushes
- Git LFS handles large profile pictures (7.6 MB)
- Single commit reduces git history complexity
- Works reliably every time

### Success Output
```
✅ Uploading LFS objects: 100% (8/8), 7.6 MB
✅ Writing objects: 100% (72/72), 269.91 KiB
✅ remote: Resolving deltas: 100% (3/3), done.
✅ * [new branch] master -> main
```

---
**Note**: Always use this method for ANY push to avoid the HTTP 400 errors we previously encountered.
