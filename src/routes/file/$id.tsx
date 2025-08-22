import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getSharedFileApi } from "@/api/share";
import ImageViewer from "@/components/preview/ImageViewer";
import PdfViewer from "@/components/preview/PdfViewer";
import VideoViewer from "@/components/preview/VideoViewer";

export const Route = createFileRoute("/file/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["file", id],
    queryFn: () => getSharedFileApi(id),
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-950 text-white">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-950 text-white">
        Error: {error.message}
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-950 text-white">
        Error: {data.error}
      </div>
    );
  }

  // ✅ Build data URI from base64
  const fileType = data.data.fileType;
  const base64File = data.data.previewFile;
  const fileSrc = `data:${fileType};base64,${base64File}`;

  const renderPreview = () => {
    if (fileType.startsWith("image/")) {
      return <ImageViewer fileSrc={fileSrc} fileName={data.data.fileName} />;
    } else if (fileType === "application/pdf") {
      return <PdfViewer fileSrc={fileSrc} />;
    } else if (fileType.startsWith("video/")) {
      return <VideoViewer fileSrc={fileSrc} fileType={fileType} />;
    } else {
      return (
        <p>
          Preview not available for this file type. Use the download button
          above.
        </p>
      );
    }
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-white">
      <header className="bg-neutral-900 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{data.data.fileName}</h1>
        <a
          href={fileSrc}
          download={data.data.fileName}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download
        </a>
      </header>
      <main className="p-4 flex justify-center items-center">
        {renderPreview()}
      </main>
    </div>
  );
}
