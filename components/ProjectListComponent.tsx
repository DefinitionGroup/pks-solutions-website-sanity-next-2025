import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { ProjectList, Project } from "../types/types";
import { cn } from "@/app/lib/utils";
import DebugBadge from "@/components/dev/DebugBadge";

interface ProjectListComponentProps {
  data: ProjectList;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow-md transition-all hover:shadow-xl">
      <div className="relative h-48 w-full overflow-hidden">
        {project.headerImage && (
          <DebugBadge name="ProjectHeaderImage">
            <Image
              src={project.headerImage.secure_url}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </DebugBadge>
        )}
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center">
          {project.logo && (
            <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
              <DebugBadge name="ProjectLogo">
                <Image
                  src={project.logo.secure_url}
                  alt={`${project.title} logo`}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </DebugBadge>
            </div>
          )}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
        </div>
        {project.description && (
          <p className="mb-4 text-gray-600 dark:text-gray-400 line-clamp-3">
            {project.description}
          </p>
        )}
        <DebugBadge name="ProjectLink">
          <Link
            href={`/projects/${project.slug.current}`}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Project
          </Link>
        </DebugBadge>
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
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
              {data.subtitle}
            </p>
          )}
          {data.description && (
            <div className="mx-auto mt-4 max-w-3xl prose dark:prose-invert">
              {/* <PortableText value={data.description} /> */}
              <p>{data.description}</p>
            </div>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.projects?.map((project) => (
            <DebugBadge key={project._id} name="ProjectCard">
              <ProjectCard project={project} />
            </DebugBadge>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectListComponent;
