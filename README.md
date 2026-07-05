# todnguyen.com

Todd Nguyen's personal website — portfolio, interactive gallery, and a blog ("The Attic") full of small experiments and games. Built with [Astro](https://astro.build) and Tailwind CSS, originally bootstrapped from the Lexington starter template.

**Live site:** https://todnguyen.com (deployed on Netlify — every push to `main` publishes automatically).

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`   |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |

## Structure

```
src/
├── pages/           # Routes. Files prefixed with _ are drafts and don't build.
│   ├── index.astro          # Home / landing page
│   ├── gallery.astro        # Interactive gallery (content driven by public/gallery/)
│   ├── toon-support.astro   # Support page (intentionally unlinked)
│   ├── blog/                # "The Attic" — blog posts and interactive experiments
│   └── case-study/          # Work case studies
├── layouts/         # BaseLayout (theme system) + RecipesLayout
├── components/      # Shared components + landing/ page sections
├── data/            # Small typed data arrays consumed by landing components
└── styles/          # global.css (Tailwind + theme CSS variables)

public/
├── gallery/         # Gallery content — folder name = gallery category
└── favicons/        # Favicons plus a few misc. images used by case studies
```

See [CLAUDE.md](CLAUDE.md) for architecture details, conventions, and media-size rules.

## License

Template code licensed under [GPL-3.0](https://opensource.org/licenses/GPL-3.0) (from the original Lexington starter). Site content © Todd Nguyen.
