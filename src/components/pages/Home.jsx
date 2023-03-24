import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Project from "../subComponents/Project";
import Task from "../subComponents/Task";
import TeamMember from "../subComponents/TeamMember";
import MainLayout from "../Layouts/MainLayout";
import { useGetTeamQuery } from "../../features/team/teamApi";
import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import { useGetTasksQuery } from "../../features/tasks/tasksApi";
import { useDispatch, useSelector } from "react-redux";
import { initiateFilter } from "../../features/filter/filterSlice";

function Home() {
  const searchTerm = useSelector((state) => state.search.searchTerm);
  console.log(searchTerm);
  const filterTerms = useSelector((state) => state.filter.filterBy);
  const dispatch = useDispatch();
  const { data: team, isLoading, isError, error } = useGetTeamQuery();
  const {
    data: projects,
    isLoading: isLoadingProjects,
    isError: isErrorProjects,
    error: errorProjects,
  } = useGetProjectsQuery();
  useGetTeamQuery();
  const {
    data: tasks,
    isLoading: isLoadingTasks,
    isError: isErrorTasks,
    error: errorTasks,
  } = useGetTasksQuery();

  useEffect(() => {
    if (!isLoadingProjects && !isErrorProjects && projects.length > 0) {
      const projectNames = projects.map((project) => project.projectName);

      dispatch(initiateFilter(projectNames));
    }
  }, [dispatch, isErrorProjects, isLoadingProjects, projects]);

  let teamMemberContent;
  if (isLoading) {
    <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    <div>{error}</div>;
  }
  if (!isLoading && !isError && team?.length === 0) {
    <div>Not Found</div>;
  }
  if (!isLoading && !isError && team.length > 0) {
    teamMemberContent = team.map((member) => (
      <TeamMember member={member || {}} key={member.id} />
    ));
  }
  let projectContent;

  if (isLoadingProjects) {
    <div>Loading...</div>;
  }
  if (!isLoadingProjects && isErrorProjects) {
    <div>{errorProjects}</div>;
  }
  if (!isLoadingProjects && !isErrorProjects && projects?.length === 0) {
    <div>Not Found</div>;
  }
  if (!isLoadingProjects && !isErrorProjects && projects.length > 0) {
    projectContent = projects.map((project) => (
      <Project project={project || {}} key={project.id} />
    ));
  }

  let tasksContent;

  if (isLoadingTasks) {
    tasksContent = <div>Loading...</div>;
  }
  if (!isLoadingTasks && isErrorTasks) {
    tasksContent = <div>{errorTasks}</div>;
  }
  if (!isLoadingTasks && !isErrorTasks && tasks?.length === 0) {
    tasksContent = <div>Not Found</div>;
  }
  if (!isLoadingTasks && !isErrorTasks && tasks.length > 0) {
    tasksContent = tasks
      .filter((task) => filterTerms.includes(task?.project?.projectName))
      .filter((task) =>
        task.taskName.toLowerCase().includes(searchTerm?.toLowerCase())
      )
      .map((task) => <Task task={task || {}} key={task.id} />);
  }

  return (
    <MainLayout>
      {
        <div className="text-[#111827]">
          <div className="container relative">
            <div className="sidebar">
              <h3 className="text-xl font-bold">Projects</h3>
              <div className="mt-3 space-y-4">{projectContent}</div>
              <div></div>
              <div className="mt-8">
                <h3 className="text-xl font-bold ">Team Members</h3>
                <div className="mt-3 space-y-4">{teamMemberContent}</div>
              </div>
            </div>
            <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
              <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                <div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
                  <Link to={"/AddTask"} className="lws-addnew group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 group-hover:text-indigo-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>

                    <span className="group-hover:text-indigo-500">Add New</span>
                  </Link>
                </div>
                <div className="lws-task-list">{tasksContent}</div>
              </main>
            </div>
          </div>
        </div>
      }
    </MainLayout>
  );
}

export default Home;
