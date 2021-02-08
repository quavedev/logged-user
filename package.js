/* global Package */
Package.describe({
  name: 'quave:logged-user',
  version: '0.0.1',
  summary: 'Utility package to get logged user from context',
  git: 'https://github.com/quavedev/logged-user',
});

Package.onUse(function(api) {
  api.versionsFrom('2.0');
  api.use('ecmascript');
  api.addFiles(['LoggedUserProvider.js', 'useLoggedUser.js'], 'client');
  api.export(['LoggedUserProvider', 'useLoggedUser'], 'client');
});
