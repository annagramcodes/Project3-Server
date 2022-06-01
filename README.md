# Project Name

<br>

# Quick Compo

<br>

## Description

This is an app to find tattoo artists in Lisbon, and you can signup as a tattoo artist to display tour work in order to connect the tattoo artists with people who want to get a tattoo.

## User Stories

- **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
- **Signup:** As an anonymous user I can sign up on the platform so that I can start looking for a tattoo artist. As a tattoo artist I can sign up on the platform so that I can showcase my work.
- **Login:** As a user I can login to the platform so that I can access my profile and get in contact with a tattoo artist. As a tattoo artist I can login to the platform so that I can access my profile and receive requests from users.
- **Logout:** As a logged in user I can logout from the platform so no one else can use it. As a logged in tattoo artist I can logout from the platform so no one else can use it.
- **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see my favorite artists and my requests.
- **Business Profile Page**: As a logged in artist I can visit my profile page so that I can access the edit page and see user requests.
- **Home Page:** As a user I can see information about the app and links to other pages.
- **Add Requests:** As a logged in user I can access the add request page so that I can create a new request.
- **Edit Requests:** As a logged in user I can access the edit request page so that I can edit the request I created.
- **View Requests:** As a logged in artist I can access the view request page so that I can view requests.
- **Discover Artists:** As a logged in user I can access the discover artist page so that I filter artists by style.
- **Explore Tattoos:** As a logged in user I can access the explore tattoo page to get some inspiration.

## Backlog

- Add google maps
- Add chat

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                             | Component       | Permissions                         | Behavior                                          |
| -------------------------------- | --------------- | ----------------------------------- | ------------------------------------------------- |
| `/login`                         | LoginPage       | anon only `<AnonRoute>`             | Login form, navigates to home page after login.   |
| `/signup`                        | SignupPage      | anon only `<AnonRoute>`             | Signup form, navigates to home page after signup. |
| `/`                              | HomePage        | public `<Route>`                    | Home page.                                        |
| `/user-profile`                  | ProfilePage     | user (client) only `<PrivateRoute>` | User profile for the current user.                |
| `/tatto-artist-profile`          | ProfilePage     | artist only `<PrivateRoute>`        | Artist profile for the current user.              |
| `/user-profile/edit/:id`         | EditProfilePage | user only `<PrivateRoute>`          | Edit user profile form.                           |
| `/tatto-artist-profile/edit/:id` | EditProfilePage | artist only `<PrivateRoute>`        | Edit artist profile form.                         |
| `/request/add`                   | AddRequestPage  | user only `<PrivateRoute>`          | Create new request.                               |
| `/request/edit/:id`              | EditRequestPage | user only `<PrivateRoute>`          | Edit a request.                                   |
| `/request/view/:id`              | ViewRequestPage | artist only `<PrivateRoute>`        | Singular request.                                 |
| `/discover`                      | DiscoverPage    | user only `<PrivateRoute>`          | Shows artists by style.                           |
| `/explore`                       | ExplorePage     | user only `<PrivateRoute>`          | Gallery of tattoos.                               |

## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePages

- EditProfilePages

- AddRequestPage

- EditRequestPage

- ViewRequestPage

- DiscoverPage

- ExplorePage

Components:

- Artist Cards
- Style Cards
- Navbar

<br>

# Server / Backend

## Models

**User model**

```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
	role: { type: String, enum:[client, artist] },
  favorites: [ { type: Schema.Types.ObjectId, ref:'Business' } ],
  imageUrl: {
    type: String,
   },
  requestsMade: [ { type: Schema.Types.ObjectId, ref:'Request' } ]
}
```

**Business profile model**

```javascript
 {
   name: { type: String, required: true },
   location: { type: String },
   style: { type: String },
   flash: [ {
   price: {type: Number},
   size: {type: String},
   estimatedTime: {type: String},
   imageUrl: [
      {
        type: String,
      },
    ],
   }
   ]
   requestsReceived: [ { type: Schema.Types.ObjectId, ref:'Request' } ],
   portfolioImg: [
      {
        type: String,
      },
    ],
   }
```

**Request model**

```javascript
{
  requestedBy: [ { type: Schema.Types.ObjectId, ref:'User' } ],
 requestedFor: [ { type: Schema.Types.ObjectId, ref:'BusinessProfile' } ],
 placement: {
   type: String
 },
 size: {
   type: String
 },
 color: {
   type: Boolean
 },
 description: {
   type: String
 },
 imageUrl: {
   type: String
 },
 budget: {
   type: Number
 },
appointmentDate: {
type: Date
}
}
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body            | Success status | Error Status | Description                                                                                                                     |
| ----------- | --------------------------- | ----------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/profile `            | Saved session           | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`              | {name, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`               | {username, password}    | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`              |                         | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/api/requests`             |                         |                | 400          | Show all requets                                                                                                                |
| GET         | `/api/requests/:id/details` |                         |                |              | Show specific request                                                                                                           |
| POST        | `/api/requests/create`      |                         | 201            | 400          | Create a new request                                                                                                            |
| PUT         | `/api/requests/:id/edit`    |                         | 200            | 400          | edit request                                                                                                                    |
| DELETE      | `/api/requests/:id/delete`  |                         | 201            | 400          | delete request                                                                                                                  |
| GET         | `/api/user/:id`             |                         |                |              | Show specific user                                                                                                              |
| PUT         | `/api/user/:id/edit`        |                         | 200            | 400          | edit user                                                                                                                       |
| DELETE      | `/api/user/:id/delete`      |                         | 201            | 400          | delete user                                                                                                                     |
| GET         | `/api/discover`             |                         |                |              | filter artists by style                                                                                                         |
| GET         | `/api/explore`              |                         | 200            | 404          | display tattoo images                                                                                                           |

<br>

## API's

Cloudinary
<br>

## Packages

Chackra-UI
Toastify
React-Calendar

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/INu5hvUZ/project3-tattoo-app) or a picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/annagramcodes/Project3-Client)

[Server repository Link](https://github.com/annagramcodes/Project3-Server)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your _public_ presentation slides

### Contributors

Alexandre Alves - <https://github.com/aletrad> - <https://www.linkedin.com/in/alexandre-alves-dev/>

Anna Egger - <https://github.com/annagramcodes> - <https://www.linkedin.com/in/anna-egger/>
