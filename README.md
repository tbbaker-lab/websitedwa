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


## Site icon / profile image

The WildWorks Studio logo is now used as the browser favicon, iPhone home-screen icon, and social-link preview image.


## v3 map/gallery update

- Added the official Discord button next to YouTube: `https://discord.gg/QYF8mFkycn`
- Added four new high-resolution map renders supplied by the project.
- Added an animated island gallery with autoplay, manual tabs, arrows, fullscreen viewing and map captions.
- Refined map cards to use the newer renders.
- Added animated world statistics and extra responsive polish.

The site is still plain HTML/CSS/JS and GitHub Pages compatible.


## v4 support / itch update

- Added support email: `pyromanicstudios@gmail.com`
- Added Itch.io link buttons pointing to `https://pyromanicstudios.itch.io/wildworks`
- Added a contact/links card in the support section

Note: the Itch page URL is linked directly, but I could not automatically inspect the page content from this environment, so no page-specific text or artwork was pulled from it.
