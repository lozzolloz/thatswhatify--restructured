import "./Login.css";

const LOGIN_URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8888/login"
    : "https://thatswhatify-1b19f0e0e43c.herokuapp.com/login";

export default function Login() {
  return (
    <div className="login-screen">
      <div className="login-screen__title">
        <p id="home-now" className="text--home">
          THAT'S
        </p>

        <p id="home-thats" className={"text--home__highlighted"}>
          THATSWHATIFY
        </p>

        <p id="home-ify" className="text--home">
          WHATIFY
        </p>
      </div>

      <a className="login-button" href={LOGIN_URI}>
        Log In With Spotify
      </a>
    </div>
  );
}
