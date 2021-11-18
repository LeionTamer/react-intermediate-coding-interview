# Intermediate React Coding Interview

This project was based on the YouTube video [Intermediate React.js Coding Interview (ft. Clément Mihailescu)](https://www.youtube.com/watch?v=6s0OVdoo4Q4&t=6) by [Ben Awad](https://www.youtube.com/c/BenAwad97) and [Clément Mihailescu](https://www.youtube.com/channel/UCaO6VoaYJv4kS-TQO_M-N_g)

The Challenge:

- Fetch the data from `https://randomuser.me/api/`
- Generate a table based on the users' address details
- Enable sorting based on columns
- Add an field which will enable filtering based on values on rows

## Running the Application

1. Install the dependencies using `npm install`
2. Run the application using `npm run start`

```
npm install
npm run start
```

## My Approach

1. Use `fetch` to get data from the api reference; called once on mount of the page/application
2. Deconstruct the data and format it the way I wanted to show in my table
3. Create a mapping of the key and name and save it as the `header` object array
4. Create a separate component for the table headers (column) and table data (rows)
5. Add an input field for filtering text
6. Create a pure function `tableFilterText` to filter all the users based on `filterText` which is updated on change of the input field
7. Add a `handleSort` onClick function to column headers
8. Create a pure function `tableSortByColumn` to sort based on `sortObject` which is updated on `handleSort`
