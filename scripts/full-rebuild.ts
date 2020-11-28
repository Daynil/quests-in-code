import { generateSitemap } from './generate-sitemap';
import { processAllImages } from './process-images';

// Running all build tasks in a script allows me to choose
// when they are all run in a command, vs. in webpack
// where they are are all always run
processAllImages();
generateSitemap();
