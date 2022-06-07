import React, { useEffect, useState } from 'react';
// import { MOCK_PROJECTS } from './MockProjects';
import  ProjectList  from './ProjectList';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../state';
import { loadProjects } from './state/projectActions';
import { Dispatch } from "redux";
import  ProjectAppendForm  from "./ProjectAppendForm";


function ProjectsPage() {

  // const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const loading = useSelector(
    (appState: AppState) => appState.projectState.loading
  );
  const projects = useSelector(
    (appState: AppState) => appState.projectState.projects
  );
  const error = useSelector(
    (appState: AppState) => appState.projectState.error
  );
  const currentPage = useSelector(
    (appState: AppState) => appState.projectState.page
  );
  const [AppendFormView, setAppendFormView] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    dispatch(loadProjects(1));
  }, [dispatch]);

  const handleMoreClick = () => {
      dispatch(loadProjects(currentPage + 1));
    };
  const handleAppendClick = () => {
    setAppendFormView(true);
  };
  const handleCancel = () => {
    setAppendFormView(false);
  }
  return (
   <>
     <h1>Projects</h1> 
     <button className="primary bordered medium" onClick = {handleAppendClick}>Append</button>
     {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
      {!AppendFormView 
        ? <div>
            <ProjectList 
            projects={projects} />
            {!loading && !error && (
              <div className="row">
                <div className="col-sm-12">
                  <div className="button-group fluid">
                    <button className="button default" onClick={handleMoreClick}>
                      More...
                    </button>
                  </div>
                </div>
              </div>
            )}
            {loading && (
              <div className="center-page">
                <span className="spinner primary"></span>
                <p>Loading...</p>
              </div>
            )}
          </div>        
        :
        <ProjectAppendForm
          onCancel={handleCancel}/>} 
      
   </>
  );
}

export default ProjectsPage;