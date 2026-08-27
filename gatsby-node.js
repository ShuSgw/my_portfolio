const path = require(`path`);
const fs = require(`fs`);

// Gatsby only auto-loads .env.* into the browser bundle; Node-side code
// (gatsby-node.js / gatsby-config.js) has to load it explicitly.
require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV || `development`}`,
});

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allWpPost {
          totalCount
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  const PerPage = 5;
  const pageCount = Math.ceil(result.data.allWpPost.totalCount / PerPage);

  for (let i = 0; i < pageCount; i++) {
    createPage({
      path: `/worklist/${i + 1}`,
      component: path.resolve("src/template/works-page.js"),
      context: {
        limit: PerPage,
        skip: i * PerPage,
        thePage: i + 1,
      },
    });
  }
};

// Write basic-auth files for /cv/ into the build output from env vars.
// Credentials never live in the repo — set them in .env.production (gitignored).
//   CV_BASIC_AUTH_HTPASSWD        full htpasswd line, e.g. `guest:$2y$05$...`
//   CV_BASIC_AUTH_USERFILE_PATH   absolute server path to the deployed .htpasswd
exports.onPostBuild = () => {
  const htpasswd = process.env.CV_BASIC_AUTH_HTPASSWD;
  const userFile = process.env.CV_BASIC_AUTH_USERFILE_PATH;
  const cvDir = path.join(__dirname, `public`, `cv`);

  if (!htpasswd || !userFile) {
    console.warn(
      `\n[cv-auth] CV_BASIC_AUTH_HTPASSWD / CV_BASIC_AUTH_USERFILE_PATH not set — ` +
        `/cv/ will NOT be password protected in this build.\n`
    );
    return;
  }

  fs.mkdirSync(cvDir, { recursive: true });
  fs.writeFileSync(path.join(cvDir, `.htpasswd`), `${htpasswd.trim()}\n`);
  fs.writeFileSync(
    path.join(cvDir, `.htaccess`),
    [
      `# Generated at build time from env vars — do not edit by hand.`,
      `AuthType Basic`,
      `AuthName "Restricted"`,
      `AuthUserFile "${userFile}"`,
      `Require valid-user`,
      ``,
      `# Never serve the password file itself.`,
      `<Files ".htpasswd">`,
      `  Require all denied`,
      `</Files>`,
      ``,
    ].join(`\n`)
  );
  console.log(`[cv-auth] wrote public/cv/.htaccess + public/cv/.htpasswd`);
};
