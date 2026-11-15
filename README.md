# Sifsci

Sifsci’s website introduces the studio and its Android video editor, Sifcut. All four
pages are plain HTML with shared CSS and JavaScript. No build step is required.

| Page | Path |
| --- | --- |
| Home and Sifcut preview | `/` |
| About | `/about/` |
| Privacy Policy | `/privacy-policy/` |
| Terms & Conditions | `/terms/` |

## Preview locally

From the repository root, run `python3 -m http.server 8080` and open
`http://localhost:8080`. The home page demo lets you play or scrub a sample
timeline. It uses a bundled image and does not upload files or request access
to your device.

## Publish

In GitHub, open **Settings → Pages**, choose **Deploy from a branch**, then select
`main` and `/ (root)`. Save. The same source also works on a static host such
as Vercel; choose the Other framework preset and publish the repository root
without a build command.

To use `sifsci.com`, verify the domain with your host, then follow that host’s
DNS instructions. Check where the domain and its email records currently point
before changing DNS. Once the site is public, open the privacy policy without
signing in and use its HTTPS URL in Play Console and inside Sifcut. Review the
policy against the actual release build, and confirm that `ronit@sifsci.com`
can receive support and privacy requests.

## Assets

Sifsci’s mark comes from its existing brand assets. The alpine still is generated
artwork used to demonstrate the site timeline. The bundled Geist font is licensed
under the [SIL Open Font License](assets/geist-ofl.txt).
