import { useState } from 'react';
import { useForm } from 'react-hook-form';
// Model logic 
import Question from './../statics/Question';
import AlertInfo from './../statics/Alert';
// Third party liberaries
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Custom Component 
import Alerts from '../components/Alert';

// Api sevice 
import Api from './../services/Api';

// Schema for input fields 
const schema = yup.object().shape({
  title: yup.string().required('Title Must be There!'),
  body: yup.string().required('Body Must be There!'),
  userId: yup.number().required('User ID Must be There!')
});

export default function Question1 (props) {
  // Situation: The TestForm component was written by a junior developer who needs some help getting it to function.
  // Please modify the TestForm component such that it will correctly use hooks to validate and post to the endpoint.
  // Feel free to use any (or no) external libraries you feel appropriate.
  // Endpoint docs: https://jsonplaceholder.typicode.com/guide/

  // userId values 
  const userId = [1337, 1234, 1066];
  const [alert, setAlert] = useState(AlertInfo);

  // hook for form and validation
  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });

   // Capture on form data and post on server 
  const onSubmit = (values) => {
    new Api().PostQuestion1(values, setAlert);
  }

  // Alert Ok 
  const onConfirm = () => {
    setAlert({loading: false});
  }

  return (
    <div>
      {/* Loading and alert  */}
      <Alerts message={alert.message} alert={alert.loading} type={alert.type} onConfirm={onConfirm}/>
      {/* Form details */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* form input fields dynamically  */}
        {Question.inputs.map((input, key) => ( 
          <div key={key}>
            <p>
              <label htmlFor={input.name}>{input.label}:</label>
            </p>
            {/* Dynamic input fields  */}
            {(() => {
              switch(input.type) {
                case 'textarea':
                  return (
                    <textarea name={input.name} {...register(input.name)}></textarea>
                  );
                case 'select':
                  return (
                    <select name={input.name} {...register(input.name)}>
                        {userId.map((id, index) => (
                          <option key={index} value={id}>{id}</option>
                        ))}
                    </select>  
                  );
                default: 
                  return (
                    <input 
                      name={input.name} 
                      type={input.type} 
                      {...register(input.name)}
                    />
                  );
              }
            })()}
            {/* Error  */}
            <p className="error" style={{margin: 0}}>
                {errors[input.name]?.message}
            </p> 
          </div>
        ))}
        <button type='submit' style={{margin: 10}}>
          Submit
        </button>
      </form>
    </div>

  )
}
