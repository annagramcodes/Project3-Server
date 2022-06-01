# Project Name

<br>

# Quick Compo

<br>

## Description

This is an app to manage unofficial tournaments within communities. The app helps to organize, manage and track competitions.

## User Stories

- **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
- **Signup:** As an anonymous user I can sign up on the platform so that I can start creating and managing tournaments.
- **Login:** As a user I can login to the platform so that I can access my profile and start creating and managing tournaments.
- **Logout:** As a logged in user I can logout from the platform so no one else can use it.
- **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see the list of tournaments I have created.
- **Add Tournaments:** As a logged in user I can access the add tournament page so that I can create a new tournament.
- **Edit Tournaments:** As a logged in user I can access the edit tournament page so that I can edit the tournament I created.
- **Add Players:** As a user I can add players to a tournament.
- **View Tournament Table:** As a user I want to see the tournament details, players list and the time table.
- **View Ranks:** As a user I can see the rankings list for the tournament.

## Backlog

- Add weather widget
- lottie interactions
- users can bet
- add geolocation to events when creating

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only `<AnonRoute>`    | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/user-profile`              | ProfilePage          | user only `<PrivateRoute>` | User and player profile for the current user.             |
| `/user-profile/edit`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/tournaments/add`           | CreateTournamentPage | user only `<PrivateRoute>` | Create new tournament form.                               |
| `/tournaments`               | TournamentListPage   | user only `<PrivateRoute>` | Tournaments list.                                         |
| `/tournaments/:tournamentId` | TournamentDetailPage | user only `<PrivateRoute>` | Tournament details. Shows players list and other details. |
| `/tournament/players/:id`    | PlayerDetailsPage    | user only `<PrivateRoute>` | Single player details.                                    |
| `/rankings/:tournamentId`    | RankingsPage         | user only `<PrivateRoute>` | Tournament rankings list.                                 |

## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage

- CreateTournamentPage

- TournamentListPage

- TournamentDetailsPage

- PlayerDetailsPage

- RankingsPage

Components:

- PlayerCard
- TournamentCard
- Navbar

## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

- **Tournament Service**

  - `tournamentService` :
    - `.addTournament(tournamentData)`
    - `.getTournaments()`
    - `.getOneTournament(id)`
    - `.deleteTournament(id)`

- **Player Service**

  - `playerService` :
    - `.createPlayer(id)`
    - `.getPlayerDetails(id)`

<br>

# Server / Backend

## Models

**User model**

```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
	playerProfile: { type: Schema.Types.ObjectId, ref:'Player' },
  createdTournaments: [ { type: Schema.Types.ObjectId, ref:'Tournament' } ]
}
```

**Tournament model**

```javascript
 {
   name: { type: String, required: true },
   img: { type: String },
   players: [ { type: Schema.Types.ObjectId, ref:'Player' } ],
   games: [],
   rankings: []
 }
```

**Player model**

```javascript
{
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profileImage: { type: String },
  scores: []
}
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                                                                                     |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/profile `       | Saved session                | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`         | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/api/tournaments`     |                              |                | 400          | Show all tournaments                                                                                                            |
| GET         | `/api/tournaments/:id` |                              |                |              | Show specific tournament                                                                                                        |
| POST        | `/api/tournaments`     | { name, img, players }       | 201            | 400          | Create and save a new tournament                                                                                                |
| PUT         | `/api/tournaments/:id` | { name, img, players }       | 200            | 400          | edit tournament                                                                                                                 |
| DELETE      | `/api/tournaments/:id` |                              | 201            | 400          | delete tournament                                                                                                               |
| GET         | `/api/players/:id`     |                              |                |              | show specific player                                                                                                            |
| POST        | `/api/players`         | { name, img, tournamentId }  | 200            | 404          | add player                                                                                                                      |
| PUT         | `/api/players/:id`     | { name, img }                | 201            | 400          | edit player                                                                                                                     |
| DELETE      | `/api/players/:id`     |                              | 200            | 400          | delete player                                                                                                                   |
| GET         | `/api/games`           |                              | 201            | 400          | show games                                                                                                                      |
| GET         | `/api/games/:id`       |                              |                |              | show specific game                                                                                                              |
| POST        | `/api/games`           | {player1,player2,winner,img} |                |              | add game                                                                                                                        |
| PUT         | `/api/games/:id`       | {winner,score}               |                |              | edit game                                                                                                                       |

<br>

## API's

<br>

## Packages

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or a picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your _public_ presentation slides

### Contributors

FirstName LastName - <github-username> - <linkedin-profile-link>

FirstName LastName - <github-username> - <linkedin-profile-link>
