import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import {
  useQuery,
  useMutation,
  useQueryClient
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Observable from 'zen-observable';

import './App.css';
import { CreateClipboardInput, ListClipboardsQuery, ListClipboardsQueryVariables, CreateClipboardMutation, CreateClipboardMutationVariables, OnCreateClipboardSubscription } from './API';
import { createClipboard } from './graphql/mutations';
import { listClipboards } from './graphql/queries';
import { onCreateClipboard } from './graphql/subscriptions';
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

export const useAmplifyMutation = (query: string, variables?: CreateClipboardMutationVariables) => {
  return useMutation<CreateClipboardMutation, Error, CreateClipboardMutationVariables>(async (variables) => {
    const {data: response} = await API.graphql(graphqlOperation(query, variables)) as { data: CreateClipboardMutation};
    return response;
  });
}

// 'listClipboards'
export const useAmplifyQuery = <ResultType extends {}, VariablesType extends {} = {}>(query: string, variables?: VariablesType) => {
  // console.log('useListClipboards'+query);
  return useQuery<ResultType, Error>(query, async () => {
    const { data: response } = await API.graphql(graphqlOperation(query, variables)) as { data: ResultType};
    return response;
  });
}

// type ConfigType<VariableType extends {}> = {
//   query: string;
//   key: string;
//   variables?: VariableType;
// };

// export const useSubscriptionByItself = <
//   ItemType extends { id: string },
//   VariablesType extends {} = {}
// >({
//   config,
//   itemData,
// }: {
//   config?: ConfigType<VariablesType>;
//   itemData?: ItemType;
// } = {}) => {
//   const [item, update] = React.useState<ItemType | undefined>(itemData);

//   React.useEffect(() => {
//     let unsubscribe;
//     if (config) {
//       const { query, key, variables } = config;
//       const subscription = API.graphql(graphqlOperation(query, variables));
//       if (subscription instanceof Observable) {
//         const sub = subscription.subscribe({
//           next: ({provider, value}) => {
//             console.log({provider, value});
//           }
//           // next: payload => {
//           //   try {
//           //     const {
//           //       value: {
//           //         data: { [key]: item },
//           //       },
//           //     }: {
//           //       value: { data: { [key: string]: ItemType } };
//           //     } = payload;

//           //     update(item);
//           //   } catch (error) {
//           //     console.error(
//           //       `${error.message} - Check the key property: the current value is ${key}`
//           //     );
//           //   }
//           // },
//         });
//         unsubscribe = () => {
//           sub.unsubscribe();
//         };
//       }
//     }
//     return unsubscribe;
//   }, [JSON.stringify(config)]);

//   return [item];
// };


// export const useAmplifyQueryPromise = <ResultType extends {}, VariablesType extends {} = {}>(query: string, variables?: VariablesType) => {
//   console.log('useListClipboards'+query);
//   return new Promise<ResultType>((resolve, reject) => {
//     return useQuery<ResultType, Error>(query, async () => {
//       const response = await API.graphql(graphqlOperation(query, variables)) as { data: ResultType};
//       return response.data;
//     });
//   });
// }


function App() {
  // const [clipboard, setClipboard] = useState<ListClipboardsQuery | undefined>();
  const { register, handleSubmit, watch, errors } = useForm<CreateClipboardInput>();

  // useEffect(() =>{
  //   const list = async () => {
  //     try {
  //       const response = await API.graphql(graphqlOperation(listClipboards)) as { data: ListClipboardsQuery};
  //       console.log(response);
  //       setClipboard(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   list();
  // }, []);
  // const queryClient = useQueryClient();
  const {status, data, error, isFetching} = useAmplifyQuery(listClipboards );
  // setClipboard(data as ListClipboardsQuery);
  const clips = data as ListClipboardsQuery;
  // console.log(clips);
  
  const mutation = async <ResultType extends {}, VariablesType extends {} = {}>(query: string, variables?: VariablesType) => gqlOp<ResultType, VariablesType>(query, variables);

  const addClipboard = useMutation<CreateClipboardMutation, Error, CreateClipboardMutationVariables>(
    async (variables: CreateClipboardMutationVariables) => {
      const {data: response} = await API.graphql(graphqlOperation(createClipboard, variables)) as { data: CreateClipboardMutation};
      return response;
    },
    {
      // Optimistically update the cache value on mutate, but store
      // the old value and return it so that it's accessible in case of
      // an error
      onMutate: async text => {
        console.log(text);

        return text;
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) =>
        // queryClient.setQueryData('todos', previousValue),
        console.log(err),
      // After success or failure, refetch the todos query
      onSuccess: () => {
        // queryClient.invalidateQueries('todos')
        console.log('success');
      },
    }
  )
  const onSubmit = async (data: CreateClipboardInput) => {
    console.log({...data});
    try {
      // const response = mutation(createClipboard, {input: {...data}});
      const response = addClipboard.mutate({input: {...data}});
      // const response = await API.graphql(graphqlOperation(createClipboard, {input: {...data}}));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  // type ConfigType<VariableType extends {}> = {
  //   query: string;
  //   key: string;
  //   variables?: VariableType;
  // };
  // const variables: OnCreateClipboardSubscription = {

  // }
  // const test = useSubscriptionByItself({config: {query: onCreateClipboard, key: 'response'}});
  // console.log(test);
  const queryClient = useQueryClient();
  
  // working version
  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateClipboard));
    console.log('subscription');
    if (subscription instanceof Observable) {
      subscription.subscribe({
        next: (eventData) => {
          console.log(eventData);
          queryClient.setQueryData<ListClipboardsQuery | undefined>(listClipboards, (prevData) => {
            console.log(prevData);
            if (prevData !== undefined) {
              if (prevData.listClipboards?.items?.some(clip => clip?.id === eventData.value.data.onCreateClipboard.id)) {
                // throw new Error("Dup!");
                console.log('Dup!');
                return prevData;
              } else {
                prevData.listClipboards?.items?.push({...eventData.value.data.onCreateClipboard});
                return prevData;
              }
            }
            return {listClipboards: {items: [{...eventData.value.data.onCreateClipboard}], nextToken: null}} as ListClipboardsQuery;
          })
        }
      });
    }
  }, []);
  

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="payload" defaultValue="payload" ref={register({ required: true })} />
        {errors.payload && <span>This field is required</span>}
        <input type="submit" />
      </form>
      <div>
        {clips?.listClipboards?.items?.map(clip=><p key={clip?.id}>{clip?.payload}</p>)}
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

export default App;
