import './App.css';
import PostsList from './components/PostsList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>FreeCodeCamp Forum Posts</h1>
      </header>
      <main>
        <PostsList />
      </main>
    </div>
  );
}

export default App;