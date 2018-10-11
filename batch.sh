#!/bin/bash
rm output.avi
rm -r frames/
mkdir frames
node --experimental-modules batch.mjs
ffmpeg -i frames/frame%d.png -vcodec mpeg4 -framerate 30 -vf scale=320:-1 -r 30 output.avi
