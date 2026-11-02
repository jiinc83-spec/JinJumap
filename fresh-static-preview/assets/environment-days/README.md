# Environmental calendar media

Place calendar-specific image and video files in this folder. In `data/environment-days.json`, set an event's `media` field, for example:

```json
"media": {
  "type": "image",
  "src": "../assets/environment-days/earth-day.webp",
  "alt": "지구의 날 환경 실천 사진",
  "caption": "지구의 날에 함께한 환경 실천"
}
```

For video, use `"type": "video"`, set `src` to an `.mp4` or `.webm` file, and optionally provide `poster`, `mimeType`, and `caption`. Supported files: PNG, JPG/JPEG, WebP, GIF, MP4, and WebM.