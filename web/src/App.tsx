import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Amplify, { API, graphqlOperation } from "aws-amplify";

import './App.css';
import { CreateClipboardInput, ListClipboardsQuery } from './API';
import { createClipboard } from './graphql/mutations';
import { listClipboards } from './graphql/queries';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

export const gqlOp = async <
  ResultType extends {},
  VariablesType extends {} = {}
>(
  query: string,
  variables?: VariablesType
) => {
  const { data } = (await API.graphql(graphqlOperation(query, variables))) as {
    data: ResultType;
  };
  return data;
};

function App() {
  const [clipboard, setClipboard] = useState<ListClipboardsQuery | undefined>();
  const { register, handleSubmit, watch, errors } = useForm<CreateClipboardInput>();

  useEffect(() =>{
    const list = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listClipboards)) as { data: ListClipboardsQuery};
        console.log(response);
        setClipboard(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    list();
  }, []);
  
  const mutation = async <ResultType extends {}, VariablesType extends {} = {}>(query: string, variables?: VariablesType) => gqlOp<ResultType, VariablesType>(query, variables);

  const onSubmit = async (data: CreateClipboardInput) => {
    console.log({...data});
    try {
      const response = mutation(createClipboard, {input: {...data}});
      // const response = await API.graphql(graphqlOperation(createClipboard, {input: {...data}}));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="payload" defaultValue="payload" ref={register({ required: true })} />
        {errors.payload && <span>This field is required</span>}
        <input type="submit" />
      </form>
      <div>
        {clipboard?.listClipboards?.items?.map(clip=><p key={clip?.id}>{clip?.payload}</p>)}
      </div>
    </div>
  );
}

export default App;
