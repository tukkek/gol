#!/bin/bash -e
SCALE='-vf scale=320:-1'
SCALE=''

rm -r frames/
mkdir frames
node --experimental-modules generate.mjs
ffmpeg -i frames/frame%d.png -vcodec mpeg4 -framerate 30 $SCALE output.avi
mv output.avi output-`date +%s`.avi
