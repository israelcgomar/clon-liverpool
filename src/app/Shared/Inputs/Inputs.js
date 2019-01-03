import React from 'react'

export const Input = ({ label, type, onChange, name, error, typeError }) => {
  const small = typeError || '';
  return (
    <div className="form_inline">
      <label>{label}</label>
      <div className='input__inline'>
        <input onChange={onChange} className={`input__small ${error}`} type={type} name={name}/>
        {small.length > 0 ? <small className="errorMessage">{small}</small> : null}      
      </div>
    </div>
  );   
}

export const Select = ({ label, options, onChange, name, type }) => {
  const element = options.map(data => {
    return <option key={data._id}>{`${data.name}`}</option>
  }
  );
  return <div className="Select form_inline">
    <label>{label}</label>
    <select onChange={onChange} type={type} name={name} className="input__small">
      {element}
    </select>
  </div>;
}


export const InputSearch = ({ label, type, onChange, name, error, typeError }) => {
  const small = typeError || "";
  return <div className="form_inline">
    <label>{label}</label>
    <div className="input__inline">

      <input onChange={(onChange)} className={`input__small ${error}`} type={type} name={name} />
      {
        small.length > 0 ? <small className="errorMessage">
          {small}
        </small> : null
      }
    </div>
  </div>;
};


export const InputImage = ({ label, type, onChange, name, error, typeError }) => {
         const small = typeError || "";
         return <div className="form_inline">
             <label>{label}</label>
             <div className="">
               <input onChange={onChange} className={`image ${error}`} type={type} name={name} />
               {small.length > 0 ? <small className="errorMessage">
                   {small}
                 </small> : null}
             </div>
           </div>;
       };
