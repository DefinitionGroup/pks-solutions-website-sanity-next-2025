import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { ProjectList, Project } from "../types/types";
import { cn } from "@/app/lib/utils";

interface ProjectListComponentProps {
  data: ProjectList;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl">
      <div className="relative h-48 w-full overflow-hidden">
        {project.headerImage && (
          <Image
            src={project.headerImage.secure_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center">
          {project.logo && (
            <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={project.logo.secure_url}
                alt={`${project.title} logo`}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          )}
          <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
        </div>
        {project.description && (
          <p className="mb-4 text-gray-600 line-clamp-3">
            {project.description}
          </p>
        )}
        <Link
          href={`/projects/${project.slug.current}`}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Project
        </Link>
      </div>
    </div>
  );
};

const ProjectListComponent: React.FC<ProjectListComponentProps> = ({
  data,
}) => {
  if (!data) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              {data.subtitle}
            </p>
          )}
          {data.description && (
            <div className="mx-auto mt-4 max-w-3xl prose">
              {/* <PortableText value={data.description} /> */}
              <p>{data.description}</p>
            </div>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.projects?.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectListComponent;
