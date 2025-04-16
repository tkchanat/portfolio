#!/bin/bash

# Loop through all .png files in the current directory
for file in *.png; do
  # Check if the file exists (in case there are no .png files)
  if [ -f "$file" ]; then
    # Convert the PNG file to WebP using ImageMagick's convert command
    magick convert "$file" "${file%.png}.webp"
    echo "Converted $file to ${file%.png}.webp"
  fi
done

