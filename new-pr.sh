#!/usr/bin/env bash
set -euo pipefail

# 用法: ./new-pr.sh [base]   base 預設 master
BASE="${1:-master}"

git rev-parse --git-dir >/dev/null 2>&1 || { echo "不是 git repo"; exit 1; }
command -v gh >/dev/null 2>&1 || { echo "找不到 gh，請先 brew install gh && gh auth login"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "gh 尚未登入，請先 gh auth login"; exit 1; }

BRANCH="$(git branch --show-current)"
[ -n "$BRANCH" ] || { echo "目前不在任何分支上"; exit 1; }
[ "$BRANCH" != "$BASE" ] || { echo "目前就在 $BASE 上，請先切到功能分支"; exit 1; }

case "$BRANCH" in
  MA-*) TITLE="${BRANCH#MA-}" ;;
  *) echo "分支名不是 MA- 開頭：$BRANCH"; exit 1 ;;
esac

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "有未提交的變更，請先 commit 或 stash："
  git status --short --untracked-files=no
  exit 1
fi

git push -u origin "$BRANCH"

if URL="$(gh pr create --base "$BASE" --head "$BRANCH" --title "$TITLE" --body "" 2>/dev/null)"; then
  echo ""
  echo "已建立 PR：$URL"
else
  URL="$(gh pr view "$BRANCH" --json url --jq .url)"
  echo ""
  echo "PR 已存在：$URL"
fi
