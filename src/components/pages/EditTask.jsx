import React, { useEffect, useState } from "react";
import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import { useGetTeamQuery } from "../../features/team/teamApi";
import MainLayout from "../Layouts/MainLayout";
import { useParams } from "react-router-dom";
import { useGetTaskQuery } from "../../features/task/taskApi";
function AddTask() {
  const { id } = useParams();
  const { data: team, isLoading, isError, error } = useGetTeamQuery();

  const {
    data: projects,
    isLoading: isLoadingProjects,
    isError: isErrorProjects,
    error: errorProjects,
  } = useGetProjectsQuery();

  const {
    data: task,
    isLoading: isLoadingTask,
    isError: isErrorTask,
    error: errorTask,
  } = useGetTaskQuery(id);

  const [formData, setFormData] = useState({
    taskName: "",
    teamMember: "",
    projectName: "",
    deadline: "",
  });
  console.log(task);

  useEffect(() => {
    if (!isLoadingTask && task) {
      setFormData({
        taskName: task.taskName,
        teamMember: task.teamMember.name,
        projectName: task.project.projectName,
        deadline: task.deadline,
      });
    }
  }, [isLoadingTask, task]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <MainLayout>
      <div className="text-[#111827]">
        <div className="container relative">
          <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
            <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
              Edit Task for Your Team
            </h1>

            <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
              <form className="space-y-6">
                <div className="fieldContainer">
                  <label htmlFor="lws-taskName">Task Name</label>
                  <input
                    value={formData.taskName}
                    onChange={handleInputChange}
                    type="text"
                    name="taskName"
                    id="lws-taskName"
                    required
                    placeholder="Implement RTK Query"
                  />
                </div>
                <div className="fieldContainer">
                  <label>Assign To</label>
                  <select
                    value={formData.teamMember}
                    onChange={handleInputChange}
                    name="teamMember"
                    id="lws-teamMember"
                    required
                  >
                    <option value="" hidden>
                      Select Member
                    </option>
                    {!isLoading && !isError && team.length > 0 ? (
                      team.map((member) => (
                        <option key={member.id} value={member.name}>
                          {member.name}
                        </option>
                      ))
                    ) : (
                      <option>
                        {isLoading
                          ? "Loading..."
                          : isError
                          ? `Error: ${error.message}`
                          : ""}
                      </option>
                    )}
                  </select>
                </div>
                <div className="fieldContainer">
                  <label htmlFor="lws-projectName">Project Name</label>
                  <select
                    value={formData.projectName}
                    onChange={handleInputChange}
                    id="lws-projectName"
                    name="projectName"
                    required
                  >
                    <option value="" hidden>
                      Select Project
                    </option>
                    {!isLoadingProjects &&
                    !isErrorProjects &&
                    projects.length > 0 ? (
                      projects.map((project) => (
                        <option key={project.id} value={project.projectName}>
                          {project.projectName}
                        </option>
                      ))
                    ) : (
                      <option>
                        {isLoadingProjects
                          ? "Loading..."
                          : isErrorProjects
                          ? `Error: ${errorProjects.message}`
                          : ""}
                      </option>
                    )}
                  </select>
                </div>

                <div className="fieldContainer">
                  <label htmlFor="lws-deadline">Deadline</label>
                  <input
                    value={formData.deadline}
                    onChange={handleInputChange}
                    type="date"
                    name="deadline"
                    id="lws-deadline"
                    required
                  />
                </div>

                <div className="text-right">
                  <button type="submit" className="lws-submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
}

export default AddTask;
