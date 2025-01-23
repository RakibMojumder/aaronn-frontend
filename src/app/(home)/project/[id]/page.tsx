import { getProjectByIdAction } from "@/actions/actions";
import Content from "@/components/Content";
import { shimmer, toBase64 } from "@/lib/image";
import Image from "next/image";

const ProjectDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const project = await getProjectByIdAction(id);

  return (
    <div className="container mx-auto min-h-screen text-white px-4 pt-16 pb-28 relative">
      <div className="w-[200px] h-[80px] absolute top-28 -left-16 xl:left-10 bg-white blur-[100px] opacity-60 hidden lg:block"></div>
      {/* Header Section */}
      <h1 className="text-3xl md:text-5xl font-semibold mb-2">
        Project Detail
      </h1>
      <p className="text-gray-400 mb-24">Detail About The Project</p>

      <hr className="py-10 border-neutral-600" />
      <div>
        <Image
          src={project?.data?.image || ""}
          alt="project image"
          width={500}
          height={500}
          priority
          quality={100}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(500, 500, 10, 10)
          )}`}
          className="w-full max-h-[550px] object-cover object-center rounded-xl"
        />
      </div>

      <div className="mt-10">
        <h2 className="text-xl md:text-3xl font-bold leading-tight mb-8">
          {project?.data?.projectName}
        </h2>

        <h3 className="text-lg md:text-xl font-bold leading-tight mb-8">
          Project Story
        </h3>

        <div className="space-y-5">
          {project?.data?.description.blocks.map((block) => (
            <Content {...block} key={block.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
