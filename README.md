# quave:logged-user

This is a meteor package that creates a context for the logged user. This context contains the `loggedUser` and `loadingLoggedUser` fields and the functions `refetchLoggedUser` and `logout`.

`loggedUser`: the logged user on the meteor accounts.

`loadingLoggedUser`: TRUE when the user is logging in or the `refetchLoggedUser` is called.

`refetchLoggedUser`: a function to refetch the logged user when you need to update its data on the client side.

`logout`: a function to logout the user.

## Dependencies

This package has these `npm` depencies. They're not enforced because this could
cause [some problems](https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies)
.

* `react`
* `@apollo/react-hooks`
* `graphql-tag`

## Installation

```bash
meteor add quave:logged-user
```

## Example

```javascript
//home.js
import { useLoggedUser } from 'meteor/quave:use-logged-user/useLoggedUser';

const Home = () => {
    const { loggedUser } = useLoggedUser();
    
    if (loggedUser) {
        return "You are logged in!!!";
    }
    
    return "Sorry, you need to log in"
}

//app.js
import { LoggedUserProvider } from 'meteor/quave:use-logged-user/LoggedUserProvider';

// Use the Form component
<LoggedUserProvider>
    <Home/>
</LoggedUserProvider>
```
