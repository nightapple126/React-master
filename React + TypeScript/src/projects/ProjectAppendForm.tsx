import React, {SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveProject } from './state/projectActions';
import { Project } from './Project';
import { Dispatch } from "redux"

interface ProjectAppendFormProps {
        onCancel: () => void;
    }

function ProjectAppendForm({  onCancel}: ProjectAppendFormProps) {

    const [project, setProject] = useState({id : undefined,
      name : '',
      description : '',
      imageUrl : '',
      contractTypeId : null,
      contractSignedOn : new Date(),
      budget : 0,
      isActive : 'false'});

    const [errors, setErrors] = useState({
         name: '',
         description: '',
         budget: '',
      });
      console.log(project);
    const dispatch: Dispatch<any> = useDispatch()
    const handleSubmit = (event: SyntheticEvent) => {
      event.preventDefault();
      if (!isValid()) return;
      // dispatch(saveProject(project));
    };
    
    const handleChange = (event: any) => {
          const { type, name, value, checked } = event.target;
          // if input type is checkbox use checked
          // otherwise it's type is text, number etc. so use value
          let updatedValue = type === 'checkbox' ? checked : value;
      
          //if input type is number convert the updatedValue string to a +number
          if (type === 'number') {
            updatedValue = Number(updatedValue);
          }
          const change = {
            [name]: updatedValue,
          };
      
          let updatedProject: Project;
          // need to do functional update b/c
          // the new project state is based on the previous project state
          // so we can keep the project properties that aren't being edited +like project.id
          // the spread operator (...) is used to
          // spread the previous project properties and the new change
          setProject((p:any) => {
            updatedProject = new Project({ ...p, ...change });
            return updatedProject;
          });
          setErrors(() => validate(updatedProject));
        };
      function validate(project: Project) {
        let errors: any = { name: '', description: '', budget: '' };
        if (project.name.length === 0) {
          errors.name = 'Name is required';
        }
        if (project.name.length > 0 && project.name.length < 3) {
          errors.name = 'Name needs to be at least 3 characters.';
        }
        if (project.description.length === 0) {
          errors.description = 'Description is required.';
        }
        if (project.budget === 0) {
          errors.budget = 'Budget must be more than $0.';
        }
        return errors;
      }
    function isValid() {
      return (
        errors.name.length === 0 &&
        errors.description.length === 0 &&
        errors.budget.length === 0
      );
    }
  return (
    <form className="col-sm-6 input-group vertical">
      <label htmlFor="name">Project Name</label>
      <input 
        type="text" 
        name="name" 
        placeholder="enter name"
        value={project.name}
        onChange={handleChange}
        />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}
      <label htmlFor="description">Project Description</label>
      <textarea 
        name="description" 
        placeholder="enter description"
        value={project.description}
        onChange={handleChange}
        />
      {errors.description.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}
      <label htmlFor="budget">Project Budget</label>
      <input 
        type="number" 
        name="budget" 
        placeholder="enter budget"
        value={project.budget}
        onChange={handleChange}
        />
      {errors.budget.length > 0 && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}
      <label htmlFor="isActive">Active?</label>
      <input 
        type="checkbox" 
        name="isActive"
        value={project.isActive}
        onChange={handleChange} 
        />
      <div className="input-group">
        <button className="primary bordered medium" onClick={handleSubmit} >Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default ProjectAppendForm;