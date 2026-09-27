# WildWorks Website

A static, animated WildWorks landing site built for GitHub Pages. No build step and no framework are required.

## Put it on GitHub Pages

1. Create a new GitHub repository, for example `wildworks-site`.
2. Upload **everything inside this folder** (`index.html`, `styles.css`, `script.js`, `site-data.js`, and the `assets` folder) to the repository root.
3. In GitHub open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Pick your `main` branch and `/ (root)`, then save.
6. GitHub will show the public Pages URL when deployment finishes.

## Change the featured creator or video

Open `site-data.js` and edit:

```js
window.WILDWORKS_CONFIG = {
  creator: {
    handle: "@WildWorksVR",
    channelUrl: "https://youtube.com/@WildWorksVR",
    videoUrl: "https://youtube.com/shorts/W32AjYdnJbE",
    youtubeVideoId: "W32AjYdnJbE"
  }
};
```

The YouTube video is lazy-loaded only after someone clicks the preview.

## Change map / update text

Edit the four `.update-card` blocks in `index.html`. The images are in `assets/`.

## Main files

- `index.html` — page sections/content
- `styles.css` — complete design, responsive layout and animations
- `script.js` — parallax, tilt, scroll reveal, FAQ and video loading
- `site-data.js` — easy creator/video configuration
- `assets/` — your logo, map images and gameplay image

## Notes

The site uses Google Fonts when online, with local system fallbacks. The rest is plain HTML/CSS/JS and works on GitHub Pages without Node.js.
