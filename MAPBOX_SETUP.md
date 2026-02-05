# Mapbox Setup Guide

## Get Your Mapbox Token

1. Go to https://account.mapbox.com/
2. Sign up or log in
3. Go to "Access tokens" page
4. Copy your default public token (or create a new one)
5. Add it to `.env.local`:

```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbHh4eHh4eHgifQ.xxxxxxxxx
```

6. Restart your dev server: `npm run dev`

## Features Implemented

✅ Map displays when user enters their business location
✅ Custom styled pin marker with your brand color (#0da9e4)
✅ Dark map theme to match the sidebar
✅ Smooth animations when map appears
✅ Automatic geocoding of addresses to coordinates
✅ Map is non-interactive (display only)

## Map Customization

You can change the map style in `BusinessMap.tsx`:
- `mapbox://styles/mapbox/dark-v11` (current - dark theme)
- `mapbox://styles/mapbox/light-v11` (light theme)
- `mapbox://styles/mapbox/streets-v12` (standard streets)
- `mapbox://styles/mapbox/satellite-v9` (satellite view)

Or create your own custom style at https://studio.mapbox.com/
