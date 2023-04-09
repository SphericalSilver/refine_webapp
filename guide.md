## Introduction

The guide for this web app is this JavaScript Mastery course: https://www.youtube.com/watch?v=k4lHXIzCEkM

This web app uses:

- MUI
- https://github.com/refinedev/refine
- Typescript
- MERN
- Google login

📚 Materials/References:
GitHub Gist (Code) - https://gist.github.com/adrianhajdin/c9e83f0fb1dfcf238dae0cc68a90ba82 (a lot of references here were used to write boilerplate code etc.)
Assets - https://drive.google.com/file/d/1KsXj...
Interfaces - https://drive.google.com/file/d/1ibOH...
Figma design - https://www.figma.com/file/QLU3mZJOsm...
Google console - https://console.cloud.google.com/

## Guide

### Setup

---

- 6:10 - Run `npm create refine-app@latest -- --branch v3 client` to create the app. When the question prompts come up, we choose CRA (create-react-app), we call the project "client", choose "REST API" for the backend service, and we use MUI for the UI framework. For authentication logic, we use "google".
- 8:40 - cd into the `client` folder which we just creaed, then run `npm install apexcharts react-apexcharts`
- 9:20 - Do `npm run dev` to start the application.
- 10:30 - Working on login. From the github gist link, we'll use specific fonts, and add them in the index.html page. We also get the index.css file from the github gist (https://gist.github.com/adrianhajdin/c9e83f0fb1dfcf238dae0cc68a90ba82)
- 12:30 - Create a `constants` folder in src, and then create an index.ts file there, and get its contents from github gist.
- 13:30 - Delete the current interfaces folder, and replace it with the one from the link.
- 14:10 - Create a new folder in src/components called charts. Here, we create a chart.config.ts file.

### Starting work on login page.

- 15:07 - To use google login, we need to enter a client id from google api. Create a new project in google cloud (https://console.cloud.google.com/), and then under APIs & Services -> OAuth Screen, setup the google login, and then under Credentials, create an "OAuth Client ID" for a web application.
- 17:40 - Creating a new file to store the google client ID.
- 18:50 - Redesigning background.
- 20:00 - Modifying sidebar component.
- 27:00 - Modifying the header component.
- 27:50 - Changing the title component.
- 29:00 - Explanation of the App.tsx file. More options are added to the tab on the sidebar by modifying the "resources" prop in the <Refine/> component. MUI icons are used to add our icons.
- 33:20 - Adding a dashboard page.

### Modifying Dashboard (Home Page)

- 37:50 - Editing display of dashboard in sidebar.
- 39:40 - Work on the actual dashboard page starts. We import the useList hook from refine.

Note on Box and Stack components in MUI:
In Material-UI (Mui), a "Box" component is a low-level layout primitive that is used to create flexible and responsive container elements in a React application. The "Box" component provides a way to create layout containers that can be easily customized and reused across an application. It includes properties such as "padding", "margin", "border", "flexbox" and more to give developers the flexibility to create a wide range of layouts.

A "Stack" component in Material-UI is a higher-level layout component that builds on top of the "Box" component to provide a simplified way to create vertical or horizontal stacks of content. The "Stack" component automatically handles the spacing between the stacked elements, making it a convenient way to create responsive and visually appealing layouts. It is often used to create menus, forms, and other user interface elements.

Overall, both the "Box" and "Stack" components in Material-UI are designed to provide flexible and customizable layout options for React applications, while also being easy to use and integrate with other Material-UI components. While Box and Stack components might seem interchangeable at first, they serve different purposes and are designed to be used in different scenarios.

When to use Box:

- For applying styles: Use Box when you want to apply styles to a single component, like margin, padding, background color, or display properties, without the need for additional CSS or classes.
- For flexible layouts: Box can be used to create more flexible layouts using display properties like flex, grid, or block. You can create complex layouts by nesting Box components and adjusting their properties.
- For responsive styles: Box can be helpful for applying responsive styles using breakpoints or the theme properties from Material-UI.

When to use Stack:

- For managing spacing: Stack is specifically designed for managing the spacing between child elements along a single axis, either horizontally or vertically. Use Stack when you want to create a consistent gap between elements.
- For simple layouts: Stack is useful for creating simple, one-dimensional layouts, like a row or a column of elements. It's less flexible than Box, but it's easier to use for basic layout purposes.
- For managing child element alignment: Stack provides properties like alignItems and justifyContent that can help you align child elements along the main and cross axes.

- 49:00 - Creating donut charts.
- 52:03 - Styling the cards that hold each donut chart.
- 54:00 - Creating bar charts. We start with building the TotalRevenue component.
- 1:02:38 - Starting work on the property referrals barcharts.
- 1:05:00 - Creation of the progress bar. A box component of 8px height is used to create the bar, and then another box component is created inside it with position="absolute", which causes the colour bar to stack on top of the gray bar.

### Starting work on Properties page

- 1:10:40 - Starting implementation of resources in App.tsx
- 1:21:25 - Explanation on how refine knows to route us to the `CreateProperty` page by clicking create.
- 1:22:28 - Example of doing `import { useGetIdentity } from "@pankod/refine-core";` to have a way of retrieving all the user's info easily (name, profile pic, etc). We also import `useForm` to help with building forms.
- 1:24:45 - Extracting specific methods from `useForm` by doing `const {refineCore: { onFinish, formLoading },register,handleSubmit} = useForm();`
- 1:27:20 - Setting up the form component, as well as an interface for it. A `<FormControl>` component is used to create an input field. Within in, we have the `FormHelperText` and `TextField` components to help with creating the input fields and field titles.
- 1:32:00 - Note that the prop `sx={{margin:"10px 0"}}`
- 1:37:00 - Using MUI select component.
- 1:42:00 - Creating file upload field
- 1:46:40 - Focusing on the onFinishHandler to submit the form. Notice that the `onFinish` line in the function is mostly handled by Refine.

### Backend Setup

- 1:48:00. We create a new `server` folder, cd there, and run `npm init -y` to initialize an empty package.json file. In the package json, we add the following key: `"type": "module",` which allows us to use modern JS import/export features.
- 1:49:20. We install the following packages: `npm install cloudinary cors dotenv express mongoose nodemon`. Then we add a `"start": "nodemon index"` script in the package.json so we can use `npm start` to run the `index.js` file.
- 1:52:20 - Creating the mongodb folder in the app with a `connect.js` file. This file is used to store the code which connects to mongodb, so the index.js file isn't too cluttered.
- 1:54:25 - Creating mongodb atlas database.
- 1:56:05 - Creating a `.env` file in the server to store password details.
- 1:59:00 - Creating a new `models` folder inside our existing `mongodb` folder. We create a `user.js` and a `property.js` file to host those models.

  - `allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }]` was used in the UserSchema. Notice that this is an array, which allows one user to be linked to many properties.
  - `creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }` was used in the PropertySchema, which allows one property to be linked to one user.

- 2:02:36 - Creating Routes in the server. We create a folder for `routes` and `controllers`. Refer to this MDN document for a primer on routes and controllers: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes. Basically, a route forwards a request to a controller. The controller is connected to the database, and performs the logic required by that specific endpoint.
- 2:11:30 - Importing the routes we created into `index.js`.
- 2:13:30 - Going back to `App.tsx` in the frontend to modify it so that it saves the identity of the user logging in. We make modifications to the frontend so it adds a user logging in to our backend. We also modify the logout function.
- 2:18:00 - In the BE, we modify the create user controller to add a new user.
- 2:22:00 - Making sure that upon logging in, the user is created in the MongoDB we just spun up.
- 2:24:40 - Implementing ability for user to add properties.
- 2:25:20 - Create Property function. We create a mongoose session to ensure that the create property operation is atomic (i.e. either fully finishes, or completely fails):

```
const session = await mongoose.startSession();
  session.startTransaction;
```

- 2:27:00 - Setting up at cloudinary. This is super simple - just sign in using bbp85, and then click the Dashboard page.
- 2:34:00 - We get a 404 upon trying to submit a Create Property form, because in the `App.tsx` file, the dataProvider needs to be changed such that the dataProvider is passed correctly (need to set `dataProvider={dataProvider("http://localhost:8080/api/v1")}` to point it to the backend.)
- 2:35:10 - Successful uploading of file to cloudinary when creating a property.
- 2:35:20 - Starting to create the property card. The `useTable` hook from refine is used to handle filtering/sorting/pagination/etc automatically.
- 2:37:50 - Creating get properties function in the controller. At 2:38:50, there's a recap on how the FE is actually getting data from the BE here. Essentially:

1. `App.tsx` has the base BE URL defined, and Refine references the `AllProperties` page like so:

```
 resources={[

            {
              name: "properties",
              list: AllProperties,
              show: PropertyDetails,
              create: CreateProperty,
              edit: EditProperty,
              icon: <VillaOutlined />,
            },
 ]}
```

2. The `useTable` hook knows from the `/properties` route in the frontend that it should get data from `localhost:8080/api/v1/properties` endpoint. In our backend, this was configured to return data via the `getAllProperties` controller: `router.route("/").get(getAllProperties);`

- 2:41:50 - Setting up the PropertyCard component in the frontend.
- 2:51:00 - Doing pagination/filtering/sorting on frontend.
- 3:03:30 - Implementing pagination/filtering/sorting on backend. First, we destructure the filter params from `req.query`.
- 3:07:00 - `setSorter` and `sorter` are functions provided by the `useTable` hook.
- 3:10:00 - Filtering by title. The `useMemo` hook is used here. We also define a `currentFilterValues` object that holds a hash of the filters applied. These are passed to the backend by refine.

Quick brief on `useMemo`:

Example of using `useMemo` in React:

```
import React, { useMemo } from 'react';

function MyComponent({ x, y }) {
  const result = useMemo(() => {
    console.log('computing result...');
    return x + y;
  }, [x, y]);

  return <div>The result is {result}</div>;
}
```

In this example, the useMemo hook is used to memoize the result of a function that computes the sum of x and y. The function is only recomputed when the input values (x and y) change.

When the component is rendered for the first time, the function is executed and the result is computed. If the component is re-rendered with the same input values (x and y), the function is not executed again, and the previously memoized result is used instead.

- 3:13:30 - Implementing filtering by property type.
- 3:16:50 - Using `setPageSize` to change the number of elements required per page.

### Starting work on property details page.

- 3:18:00 - Starting work on Property Details.
- 3:21:30 - Building backend API for `getPropertyDetails`
- 3:27:30 - Fixing the issue causing some styles not to render. We do this by going to the `index.tsx` file and adding a `import "index.css"` line.
- 3:36:10 - Writing BE function to `deleteProperty`.
- 3:39:20 - Implementing the `updateProperty` controller.
- 3:40:00 - Updating the `edit-property.tsx` file in the frontend.

### Working on Agents page

- 3:45:30 - Starting work on the Agents page (`agent.tsx`)
- 3:51:40 - Implementing the `AgentCard` component on frontend.
- 4:05:50 - Starting work on the `my-profile.tsx` page.
- 4:08:32 - Implementing the Profile component.
- 4:09:30 - Implementing `getUserInfoByID` API on backend.
- 4:13:10 - Starting work on `agent-profile.tsx`. This is very similar to the `my-profile.tsx` page.
- 4:22:00 - Adding Property list and agent list on the Dashboard (home page)

### Deployment.

- 4:30:00 - Deployment of the app.
- 4:30:50 - After creating your repo on GitHub, type `git init` to initialize this as a git folder. Create a `.gitignore` file in the `server` folder. Then, in the root directory, type `git add .`, followed by `git commit -m ""`.
  Afterwards, type `git branch -M main` to create a main branch, then add a remote origin using the following: `git remote add origin https://github.com/SphericalSilver/refine_webapp.git`

## Refine hooks

- `useTable`
- `useNavigate`

This hook comes from the react-router library, which Refine uses for handling routing and navigation. It returns a function that allows you to navigate to different routes in your application programmatically.

Example:

```
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/some-route');
  };

  return <button onClick={handleClick}>Go to some route</button>;
}
```

- `useGetIdentity`

This hook retrieves the current user's identity, which is useful for implementing authentication and authorization logic in your application. It returns an object containing the user's identity data.

Example:

```
import { useGetIdentity } from '@pankod/refine';

function MyComponent() {
  const { data: identity } = useGetIdentity();

  return <div>User ID: {identity?.id}</div>;
}
```

- `useDelete`

useDelete: This hook allows you to delete a single record by its ID. It returns a function that you can call with the record ID to perform the deletion, along with the mutation state.

Example:

```
import { useDelete } from '@pankod/refine';

function MyComponent() {
  const { mutate: deleteRecord, isLoading } = useDelete({ resource: 'posts' });

  const handleDelete = (id) => {
    deleteRecord(id);
  };

  return <button onClick={() => handleDelete(someId)} disabled={isLoading}>Delete record</button>;
}
```

- `useShow`

useShow: This hook fetches a single record by its ID. It returns the record data and the fetching state.

Example:

```
import { useShow } from '@pankod/refine';

function MyComponent() {
  const { data: record } = useShow({ resource: 'posts', id: someId });

  return <div>Post title: {record?.title}</div>;
}
```

- `useForm`
- `useList`

useList: This hook fetches a list of records. It returns the records data, pagination information, and the fetching state.

Example:

```
import { useList } from '@pankod/refine';

function MyComponent() {
  const { data: records } = useList({ resource: 'posts' });

  return (
    <ul>
      {records?.map((record) => (
        <li key={record.id}>{record.title}</li>
      ))}
    </ul>
  );
}
```

- `useOne`

This hook is an alias for useShow. It fetches a single record by its ID and returns the record data and the fetching state. The usage is the same as useShow.

- `useParams`

How refine works

- We have resources that correspond to models in the backend.
