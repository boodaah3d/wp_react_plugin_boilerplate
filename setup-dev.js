const fs = require('fs');
const path = require('path');

const EXCLUDED_DIRS = ['node_modules', 'build'];
const EXCLUDED_FILES = ['package-lock.json', 'README.md', 'setup.js', 'setup-dev.js'];
const EXCLUDED_PREFIXES = ['.git'];

const pluginName = '__PLUGIN_NAME__';
const pluginSlug = '__PLUGIN_SLUG__';
const shortcodeTag = '__SHORTCODE_TAG__';
const phpPrefix = '__PHP_PREFIX__';

console.log('\nProcessing ...\n');

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
    .replace(/My Plugin/g, pluginName)
    .replace(/my-plugin/g, pluginSlug)
    .replace(/my_plugin_/g, phpPrefix)
    .replace(/my_plugin/g, shortcodeTag);

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
    .replace(/My Plugin/g, pluginName)
    .replace(/my-plugin/g, pluginSlug)
    .replace(/my_plugin_/g, phpPrefix)
    .replace(/my_plugin/g, shortcodeTag);

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
