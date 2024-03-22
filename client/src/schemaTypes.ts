export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  toggleTask: Scalars['Boolean'];
};


export type MutationToggleTaskArgs = {
  toggleTaskInput: ToggleTaskInput;
};

export type Query = {
  __typename?: 'Query';
  tasks: Array<Task>;
};

export type Task = {
  __typename?: 'Task';
  completedAt?: Maybe<Scalars['String']>;
  dependencyIds: Array<Maybe<Scalars['Int']>>;
  group: Scalars['String'];
  id: Scalars['Int'];
  task: Scalars['String'];
};

export type ToggleTaskInput = {
  completedAt?: Maybe<Scalars['String']>;
  taskId: Scalars['Int'];
};
