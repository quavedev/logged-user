import { useContext } from 'react';
import { LoggedUserContext } from './LoggedUserProvider';

/**
 * Hook that provides the logged user context.
 * @returns {{
 *   loggedUser: User,
 *   loadingLoggedUser: Boolean,
 *   refetchLoggedUser: function
 * }}
 */
export const useLoggedUser = () => useContext(LoggedUserContext);
