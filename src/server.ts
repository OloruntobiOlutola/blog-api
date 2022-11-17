import app from "./index";

const port = 4000;

app.listen(process.env.PORT || port, () =>
  console.log(`Server is running at port ${port}`)
);
