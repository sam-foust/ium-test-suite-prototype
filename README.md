# IUM Test Suite Documentation

This repository hosts test documentation for the Internal User Management (IUM) system using GitHub Pages with Jekyll.

## View the Documentation

Visit the live site at: `https://[your-username].github.io/[your-repo-name]/`

## Local Development

To run the site locally:

1. Install Ruby and Bundler if you haven't already
2. Install dependencies:
   ```bash
   bundle install
   ```
3. Run the Jekyll server:
   ```bash
   bundle exec jekyll serve
   ```
4. Open your browser to `http://localhost:4000`

## Adding New Test Documentation

1. Create a new `.md` file in the root directory
2. Add front matter at the top:
   ```yaml
   ---
   layout: page
   title: Your Test Suite Name
   ---
   ```
3. Add a link to the new page in `index.md`

## Repository Structure

- `_config.yml` - Jekyll configuration
- `index.md` - Homepage
- `regression-test-template.md` - Password Management test suite
- `Gemfile` - Ruby dependencies

## GitHub Pages Configuration

This site is configured to build automatically with GitHub Pages. Make sure:

1. GitHub Pages is enabled in repository Settings > Pages
2. Source is set to the correct branch (usually `main` or `master`)
3. GitHub Actions is enabled for the repository

## Troubleshooting

If you see a 404 error:
- Wait a few minutes for GitHub Actions to build the site
- Check the Actions tab for build errors
- Verify the `baseurl` in `_config.yml` matches your repository name if this is a project site

