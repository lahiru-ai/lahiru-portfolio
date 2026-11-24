import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

async function main() {
  const inputPath = path.resolve('public/images/profile.jpg');
  const outputPath = path.resolve('public/images/profile-transparent.png');

  console.log(`Starting background removal on ${inputPath}...`);
  const fileUrl = pathToFileURL(inputPath).href;
  console.log(`Using file URL: ${fileUrl}`);

  // Alternatively pass Blob directly
  const fileBuffer = fs.readFileSync(inputPath);
  const blobInput = new Blob([fileBuffer], { type: 'image/jpeg' });

  const blob = await removeBackground(blobInput, {
    output: {
      format: 'image/png',
      quality: 0.95,
    },
  });

  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully generated transparent portrait at ${outputPath} (${buffer.length} bytes)!`);
}

main().catch((err) => {
  console.error('Error during background removal:', err);
  process.exit(1);
});
