#!/bin/bash

# Define the output file
output_file="project_files.txt"

# Clear the output file if it exists
> "$output_file"

# Define the relative path of the directory to exclude
# exclude_dir="./components/ui"
exclude_dir=""

# Find and process relevant files, excluding specified directories and files
find . -type d \( \
  -path "$exclude_dir" -o \
  -name 'node_modules' -o \
  -name '.next' -o \
  -name '.git' -o \
  -name 'dist' -o \
  -name 'build' -o \
  -name 'coverage' -o \
  -name 'logs' -o \
  -name 'public' \
\) -prune -false -o \
-type f \( \
  -name "*.ts" -o \
  -name "*.tsx" -o \
  -name "*.js" -o \
  -name "*.jsx" -o \
  -name "*.json" -o \
  -name "*.css" -o \
  -name "*.scss" -o \
  -name "*.html" -o \
  -name ".env.local" \
\) ! -name "package-lock.json" | while IFS= read -r file; do
  echo "File: $file" >> "$output_file"
  echo "-------------------------------------" >> "$output_file"
  cat "$file" >> "$output_file"
  echo -e "\n=====================================\n" >> "$output_file"
done
