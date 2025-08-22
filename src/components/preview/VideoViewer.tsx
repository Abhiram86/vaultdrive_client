interface VideoViewerProps {
  fileSrc: string;
  fileType: string;
}

export default function VideoViewer({ fileSrc, fileType }: VideoViewerProps) {
  return (
    <video controls className="max-w-full max-h-[80vh] rounded-lg">
      <source src={fileSrc} type={fileType} />
      Your browser does not support the video tag.
    </video>
  );
}
