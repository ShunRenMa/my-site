#!/usr/bin/env bash
set -euo pipefail

# 用法: ./new-branch.sh [base]   base 預設 master
BASE="${1:-master}"

git rev-parse --git-dir >/dev/null 2>&1 || { echo "不是 git repo"; exit 1; }

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "有未提交的變更，請先 commit 或 stash："
  git status --short --untracked-files=no
  exit 1
fi

git fetch --prune origin

if git show-ref --verify --quiet "refs/remotes/origin/$BASE"; then
  START="origin/$BASE"
elif git show-ref --verify --quiet "refs/heads/$BASE"; then
  START="$BASE"
else
  echo "找不到分支 $BASE"; exit 1
fi

PREFIX="MA-$(date +%Y%m%d)"

n=0
while git show-ref --verify --quiet "refs/heads/$PREFIX.$n" \
   || git show-ref --verify --quiet "refs/remotes/origin/$PREFIX.$n"; do
  n=$((n + 1))
done

BRANCH="$PREFIX.$n"
git switch --no-track -c "$BRANCH" "$START"

echo ""
echo "已從 $START 建立並切換到 $BRANCH"
echo "推送: git push -u origin $BRANCH"
