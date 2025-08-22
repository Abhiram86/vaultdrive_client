interface ImageViewerProps {
  fileSrc: string;
  fileName: string;
}

export default function ImageViewer({ fileSrc, fileName }: ImageViewerProps) {
  return (
    <img
      src={fileSrc}
      alt={fileName}
      className="max-w-full max-h-[80vh] rounded-lg"
    />
  );
}
