The HTML file requires only a modern browser to run (HTML5 for Canvas and JS6 for modules). Any up-to-date browser installation should suffice.

The batch script requires Node 9+ for experimental module support and also node-canvas 2.0+, installed with `npm install canvas@next`.

If npm cannot find a prebuilt binary version of node-canvas to download, it will build it locally. This requires `sudo apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++` or equivalent. More info at https://github.com/Automattic/node-canvas

To succesfully run the batch scripts you'll also need BASh. 

ffmpeg is required to run the video encoding program.
