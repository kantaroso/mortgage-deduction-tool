import { useRouteError, Link } from "react-router-dom";
import './index.css';

export const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p>
        <Link to={`/`}>TOP</Link>
      </p>
    </div>
  );
}
