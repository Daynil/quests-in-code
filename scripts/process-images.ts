import fs from 'fs';
import { extname, join, relative } from 'path';
import sharp from 'sharp';
import { ImageMeta } from '../src/pages/posts';

async function getImageMeta(
  imagePath: string,
  imageFileName: string
): Promise<ImageMeta> {
  const sharpImg = sharp(imagePath);
  const miniWidth = 20;
  const meta = await sharpImg.metadata();
  const imgBase64 =
    meta.width <= miniWidth
      ? ''
      : await sharpImg
          .resize(miniWidth, Math.round(miniWidth / (meta.width / meta.height)))
          .toBuffer()
          .then(
            buffer =>
              `data:image/${meta.format};base64,${buffer.toString('base64')}`
          );
  return {
    fileName: imageFileName,
    // Strip public prefix, /public is / in Nextjs runtime environment
    relativePath: relative(process.cwd(), imagePath).substring('public'.length),
    width: meta.width,
    height: meta.height,
    imgBase64
  };
}

async function processImages(folderName: string, recrusive: boolean) {
  const imageFolder = fs.readdirSync(folderName);

  const recurseFolders: string[] = [];
  const folderImgMeta: { [key: string]: ImageMeta } = {};

  for await (const item of imageFolder) {
    const itemIsDir = fs.lstatSync(join(folderName, item)).isDirectory();
    if (itemIsDir) {
      recurseFolders.push(join(folderName, item));
    } else if (extname(item) !== '.json') {
      const imgMeta = await getImageMeta(join(folderName, item), item);
      folderImgMeta[imgMeta.fileName] = imgMeta;
    }
  }

  fs.writeFileSync(
    join(folderName, 'imgMeta.json'),
    JSON.stringify(folderImgMeta)
  );

  if (recrusive)
    recurseFolders.forEach(async folder => await processImages(folder, true));

  return;
}

export async function processAllImages() {
  await processImages(join(process.cwd(), 'public', 'images'), true);
}
