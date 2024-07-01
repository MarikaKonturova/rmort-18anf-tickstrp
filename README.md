# Ang project with difficult name

### Description:

![GEO82coXYAAbfzz](https://github.com/MarikaKonturova/rmort-18anf-tickstrp/assets/69147255/630a8453-ba74-401a-94f9-37bb9b13dcc6)

---

### legend:

✅️ - created config and it works
✅️✅️ - done

### Current to-do

- check all the errors from server in auth ({"errors":{"email or password":["is invalid"]}})
- add custom field for phone number for register w/ ControlValueAccessor, NG_VALIDATOR
- [rewrite themes and add localstorage](https://sevriukovmk.medium.com/custom-angular-material-multiple-themes-dd7cb31f835)

### Ambitious to-do

- i18n (✅️)
- ssr (✅️)
- ng-zorro/material angular w/ 3 themes (✅️)
- auth w/ jwt (realworldapi)
- stripe
- fusionchart(maybe ngx-charts)

## Questions

- does formControl as reactive form handle subscription?
- authenticated peson can access login page, but we cannot use redirect in constructor - do we need public-routes-guard? and return true/false
- several tokens related to apiUrl:auth and rmorty
- router & state in auth guard, examples
- do i need canActivateChild when canLoad? Answer: canActivate is needed
