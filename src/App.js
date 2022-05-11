import React from "react";
import "./App.css";
import { Posts } from "./features/posts/Posts";
import { SubReddits } from "./features/subreddits/SubReddits";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Reddit Simple</h1>
      </header>
      <main>
        <section className="posts">
          <Posts />
        </section>
        <aside className="subreddits">
          <SubReddits />
        </aside>
      </main>
    </div>
  );
}

export default App;
