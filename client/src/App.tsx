import React, { useEffect, useMemo, useState } from 'react'

import { useQuery, useMutation } from "@apollo/client";
import { GetTasksDocument } from "./graphql/getTasks.generated";
import { ToggleTaskDocument } from "./graphql/toggleTask.generated";
import Group from './Group'
import TaskHOC from './TaskHOC';
import { Task } from './schemaTypes';

const App = () => {
  const { loading, data } = useQuery(GetTasksDocument);
  const [mutateTasks] = useMutation(ToggleTaskDocument);

  const groupList = useMemo(() => {
    return data?.tasks.reduce((acc: Record<string, Task[]>, curr: Task) => {
      if (acc[curr.group]) {
        acc[curr.group].push(curr)
      } else {
        acc[curr.group] = [curr]
      }
      return acc
    }, {})
  }, [data?.tasks])
  const [groups, setGroups] = useState<Record<string, Task[]> | undefined>(groupList)

  useEffect(() => {
    setGroups(groupList)
  }, [groupList])

  const [selectedGroup, setSelectedGroup] = useState<string | undefined>()

  const resetGroup = () => {
    setSelectedGroup(undefined)
  }

  const getDependencyList = (group: string, dependencyIds: number[]) =>
    dependencyIds.reduce((a: boolean, v: number) => {
      const found = !!groups && groups[group].find(({ id }: Task) => id === v);
      return a || !!(found && found.completedAt === null);
    }, false);



  const toggleTask = (group: string, taskId: number) => {
    mutateTasks({
      variables: {
        toggleTaskToggleTaskInput: { taskId }
      }
    });
    if (groups) {
      setGroups({
        ...groups,
        [group]: groups[group].map((task: Task) =>
          task.id !== taskId
            ? task
            : {
              ...task,
              completedAt:
                task.completedAt === null
                  ? new Date().toISOString().substring(0, 10)
                  : null
            }
        )
      });
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>

      {!selectedGroup ?
        <>
          <h1>Things To Do</h1>
          {!!groups && !!Object.keys(groups).length && Object.entries(groups).map(([key, tasks]) => (<Group name={key} setSelectedGroup={setSelectedGroup} tasks={tasks} key={key}>{`${key}`}</Group>))}

        </>
        : <div >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <h1>{selectedGroup}</h1>
            <button style={{
              marginLeft: '100px',
              background: 'transparent',
              border: 'none',
              textTransform: 'capitalize',
              color: 'blue',
              cursor: 'pointer'

            }} onClick={resetGroup}>All Groups</button>
          </div>
          {
            !!groups && groups[selectedGroup].map((task: Task) => (
              <div key={task.id}>
                <TaskHOC task={task} toggleTask={toggleTask} getDependencyList={getDependencyList} /></div>))
          }
        </div>}
    </div>
  )
}

export default App
