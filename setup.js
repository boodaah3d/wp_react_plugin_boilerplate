const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');

const EXCLUDED_DIRS = ['node_modules', 'build'];
const EXCLUDED_FILES = ['.gitignore', 'package-lock.json', 'README.md', 'setup.js'];
const EXCLUDED_PREFIXES = ['.git'];

const pluginName = readline.question('Enter the plugin name: ').trim();

const pluginSlug = pluginName
  .toLowerCase()
  .replace(/[^a-z0-9\- ]+/g, '')    // remove invalid chars
  .replace(/ +/g, '-')              // spaces to hyphens
  .replace(/-+/g, '-');             // collapse multiple hyphens

const shortcodeTag = pluginSlug.replace(/-+/g, '_');

const phpPrefix = shortcodeTag + '_';

const directoryName = path.basename(__dirname);

if (directoryName !== pluginSlug) {
  console.error(`Error: Directory name should match ${pluginSlug} but is ${directoryName}`);
  process.exit(1);
}

console.log('\nProcessing ...');

function shouldExclude(filePath) {
  const parts = filePath.split(path.sep);
  return parts.some(part =>
    EXCLUDED_DIRS.includes(part) ||
    EXCLUDED_FILES.includes(part) ||
    EXCLUDED_PREFIXES.some(prefix => part.startsWith(prefix))
  );
}

function replaceInFile(filePath) {
  if (shouldExclude(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const updated = content
    .replace(/__PLUGIN_NAME__/g, pluginName)
    .replace(/__PLUGIN_SLUG__/g, pluginSlug)
    .replace(/__SHORTCODE_TAG__/g, shortcodeTag)
    .replace(/__PHP_PREFIX__/g, phpPrefix);

  const base = path.basename(filePath);

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Updated contents: ${base}`);
  }
}

function renameItem(oldPath) {
  if (shouldExclude(oldPath)) return oldPath;

  const dir = path.dirname(oldPath);
  const base = path.basename(oldPath);

  const newBase = base
    .replace(/__PLUGIN_NAME__/g, pluginName)
    .replace(/__PLUGIN_SLUG__/g, pluginSlug)
    .replace(/__SHORTCODE_TAG__/g, shortcodeTag)
    .replace(/__PHP_PREFIX__/g, phpPrefix);

  const newPath = path.join(dir, newBase);

  if (oldPath !== newPath) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${base} → ${newBase}`);
    return newPath;
  }

  return oldPath;
}
function walkAndProcess(dir) {
  if (shouldExclude(dir)) return;

  fs.readdirSync(dir).forEach(entry => {
    const fullPath = path.join(dir, entry);
    if (shouldExclude(fullPath)) return;

    const stats = fs.lstatSync(fullPath);

    if (stats.isDirectory()) {
      const renamedDir = renameItem(fullPath);
      walkAndProcess(renamedDir);
    } else if (stats.isFile()) {
      replaceInFile(fullPath);
      renameItem(fullPath);
    }
  });
}

walkAndProcess(process.cwd());
