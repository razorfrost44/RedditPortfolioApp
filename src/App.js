import React from "react";
import "./App.css";
import { Header } from "./features/header/Header";
import { Posts } from "./features/posts/Posts";
import { SubReddits } from "./features/subreddits/SubReddits";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
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
