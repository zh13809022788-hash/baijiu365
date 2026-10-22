#!/usr/bin/env bash
set -euo pipefail
FF="/c/Users/aomanhanliu/WorkBuddy/2026-08-24-00-09-44/.media_work/pydeps/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe"
cd "$(dirname "$0")"

D=4
FPS=30
W=1280
H=720
BG=0x0d0a07

COVER="scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}"
FIT="scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:color=${BG}"

"$FF" -y \
 -loop 1 -t $D -i ../public/images/jinling/hero-scene.jpg \
 -loop 1 -t $D -i label.png \
 -loop 1 -t $D -i boxback.jpg \
 -loop 1 -t $D -i ../public/images/jinling/bottle-scene.jpg \
 -loop 1 -t $D -i ../public/images/jinling/packaging.jpg \
 -filter_complex "
 [0:v]${COVER},setsar=1,zoompan=z='if(lte(on,1),1.10,max(1.0,zoom-0.0009))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${D}*${FPS}:s=${W}x${H}:fps=${FPS},trim=duration=${D},setpts=PTS-STARTPTS,fps=${FPS},settb=AVTB[v0];
 [1:v]${FIT},setsar=1,zoompan=z='min(1.07,1+0.0006*on)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${D}*${FPS}:s=${W}x${H}:fps=${FPS},trim=duration=${D},setpts=PTS-STARTPTS,fps=${FPS},settb=AVTB[v1];
 [2:v]crop=iw:ih*0.56:0:ih*0.04,scale=-2:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:color=${BG},setsar=1,zoompan=z='min(1.07,1+0.0006*on)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${D}*${FPS}:s=${W}x${H}:fps=${FPS},trim=duration=${D},setpts=PTS-STARTPTS,fps=${FPS},settb=AVTB[v2];
 [3:v]${FIT},setsar=1,zoompan=z='min(1.07,1+0.0006*on)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${D}*${FPS}:s=${W}x${H}:fps=${FPS},trim=duration=${D},setpts=PTS-STARTPTS,fps=${FPS},settb=AVTB[v3];
 [4:v]scale=${W}:-2:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:color=${BG},setsar=1,zoompan=z='if(lte(on,1),1.07,max(1.0,zoom-0.0006))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${D}*${FPS}:s=${W}x${H}:fps=${FPS},trim=duration=${D},setpts=PTS-STARTPTS,fps=${FPS},settb=AVTB[v4];
 [v0][v1]xfade=transition=fade:duration=0.8:offset=3.2[x1];
 [x1][v2]xfade=transition=fade:duration=0.8:offset=6.4[x2];
 [x2][v3]xfade=transition=fade:duration=0.8:offset=9.6[x3];
 [x3][v4]xfade=transition=fade:duration=0.8:offset=12.8[x4];
 [x4]eq=contrast=1.04:saturation=1.04:brightness=-0.01,vignette=PI/4.8,format=yuv420p[vout]
 " -map "[vout]" -an -c:v libx264 -preset slow -crf 29 -pix_fmt yuv420p -movflags +faststart -r $FPS out.mp4

"$FF" -y -ss 1.5 -i out.mp4 -frames:v 1 -q:v 3 poster.jpg -loglevel error
"$FF" -y -i out.mp4 -vf "fps=1/2.2,scale=320:-1,tile=4x2" -frames:v 1 grid.jpg -loglevel error
ls -la out.mp4 poster.jpg
