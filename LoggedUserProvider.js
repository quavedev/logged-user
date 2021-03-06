import { Meteor } from 'meteor/meteor';
import React, { createContext, useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag/lib/graphql-tag.umd';

export const LoggedUserContext = createContext({});

const defaultLoggedUserFragment = gql`
  fragment LoggedUser on User {
    _id
  }
`;
// https://www.apollographql.com/docs/react/data/queries/#setting-a-fetch-policy
const defaultFetchPolicy = 'cache-first';

/**
 * Provide a hook to quickly check or refetch the current user
 * @param children
 * @param queryOptions - options for useQuery hook: https://www.apollographql.com/docs/react/data/queries/#options
 * @param userQueryString - the actual graphql query you want to execute to
 * fetch the user
 * @param loggedUserFragment - GraphQL fragment to use in the query
 * @returns {JSX.Element}
 * @constructor
 */
export const LoggedUserProvider = ({
  children,
  queryOptions,
  userQueryString,
  loggedUserFragment: loggedUserFragmentInput,
}) => {
  const loggedUserFragment =
    loggedUserFragmentInput || defaultLoggedUserFragment;

  const defaultUserQueryString = useMemo(
    () => gql`
      query LoggedUser {
        loggedUser {
          ...LoggedUser
        }
      }
      ${loggedUserFragment}
    `,
    [loggedUserFragment]
  );

  const {
    data: { loggedUser } = {},
    loading: loadingLoggedUser,
    refetch: refetchLoggedUser,
  } = useQuery(userQueryString || defaultUserQueryString, {
    fetchPolicy: defaultFetchPolicy,
    ...queryOptions,
  });

  const logout = useCallback(() => {
    Meteor.logout();
    refetchLoggedUser();
  }, []);

  return (
    <LoggedUserContext.Provider
      value={{
        loggedUser,
        loadingLoggedUser,
        refetchLoggedUser,
        logout,
      }}
    >
      {children}
    </LoggedUserContext.Provider>
  );
};
