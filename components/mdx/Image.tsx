import { sync as sizeOf } from 'probe-image-size';
import NextImage, { ImageProps } from 'next/image';
import fs from 'fs';

export default async function Image(props: ImageProps) {
  const { src } = props;
  console.log('src', src);
  let dimensions;
  if ((src as string).startsWith('/')) {
    if (fs.existsSync(`${process.cwd()}/public${src}`)) {
      dimensions = sizeOf(fs.readFileSync(`${process.cwd()}/public${src}`));
    } else {
      console.error(`Image ${src} does not exist in public folder`);
    }
  } else {
    const imgResp = await fetch(src as string);
    const imgBuffer = await imgResp.arrayBuffer();

    dimensions = sizeOf(Buffer.from(imgBuffer));
    if (!dimensions) {
      console.error(`Image ${src} does not exist`);
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <NextImage
      sizes="100vw"
      width={dimensions?.width}
      height={dimensions?.height}
      {...props}
    />
  );
}
